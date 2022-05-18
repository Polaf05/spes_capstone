import React from "react";
import { useClassroom } from "../hooks/useSetClassroom";
import StudentCard from "./StudentCard";

const CarouselComponent = () => {
  const { students } = useClassroom();
  return (
    <>
      <div className="flex gap-4">
        {students?.map((student) => (
          <StudentCard student_info={student} />
        ))}
        <p>Test</p>
      </div>
    </>
  );
};

export default CarouselComponent;
