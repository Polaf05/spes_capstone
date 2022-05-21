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
    let i = 0;
    students?.forEach((s) => {
      console.log(`[${i}]id:  ${s.id}`);
      if (s.id === id) setId(i);
      i += 1;
    });
  }, []);

  useEffect(() => {
    if (student) {
      // console.log(id);
      // const student: any = students?.forEach((student) => {
      //   if (student.id === id) return student;
      // });
      const student = students![id];
      setStudent(student);
    }
  }, [id]);

  return (
    <>
      {student && (
        <div className="h-[80vh]">
          <div className="w-full h-full bg-ocean-100 rounded-3xl">
            <div className="grid grid-cols-12 h-full place-content-center">
              <div className="col-span-2">
                {
                  <button
                    className={classNames(
                      "grid place-content-center w-16 h-16 rounded-full bg-ocean-200 opacity-90",
                      student.id === 0
                        ? "cursor-not-allowed opacity-50"
                        : " hover:opacity-100"
                    )}
                    onClick={() => {
                      if (student.id > 0) setId(id - 1);
                    }}
                  >
                    <ChevronLeftIcon className="w-10" />
                  </button>
                }
              </div>
              <div className="col-span-8 border">
                {student.name}
                <div>{}</div>
              </div>
              <div className="col-span-2 border flex justify-end">
                {
                  <button
                    className={classNames(
                      "grid place-content-center w-16 h-16 rounded-full bg-ocean-200 opacity-90",
                      student.id === length - 1
                        ? "cursor-not-allowed opacity-50"
                        : " hover:opacity-100"
                    )}
                    onClick={() => {
                      if (student.id < length - 1) setId(id + 1);
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
