import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelectedStudent } from "../hooks/useSelectedStudent";
import { useClassroom } from "../hooks/useSetClassroom";
import { Student } from "../types/Students";
import StudentCard from "./StudentCard";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const CarouselComponent = () => {
  const { students } = useClassroom();
  const { student, setStudent } = useSelectedStudent();
  const [page, setPage] = useState<string | null>(null);
  const [id, setId] = useState<number>(student?.id);
  const [length] = useState<number>(students?.length);
  const router = useRouter();
  console.log(id);

  useEffect(() => {
    // const students = getInitialState();
    // setStudents(students);
    const localStudent = localStorage.getItem("student");
    if (!localStudent) router.back();
    if (localStudent) setStudent(JSON.parse(localStudent));
  }, []);

  useEffect(() => {
    if (student) {
      console.log(id);
      const myStudent: any = students?.forEach((student) => {
        if (student.id === id) return student;
      });
      setStudent(myStudent);
    }
  }, [id]);

  return (
    <>
      {student && (
        <div className="h-screen border p-10 ">
          <div className="w-full h-full bg-ocean-100 rounded-3xl">
            <div className="grid grid-cols-12 h-full place-content-center">
              <div className="col-span-2 boder">
                {
                  <button
                    className={classNames(
                      "grid place-content-center w-16 h-16 rounded-full bg-ocean-200",
                      student.id === 0 ? "cursor-not-allowed opacity-50" : ""
                    )}
                    onClick={() => {
                      setId(id - 1);
                    }}
                  >
                    <ChevronLeftIcon className="w-10" />
                  </button>
                }
              </div>
              <div className="col-span-8 border">{student.name}</div>
              <div className="col-span-2 border flex justify-end">
                {
                  <button
                    className={classNames(
                      "grid place-content-center w-16 h-16 rounded-full bg-ocean-200",
                      student.id === length - 1
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    )}
                    onClick={() => {
                      setId(id + 1);
                    }}
                  >
                    <ChevronRightIcon className="w-10" />
                  </button>
                }
              </div>
            </div>
          </div>

          {/* <pre>{student ? JSON.stringify(student, null, 2) : "No data"}</pre> */}
        </div>
      )}
    </>
  );
};

export default CarouselComponent;
