import React from "react";
import { Student } from "../types/Students";

const StudentCard = (student: Student) => {
  return (
    <>
      <div className="">
        {student.name}
        {
          // <pre>
          //   {student_info ? JSON.stringify(student_info, null, 2) : "No data"}
          // </pre>
        }
      </div>
    </>
  );
};

export default StudentCard;
