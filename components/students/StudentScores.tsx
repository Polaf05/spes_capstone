import React from "react";
import { useSelectedStudent } from "../../hooks/useSelectedStudent";
import { formatName } from "../../lib/functions/concat";
import { StruggledStudent } from "../../types/Students";

const StudentScores = ({
  strgStudent,
}: {
  strgStudent: StruggledStudent | null;
}) => {
  const { student } = useSelectedStudent();

  return (
    strgStudent && (
      <div>
        <h2 className="font-bold text-xl">
          {formatName(student ? student?.name : "Error loading name")}
        </h2>
        <h4 className="font-light">
          Student Struggled on the following tasks:
          {strgStudent.failedTasks.ww}
        </h4>
      </div>
    )
  );
};

export default StudentScores;
