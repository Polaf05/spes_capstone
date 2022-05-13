import { SelectorIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import StudentDialog from "../../components/StudentDialog";
import { useSelectedStudent } from "../../hooks/useSelectedStudent";
import { useClassroom } from "../../hooks/useSetClassroom";
import { Student } from "../../types/Students";
import Table from "../test/table";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Tasks() {
  const { students } = useClassroom();
  const [sortingMethod, setSorting] = useState("Name");
  const { setStudent } = useSelectedStudent();
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [open, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setFilteredStudents(students!);
  }, [students]);
  useEffect(() => {
    const sortedStudents = students?.sort((a, b) => {
      switch (sortingMethod) {
        case "Grade Before":
          return b.grade_before - a.grade_before;
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
          return b.grade_after - a.grade_after;
        case "Adjustment Difference":
          return b.diff - a.diff;
        default:
          return 0;
      }
    });

    console.log(sortedStudents);

    setFilteredStudents([
      ...students!.sort((a, b) => {
        switch (sortingMethod) {
          case "Grade Before":
            return b.grade_before - a.grade_before;
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
            return b.grade_after - a.grade_after;
          case "Adjustment Difference":
            return b.diff - a.diff;
          default:
            return 0;
        }
      }),
    ]);
  }, [sortingMethod]);

  const labels = ["Very Good", "Good", "Average", "Poor", "Very Poor"];
  var count = [0, 0, 0, 0, 0];
  students?.forEach((student) => {
    const grade_before = student.grade_before;
    const grade_after = student.grade_after;
    const diff = grade_after - grade_before;
    const remark =
      diff >= 1.2 && grade_after > 90
        ? "Very Good"
        : diff > 0.0 && grade_after > 85
        ? "Good"
        : diff >= -0.5 && grade_after > 80
        ? "Average"
        : diff > -0.8 || grade_after > 75
        ? "Poor"
        : "Very Poor";

    const index = labels.indexOf(remark);
    count[index] += 1;
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
    <div className="bg-white h-screen grid grid-cols-12">
      <div className="col-span-7 p-12">
        <div className="text-2xl font-bold">
          <h1>Clasroom Assessment:</h1>
        </div>
        <div className="text-lg font-semibold">Sorted by: {sortingMethod}</div>
        <div className="w-full overflow-y-auto h-96">
          <table className="table-fixed min-w-full rounded-md text-lg text-left border-collapse">
            <thead className="border-b-2 bg-white sticky top-0">
              <tr className="text-center ">
                <th className="flex flex-row pl-2">
                  <button
                    className="font-semibold hover:cursor-pointer rounded-full px-4 hover:bg-ocean-100 focus-within:bg-ocean-100"
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
                <th>
                  <button
                    className="font-semibold hover:cursor-pointer rounded-full px-4 hover:bg-ocean-100 focus-within:bg-ocean-100"
                    onClick={() => setSorting("Remarks")}
                  >
                    Remarks
                  </button>
                </th>
              </tr>
            </thead>
            <tbody className="">
              {students?.map((student) => (
                <tr
                  className="odd:bg-yellow-50 hover:cursor-pointer text-center"
                  onClick={() => {
                    setStudent(student);
                    setIsOpen(true);
                  }}
                >
                  <td className="pl-4 text-left">{student.name}</td>
                  <td>{student.grade_before}</td>
                  <td className="text-base">({student.diff})</td>
                  <td>{student.grade_after}</td>
                  <td className="pr-4 text-right">{student.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="col-span-5 border px-12 grid grid-rows-4">
        <div className="border pt-12 row-span-1">
          <Doughnut
            data={data}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
              cutout: 150,
            }}
          />
        </div>
        <div className="row-span-1">Hakdog</div>
      </div>
      <StudentDialog open={open} setIsOpen={setIsOpen} />

      <pre>{/*students ? JSON.stringify(students, null, 2) : "No data"*/}</pre>
    </div>
  );
}
