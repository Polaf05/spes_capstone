import React from "react";
import { Student } from "../types/Students";

const StudentCard = (student_info: any) => {
  return (
    <>
      <div>
        {
          <pre>
            {student_info ? JSON.stringify(student_info, null, 2) : "No data"}
          </pre>
        }
      </div>
    </>
  );
};

export default StudentCard;
