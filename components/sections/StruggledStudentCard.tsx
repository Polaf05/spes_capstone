import React, { useState } from "react";
import { useSelectedStudent } from "../../hooks/useSelectedStudent";
import { toggleModule } from "../../lib/functions/chart";
import { formatName } from "../../lib/functions/concat";
import { StruggledStudent } from "../../types/Students";

const StruggledStudentCard = ({
  struggledStudents,
  struggledStudents_length,
  title,
  open,
  setIsOpen,
  setDialog,
  setStrgStudent,
  categoryTitle,
  setCategoryTitle,
}: {
  struggledStudents: StruggledStudent[];
  struggledStudents_length: number;
  title: string;
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDialog: React.Dispatch<React.SetStateAction<string>>;
  setStrgStudent: React.Dispatch<React.SetStateAction<StruggledStudent | null>>;
  categoryTitle: string;
  setCategoryTitle: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { setStudent } = useSelectedStudent();
  // struggled student

  return (
    <div>
      {struggledStudents_length > 0 && (
        <div className="my-2 py-2 border-2 border-red-300 rounded-xl">
          <div className="flex justify-between px-4 font-semibold xl:text-lg border-b-2 border-red-300">
            <h4>{title}</h4>
            <h4>Task No.</h4>
          </div>
          <div className={"space-y-2 max-h-[50vh] overflow-auto"}>
            {struggledStudents.map(
              (student, idx) =>
                toggleModule(title, student) && (
                  <div
                    key={idx}
                    onClick={() => {
                      setStudent(student.student);
                      setIsOpen(true);
                      setDialog("struggled students");
                      setStrgStudent(student);
                      setCategoryTitle(title);
                    }}
                    className="hover:bg-red-100 hover:cursor-pointer px-4 py-1"
                  >
                    <div className="flex justify-between hover:font-semibold">
                      <h4 className="xl:text-lg">
                        {formatName(student.student.name)}
                      </h4>
                      <h4 className="xl:text-lg">
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
