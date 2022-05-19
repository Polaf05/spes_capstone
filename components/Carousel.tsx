import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelectedStudent } from "../hooks/useSelectedStudent";
import { useClassroom } from "../hooks/useSetClassroom";
import { Student } from "../types/Students";
import StudentCard from "./StudentCard";

const CarouselComponent = () => {
  const { students } = useClassroom();
  const { student, setStudent } = useSelectedStudent();
  const [page, setPage] = useState<string | null>(null);
  const [id, setId] = useState(student?.id);
  const router = useRouter();

  const myStudents = students;

  useEffect(() => {
    // const students = getInitialState();
    // setStudents(students);
    const localStudent = localStorage.getItem("student");
    if (!localStudent) router.back();
    if (localStudent) setStudent(JSON.parse(localStudent));
  }, []);

  useEffect(() => {
    const student = students[id];
    setStudent(student);
    console.log(id);
  }, [id]);

  return (
    <>
      {student && (
        <div className="h-screen border p-10">
          <div className="w-full h-full bg-ocean-100">
            {student.name}
            <div className="flex justify-between">
              {id > 0 && (
                <button
                  className="w-20 h-20 bg-ocean-200"
                  onClick={() => {
                    setId(id - 1);
                  }}
                >
                  Prev
                </button>
              )}
              {id < students?.length && (
                <button
                  className="w-20 h-20 bg-ocean-200"
                  onClick={() => {
                    setId(id + 1);
                  }}
                >
                  Next
                </button>
              )}
            </div>
          </div>

          {/* <pre>{student ? JSON.stringify(student, null, 2) : "No data"}</pre> */}
        </div>
      )}
    </>
  );
};

export default CarouselComponent;
