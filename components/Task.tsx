import React, { useState, useContext, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useClassroom } from "../hooks/useSetClassroom";
import { useSelectedStudent } from "../hooks/useSelectedStudent";
import { Student } from "../types/Students";
import StudentDialog from "./StudentDialog";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

ChartJS.register(ArcElement, Tooltip, Legend);

export const Task = ({
  category,
  assessment,
  open,
  setIsOpen,
  quarter,
}: {
  category: string;
  assessment: string;
  setIsOpen: any;
  open: boolean;
  quarter: number;
}) => {
  const { students } = useClassroom();
  const [sortingMethod, setSorting] = useState("Name");
  const { setStudent } = useSelectedStudent();
  const [filteredStudents, setFilteredStudents] = useState<Student[] | null>(
    students!
  );
  const [topStudents, setTopStudents] = useState([] as number[]);
  useEffect(() => {
    if (students) {
      setFilteredStudents([
        ...students!.sort((a, b) => {
          switch (sortingMethod) {
            case "Grade Before":
              return category === "Over All"
                ? b.quarter![quarter].grade_before -
                    a.quarter![quarter].grade_before
                : category === "Written Works"
                ? b.quarter![quarter].written_percentage -
                  a.quarter![quarter].written_percentage
                : b.quarter![quarter].performance_percentage -
                  a.quarter![quarter].performance_percentage;
            case "Name":
              let fa = a.name.toLowerCase(),
                fb = b.name.toLowerCase();

              if (fa < fb) {
                return -1;
              }
              if (fa > fb) {
                return 1;
              }
              return 0;
            case "Grade After":
            case "Remarks":
              return category === "Over All"
                ? b.quarter![quarter].grade_after -
                    a.quarter![quarter].grade_after
                : category === "Written Works"
                ? b.quarter![quarter].written_percentage -
                  a.quarter![quarter].written_percentage
                : b.quarter![quarter].performance_percentage -
                  a.quarter![quarter].performance_percentage;
            case "Adjustment Difference":
              return b.quarter![quarter].diff - a.quarter![quarter].diff;
            default:
              return 0;
          }
        }),
      ]);
    }
  }, [sortingMethod]);

  const labels = ["Very Good", "Good", "Average", "Poor", "Very Poor"];
  var count = [0, 0, 0, 0, 0];
  students?.map((student) => {
    const i = labels.indexOf(student.remarks);
    count[i] += 1;
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Student's performance",
        data: count,
        backgroundColor: [
          "#CCB53B",
          "#F9E852",
          "#A2CAEB",
          "#5DB4E5",
          "#4B94BD",
        ],
      },
    ],
  };

  return (
    <div className="bg-ocean-100 p-12 grid grid-cols-12 gap-4">
      <div className="col-span-7">
        <div className="text-2xl font-bold">
          <h1>
            Clasroom Assessment:{" "}
            <span
              className={
                assessment === "Very Good"
                  ? "text-legend-vgood"
                  : assessment === "Good"
                  ? "text-legend-good"
                  : assessment === "Average"
                  ? "text-legend-ave"
                  : assessment === "Poor"
                  ? "text-legend-poor"
                  : "text-legend-vpoor"
              }
            >
              {assessment}
            </span>
          </h1>
        </div>
        <div className="text-lg font-semibold">
          Sorted by: {sortingMethod ? sortingMethod : "Name"}
        </div>
        <div className="w-full overflow-y-auto h-96">
          <table className="table-fixed min-w-full rounded-md text-lg text-left border-collapse">
            {/* Table Head - Buttons */}
            <thead className="border-b-2 bg-white sticky top-0">
              <tr className="text-center">
                <th className="flex flex-row pl-2">
                  <button
                    className="font-semibold hover:cursor-pointer rounded-full px-4 hover:bg-ocean-100 focus-within:bg-ocean-100"
                    value={"Name"}
                    onClick={() => setSorting("Name")}
                  >
                    Name
                  </button>
                </th>
                <th>
                  <button
                    className="font-semibold hover:cursor-pointer rounded-full px-4 hover:bg-ocean-100 focus-within:bg-ocean-100"
                    onClick={() => setSorting("Grade Before")}
                  >
                    Before
                  </button>
                </th>
                <th>
                  <button
                    className="font-semibold hover:cursor-pointer rounded-full px-4 hover:bg-ocean-100 focus-within:bg-ocean-100"
                    onClick={() => setSorting("Adjustment Difference")}
                  >
                    +/-
                  </button>
                </th>
                <th>
                  <button
                    className="font-semibold hover:cursor-pointer rounded-full px-4 hover:bg-ocean-100 focus-within:bg-ocean-100"
                    onClick={() => setSorting("Grade After")}
                  >
                    After
                  </button>
                </th>
                <th className="text-right">
                  <button
                    className="font-semibold hover:cursor-pointer rounded-full px-4 hover:bg-ocean-100 focus-within:bg-ocean-100"
                    onClick={() => setSorting("Remarks")}
                  >
                    Remarks
                  </button>
                </th>
              </tr>
            </thead>
            {/* Table Contents */}
            <tbody className="bg-white">
              {students &&
                students?.map((student, idx) => (
                  <tr
                    className="odd:bg-yellow-50 hover:cursor-pointer text-center"
                    onClick={() => {
                      setStudent(student);
                      setIsOpen(true);
                    }}
                    key={idx}
                  >
                    <td className="pl-4 text-left">{student.name}</td>
                    <td>
                      {category === "Over All"
                        ? student.quarter![quarter].grade_before
                        : category === "Written Works"
                        ? student.quarter![quarter].written_percentage
                        : student.quarter![quarter].performance_percentage}
                    </td>
                    <td className="text-base">
                      ({student.quarter![quarter].diff})
                    </td>
                    <td>{student.quarter![quarter].grade_after}</td>
                    <td className="pr-4 text-right">{student.remarks}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="col-span-5 max-h-screen">
        <div className="flex flex-row gap-4">
          <div className="w-48 xl:w-80">
            <Doughnut
              data={data}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                cutout: 70,
              }}
            />
          </div>
          <div className="col-span-4 w-60">
            <h6 className="text-lg font-semibold pt-3 border-b-2 border-black">
              Legend
            </h6>
            <section className="mt-4">
              <div className="flex justify-between">
                <p>Very Good</p>
                <div className="bg-legend-vgood border w-9 h-4"></div>
              </div>
              <div className="flex justify-between">
                <p>Good</p>
                <div className="bg-legend-good border w-9 h-4"></div>
              </div>
              <div className="flex justify-between">
                <p>Average</p>
                <div className="bg-legend-ave border w-9 h-4"></div>
              </div>
              <div className="flex justify-between">
                <p>Poor</p>
                <div className="bg-legend-poor border w-9 h-4"></div>
              </div>
              <div className="flex justify-between">
                <p>Very Poor</p>
                <div className="bg-legend-vpoor border w-9 h-4"></div>
              </div>
            </section>
          </div>
        </div>
        <div className="row-span-2 mx-3 overflow-auto max-h-52 md:overflow-auto mt-10">
          <p className="inline-block text-justify">
            Chart Description: Paragraph (Large) Lorem ipsum dolor sit amet,
            consectetuer adipiscing elit, sed diam nonummy nibh euismod
            tincidunt ut laoreet dolore magna. Lorem ipsum dolor sit amet,
            consectetuer adipiscing elit, sed diam nonummy nibh euismod
            tincidunt ut laoreet dolore magna. Lorem ipsum dolor sit amet,
            consectetuer adipiscing elit, sed diam nonummy nibh euismod
            tincidunt ut laoreet dolore magna. Chart Description: Paragraph
            (Large) Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
          </p>
        </div>
      </div>
      <div className="w-96">
        {
          <StudentDialog
            quarter={quarter}
            category={category}
            topStudents={topStudents}
            open={open}
            setIsOpen={setIsOpen}
          />
        }
      </div>
      <pre>{/*students ? JSON.stringify(students, null, 2) : "No data"*/}</pre>
    </div>
  );
};
