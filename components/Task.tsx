import React, { useState, useContext, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useClassroom } from "../hooks/useSetClassroom";
import { useSelectedStudent } from "../hooks/useSelectedStudent";
import { Student } from "../types/Students";
import StudentDialog from "./StudentDialog";
import {
  displayData,
  getGrade,
  getRemarks,
} from "../lib/functions/grade_computation";
import { classNames, formatName } from "../lib/functions/concat";

ChartJS.register(ArcElement, Tooltip, Legend);

export const Task = ({
  students,
  category,
  assessment,
  open,
  setIsOpen,
  quarter,
}: {
  students: Student[];
  category: string;
  assessment: string;
  setIsOpen: any;
  open: boolean;
  quarter: number;
}) => {
  const [sortingMethod, setSorting] = useState("Name");
  const { setStudent } = useSelectedStudent();
  const [filteredStudents, setFilteredStudents] = useState<Student[] | null>(
    students!
  );
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
                ? b.quarter![quarter].written_percentage?.score! -
                  a.quarter![quarter].written_percentage?.score!
                : b.quarter![quarter].performance_percentage?.score! -
                  a.quarter![quarter].performance_percentage?.score!;
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
                ? b.quarter![quarter].written_percentage?.score! -
                  a.quarter![quarter].written_percentage?.score!
                : b.quarter![quarter].performance_percentage?.score! -
                  a.quarter![quarter].performance_percentage?.score!;
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
    const i = labels.indexOf(
      category === "Over All"
        ? student.quarter![quarter].remarks
        : getRemarks(
            category === "Written Works"
              ? student.quarter![quarter].written_percentage?.score!
              : student.quarter![quarter].performance_percentage?.score!
          )
    );

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
    students && (
      <>
        <div className="grid grid-cols-12 gap-4 px-12">
          <div className="col-span-7">
            <div className="text-2xl font-bold">
              <h1>
                Clasroom Assessment:{" "}
                <span className="underline decoration-2">{assessment}</span>
              </h1>
            </div>
            <div className="text-lg font-semibold">
              Sorted by: {sortingMethod ? sortingMethod : "Name"}
            </div>
            <div className="w-full overflow-y-auto h-[60vh]">
              <table className="table-fixed min-w-full rounded-md text-lg text-left border-collapse">
                {/* Table Head - Buttons */}
                <thead className="border-b-2 bg-white sticky top-0">
                  <tr className="text-center">
                    <th className="flex items-center pl-2">
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
                        Adjustment
                      </button>
                    </th>
                    <th>
                      <button
                        className="font-semibold text- flex flex-col hover:cursor-pointer rounded-full px-4 hover:bg-ocean-100 focus-within:bg-ocean-100"
                        onClick={() => setSorting("Grade After")}
                      >
                        Suggested
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
                        className={classNames(
                          "hover:cursor-pointer text-center",
                          (category === "Over All"
                            ? student.quarter![quarter].grade_before
                            : getGrade(
                                category === "Written Works"
                                  ? student.quarter![quarter].written_percentage
                                      ?.score
                                  : student.quarter![quarter]
                                      .performance_percentage?.score
                              )) > 75
                            ? "odd:bg-yellow-50"
                            : "bg-red-200"
                        )}
                        onClick={() => {
                          setStudent(student);
                          setIsOpen(true);
                        }}
                        key={idx}
                      >
                        <td className="pl-4 font-semibold text-left">
                          {formatName(student.name)}
                        </td>
                        <td>
                          {category === "Over All"
                            ? student.quarter![quarter].grade_before
                            : displayData(
                                getGrade(
                                  category === "Written Works"
                                    ? student.quarter![quarter]
                                        .written_percentage?.score
                                    : student.quarter![quarter]
                                        .performance_percentage?.score
                                )
                              )}
                        </td>
                        <td className="text-base">
                          (
                          {category === "Over All"
                            ? student.quarter![quarter].diff
                            : 0}
                          )
                        </td>
                        <td>
                          {category === "Over All"
                            ? student.quarter![quarter].grade_after
                            : displayData(
                                getGrade(
                                  category === "Written Works"
                                    ? student.quarter![quarter]
                                        .written_percentage?.score
                                    : student.quarter![quarter]
                                        .performance_percentage?.score
                                )
                              )}
                        </td>
                        <td className="pr-4 text-right">
                          {category === "Over All"
                            ? student.quarter![quarter].remarks
                            : getRemarks(
                                category === "Written Works"
                                  ? student.quarter![quarter].written_percentage
                                      ?.score!
                                  : student.quarter![quarter]
                                      .performance_percentage?.score!
                              )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-span-5 h-fit">
            <div className="grid grid-cols-5 gap-4">
              <div className="col-span-3">
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
              <div className="col-span-2 h-fit">
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
            <div className="row-span-2 overflow-auto h-44 md:overflow-auto mt-5">
              <p className="inline-block text-justify">
                Chart Description: Paragraph (Large) Lorem ipsum dolor sit amet,
                consectetuer adipiscing elit, sed diam nonummy nibh euismod
                tincidunt ut laoreet dolore magna. Lorem ipsum dolor sit amet,
                consectetuer adipiscing elit, sed diam nonummy nibh euismod
                tincidunt ut laoreet dolore magna. Lorem ipsum dolor sit amet,
                consectetuer adipiscing elit, sed diam nonummy nibh euismod
                tincidunt ut laoreet dolore magna. Chart Description: Paragraph
                (Large) Lorem ipsum dolor sit amet, consectetuer adipiscing
                elit,
              </p>
            </div>
          </div>
          <div className="w-96">
            {
              <StudentDialog
                students={students}
                quarter={quarter}
                category={category}
                open={open}
                setIsOpen={setIsOpen}
              />
            }
          </div>
          <pre>
            {/*students ? JSON.stringify(students, null, 2) : "No data"*/}
          </pre>
        </div>
      </>
    )
  );
};
