import { SelectorIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useSelectedStudent } from "../../hooks/useSelectedStudent";
import { useClassroom } from "../../hooks/useSetClassroom";
import { Student } from "../../types/Students";

export default function Tasks() {
  const { students } = useClassroom();
  console.log(students);
  const [sortingMethod, setSorting] = useState("name");
  const { setStudent } = useSelectedStudent();
  const [filteredStudents, setFilteredStudents] = useState<Student[] | null>(
    students
  );

  useEffect(() => {
    setFilteredStudents([
      ...filteredStudents!.sort((a, b) => {
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

  return (
    <div className="bg-white h-screen w-screen">
      <div className="w-7/12 border p-12">
        <div className="text-2xl font-bold">
          <h1>Clasroom Assessment:</h1>
        </div>
        <div className="text-lg font-semibold">Sorted by: {sortingMethod}</div>
        <div className="w-full">
          <table className="table-fixed min-w-full rounded-md text-lg text-left border-collapse">
            <thead className="border-b-2">
              <tr className="">
                <th className="flex flex-row pl-2">
                  <button
                    className="hover:cursor-pointer rounded-full px-4 hover:bg-ocean-100 focus-within:bg-ocean-100"
                    onClick={() => setSorting("Name")}
                  >
                    Name
                  </button>
                </th>
                <th>
                  <button
                    className="hover:cursor-pointer rounded-full px-4 hover:bg-ocean-100 focus-within:bg-ocean-100"
                    onClick={() => setSorting("Grade Before")}
                  >
                    Before
                  </button>
                </th>
                <th>
                  <button
                    className="hover:cursor-pointer rounded-full px-4 hover:bg-ocean-100 focus-within:bg-ocean-100"
                    onClick={() => setSorting("Adjustment Difference")}
                  >
                    +/-
                  </button>
                </th>
                <th>
                  <button
                    className="hover:cursor-pointer rounded-full px-4 hover:bg-ocean-100 focus-within:bg-ocean-100"
                    onClick={() => setSorting("Grade After")}
                  >
                    After
                  </button>
                </th>
                <th>
                  <button
                    className="hover:cursor-pointer rounded-full px-4 hover:bg-ocean-100 focus-within:bg-ocean-100"
                    onClick={() => setSorting("Remarks")}
                  >
                    Remarks
                  </button>
                </th>
              </tr>
            </thead>
            <tbody className="">
              {filteredStudents?.map((student) => (
                <tr className="odd:bg-yellow-50 hover:cursor-pointer">
                  <td className="pl-2">{student.name}</td>
                  <td>{student.grade_before}</td>
                  <td>{student.diff}</td>
                  <td>{student.grade_after}</td>
                  <td>{student.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <pre>{/*students ? JSON.stringify(students, null, 2) : "No data"*/}</pre>
    </div>
  );
}
