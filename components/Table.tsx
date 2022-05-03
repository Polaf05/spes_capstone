import {
  ArrowSmUpIcon,
  SelectorIcon,
  SortAscendingIcon,
  SwitchVerticalIcon,
} from "@heroicons/react/outline";
import React, { useState } from "react";
import { Student } from "../types/Students";

const Table = ({ students }: { students: Student[] }) => {
  let counter = 0;

  const [sortingMethod, setSorting] = useState("name");

  const handleChange = (e: any) => {
    setSorting(e.target.value);
  };
  console.log(sortingMethod);
  if (sortingMethod == "grade_before") {
    students.sort((a, b) => {
      return b.grade_before - a.grade_before;
    });
  } else if (sortingMethod == "name") {
    students.sort((a, b) => {
      let fa = a.name.toLowerCase(),
        fb = b.name.toLowerCase();

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
  } else if (sortingMethod == "grade_after") {
    students.sort((a, b) => {
      return b.grade_after - a.grade_after;
    });
  } else {
    students.sort((a, b) => {
      return b.diff - a.diff;
    });
  }

  return (
    <div className="w-full bg-gray-50">
      <div className={"relative mx-10 pb-2 text-base grid grid-cols-6 gap-4"}>
        <div className="col-span-3 ">
          <button
            type="button"
            onClick={handleChange}
            value="name"
            className="flex gap-4 text-center focus:text-ocean-400 bg-transparent hover:bg-ocean-400/[0.2] text-gray-900 font-semibold  py-1 px-3 hover:-transparent rounded-full"
          >
            Name
          </button>
        </div>
        <div className="col-span-3 flex gap-10 ">
          <div className="">
            <button
              type="button"
              onClick={handleChange}
              value="grade_before"
              className="flex gap-2 items-center focus:text-ocean-400 bg-transparent hover:bg-ocean-400/[0.2] text-gray-900 font-semibold py-1 px-3 hover:-transparent rounded-full"
            >
              Before
            </button>
          </div>
          <div className="=">
            <button
              type="button"
              onClick={handleChange}
              value="+/-"
              className="flex gap-2 bg-transparent focus:text-ocean-400 hover:bg-ocean-400/[0.2] text-gray-900 font-semibold py-1 px-3 hover:-transparent rounded-full"
            >
              +/-
            </button>
          </div>
          <div className="">
            <button
              type="button"
              onClick={handleChange}
              value="grade_after"
              className="flex gap-2 bg-transparent focus:text-ocean-400 hover:bg-ocean-400/[0.2] text-gray-900 font-semibold py-1 px-3 hover:-transparent rounded-full"
            >
              After
            </button>
          </div>
          <div className="pl-2">
            <button
              type="button"
              onClick={handleChange}
              value="remarks"
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
              {students.map((student) => (
                <tr
                  key={student.id}
                  className={
                    (counter += 1) % 2
                      ? "bg-table-delawan text-left"
                      : " bg-gray-50 text-left"
                  }
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-bold whitespace-nowrap  "
                  >
                    {student.name}
                  </th>
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
