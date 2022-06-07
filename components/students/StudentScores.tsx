import { XIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { useSelectedStudent } from "../../hooks/useSelectedStudent";
import { toggleModule } from "../../lib/functions/chart";
import { classNames, formatName } from "../../lib/functions/concat";
import { StruggledStudent } from "../../types/Students";

const StudentScores = ({
  strgStudent,
  category,
  categoryTitle,
  quarter,
  setIsOpen,
}: {
  quarter: number;
  strgStudent: StruggledStudent | null;
  category: string;
  categoryTitle: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { student } = useSelectedStudent();
  const [tasks, setTasks] = useState<number[] | null>(
    strgStudent
      ? categoryTitle === "Written Works"
        ? strgStudent.failedTasks.ww
        : strgStudent.failedTasks.pt
      : null
  );

  const task_array =
    categoryTitle === "Written Works"
      ? student?.quarter[quarter].written_works
      : student?.quarter[quarter].performance_tasks;
  return (
    strgStudent && (
      <div className="grid grid-cols-4">
        <div className="col-span-2">
          <h2 className="font-bold text-xl">
            {formatName(student ? student?.name : "Error loading name")}
          </h2>
          <h4 className="font-light text-sm">
            Student Struggled on the following tasks:
          </h4>
          <div className="col-span-2 grid grid-flow-row grid-cols-2 overflow-x-auto gap-4 mt-4">
            {task_array?.map(
              (task, idx) =>
                !task.status.match(/Passed|Perfect/g) && (
                  <div
                    className={classNames(
                      "h-16 p-3 rounded-md flex justify-between",
                      task.status === "Failed"
                        ? "bg-red-100"
                        : task.status === "Considerable"
                        ? "bg-orange-100"
                        : "bg-neutral-200"
                    )}
                  >
                    <div>
                      <p className="text-[0.7rem]">
                        Task {task.tasked_number}:
                      </p>
                      <p className="font-bold text-lg">
                        {task.score} / {task.highest_possible_score}
                      </p>
                    </div>
                    {task.status === "Considerable" ? (
                      <div className="flex justify-center items-center w-10 h-10 border-4 border-orange-300 opacity-50 rounded-full">
                        <h1 className="text-xl font-bold text-orange-300">C</h1>
                      </div>
                    ) : (
                      <div className="w-10 h-w-10 border-4 border-red-300 rounded-full opacity-50">
                        <XIcon className="text-red-300" />
                      </div>
                    )}
                  </div>
                )
            )}
          </div>
        </div>
        <div className="col-span-2 flex justify-end">
          <p
            onClick={() => setIsOpen(false)}
            className="underline decoration-2 underline-offset-4 hover:cursor-pointer"
          >
            Go Back
          </p>
        </div>
      </div>
    )
  );
};

export default StudentScores;
