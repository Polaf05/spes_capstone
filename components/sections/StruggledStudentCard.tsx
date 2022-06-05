import React from "react";
import { formatName } from "../../lib/functions/concat";
import { StruggledStudent } from "../../types/Students";

const toggleModule = (option: string, student: StruggledStudent) => {
  switch (option) {
    case "Written Works":
      return student.failedTasks.ww.length > student.ww_length * 0.5;
    case "Performance Tasks":
      return student.failedTasks.pt.length > student.pt_length * 0.5;
    default:
      return null;
  }
};

const StruggledStudentCard = ({
  struggledStudents,
  struggledStudents_length,
  title,
}: {
  struggledStudents: StruggledStudent[];
  struggledStudents_length: number;
  title: string;
}) => {
  return (
    <div>
      {struggledStudents_length > 0 && (
        <div className="my-2 px-4 py-2 border-2 border-red-300 rounded-xl">
          <div className="flex justify-between">
            <h4>{title}</h4>
            <h4>Task No.</h4>
          </div>
          <div className={""}>
            {struggledStudents.map(
              (student) =>
                toggleModule(title, student) && (
                  <div className="mt-4">
                    <div className="flex justify-between">
                      <h4 className="text-lg font-semibold">
                        {formatName(student.student.name)}
                      </h4>
                      <h4 className="text-lg font-semibold">
                        {title === "Written Works"
                          ? student.failedTasks.ww.join(", ")
                          : student.failedTasks.pt.join(", ")}
                      </h4>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StruggledStudentCard;
