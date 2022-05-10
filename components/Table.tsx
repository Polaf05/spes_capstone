import {
  ArrowSmUpIcon,
  SelectorIcon,
  SortAscendingIcon,
  SwitchVerticalIcon,
} from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useSelectedStudent } from "../hooks/useSelectedStudent";
import { Student } from "../types/Students";

const Table = ({
  students,
  setIsOpen,
}: {
  students: Student[];
  setIsOpen: any;
}) => {
  let counter = 0;

  const [sortingMethod, setSorting] = useState("name");
  const { setStudent } = useSelectedStudent();
  const [filteredStudents, setFilteredStudents] = useState<Student[]>(students);

  useEffect(() => {
    setFilteredStudents([
      ...filteredStudents.sort((a, b) => {
        switch (sortingMethod) {
          case "grade_before":
            return b.grade_before - a.grade_before;
          case "name":
            let fa = a.name.toLowerCase(),
              fb = b.name.toLowerCase();

            if (fa < fb) {
              return -1;
            }
            if (fa > fb) {
              return 1;
            }
            return 0;
          case "grade_after":
          case "remarks":
            return b.grade_after - a.grade_after;
          case "+/-":
            return b.diff - a.diff;
          default:
            return 0;
        }
      }),
    ]);
  }, [sortingMethod]);

  return (
    <div className="w-full bg-gray-50">
      <div className={"relative mx-10 pb-2 text-base grid grid-cols-6 gap-4"}>
        <div className="col-span-3 ">
          <button
            type="button"
            onClick={() => setSorting("name")}
            className="flex gap-4 text-center focus:text-ocean-400 bg-transparent hover:bg-ocean-400/[0.2] text-gray-900 font-semibold  py-1 px-3 hover:-transparent rounded-full"
          >
            Name
          </button>
        </div>
        <div className="col-span-3 flex gap-10 ">
          <div className="">
            <button
              type="button"
              onClick={() => setSorting("grade_before")}
              className="flex gap-2 items-center focus:text-ocean-400 bg-transparent hover:bg-ocean-400/[0.2] text-gray-900 font-semibold py-1 px-3 hover:-transparent rounded-full"
            >
              Before
            </button>
          </div>
          <div className="">
            <button
              type="button"
              onClick={() => setSorting("+/-")}
              className="flex gap-2 bg-transparent focus:text-ocean-400 hover:bg-ocean-400/[0.2] text-gray-900 font-semibold py-1 px-3 hover:-transparent rounded-full"
            >
              +/-
            </button>
          </div>
          <div className="">
            <button
              type="button"
              onClick={() => setSorting("grade_after")}
              className="flex gap-2 bg-transparent focus:text-ocean-400 hover:bg-ocean-400/[0.2] text-gray-900 font-semibold py-1 px-3 hover:-transparent rounded-full"
            >
              After
            </button>
          </div>
          <div className="pl-2">
            <button
              type="button"
              onClick={() => setSorting("remarks")}
              className="flex gap-2 bg-transparent focus:text-ocean-400 hover:bg-ocean-400/[0.2] text-gray-900 font-semibold py-1 px-3 hover:-transparent rounded-full"
            >
              Remarks
            </button>
          </div>
        </div>
      </div>
      <div className="relative px-8 pb-4 overflow-auto max-h-[50vh]">
        <table className="w-full text-center text-black ">
          {
            <tbody className="text-lg">
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className={
                    (counter += 1) % 2
                      ? "bg-table-delawan text-left"
                      : " bg-gray-50 text-left"
                  }
                >
                  <td
                    onClick={() => {
                      setStudent(student);
                      setIsOpen(true);
                    }}
                    scope="row"
                    className="px-6 py-4 font-bold whitespace-nowrap  "
                  >
                    {student.name}
                  </td>
                  <td className="px-5 py-4">{student.grade_before}</td>
                  <td>
                    <span className="text-base">
                      {"(" + student.diff.toFixed(1) + ")"}
                    </span>
                  </td>

                  <td
                    className={
                      student.grade_before == student.grade_after
                        ? "px-5 py-4 text-gray-900 font-semibold"
                        : student.grade_before < student.grade_after
                        ? "px-5 py-4 text-green-800 font-semibold"
                        : "px-5 py-4 text-red-800 font-semibold"
                    }
                  >
                    {student.grade_after}
                  </td>

                  <td className="px-5 py-4 ">{student.remarks}</td>
                </tr>
              ))}
            </tbody>
          }
        </table>
      </div>
    </div>
  );
};

export default Table;
