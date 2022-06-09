import { QuestionMarkCircleIcon } from "@heroicons/react/outline";
import React from "react";
import { formatName } from "../../lib/functions/concat";
import { StruggledStudent, Student } from "../../types/Students";
import StruggledStudentCard from "./StruggledStudentCard";

const StruggledSections = ({
  students,
  quarter,
  open,
  setIsOpen,
  setDialog,
  setStrgStudent,
  categoryTitle,
  setCategoryTitle,
}: {
  students: Student[];
  quarter: number;
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDialog: React.Dispatch<React.SetStateAction<string>>;
  setStrgStudent: React.Dispatch<React.SetStateAction<StruggledStudent | null>>;
  categoryTitle: string;
  setCategoryTitle: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const struggledStudents: StruggledStudent[] = [];

  students.map((student, idx) => {
    const thisStudent: StruggledStudent = {
      student: student,
      failedTasks: {
        pt: [],
        ww: [],
      },
      passedTasks: {
        pt: {
          passed: [],
          perfect: [],
        },
        ww: {
          passed: [],
          perfect: [],
        },
      },

      pt_length: student?.quarter![quarter].written_works?.length!,
      ww_length: student?.quarter![quarter].performance_tasks?.length!,
    };
    //let nodata_tasks: number[] | null = null;
    student?.quarter![quarter].written_works?.map((task, idx) => {
      if (task.status === "Perfect") {
        thisStudent.passedTasks.ww.perfect.push(task.tasked_number);
      } else if (task.status === "Passed") {
        thisStudent.passedTasks.ww.passed.push(task.tasked_number);
      } else {
        thisStudent.failedTasks.ww.push(task.tasked_number);
      }
    });
    student?.quarter![quarter].performance_tasks?.map((task, idx) => {
      if (task.status === "Perfect") {
        thisStudent.passedTasks.pt.perfect.push(task.tasked_number);
      } else if (task.status === "Passed") {
        thisStudent.passedTasks.pt.passed.push(task.tasked_number);
      } else {
        thisStudent.failedTasks.pt.push(task.tasked_number);
      }
    });

    const half_length = Number(
      (student?.quarter![quarter].written_works!.length * 0.5).toFixed()
    );
    struggledStudents.push(thisStudent);
  });

  let studentsExcelled: Student[] = [];
  struggledStudents.map((student) => {
    // if walang bagsak and may at least 1 perfect score
    if (
      student.failedTasks.ww.length === 0 &&
      student.failedTasks.pt.length === 0 &&
      (student.passedTasks.ww.perfect.length > 1 ||
        student.passedTasks.pt.perfect.length > 1)
    )
      studentsExcelled.push(student.student);
  });

  let struggledStudents_length = [0, 0];

  struggledStudents.map((student) => {
    if (student.failedTasks.ww.length > student.ww_length * 0.5) {
      struggledStudents_length[0] += 1;
    }
    if (student.failedTasks.pt.length > student.pt_length * 0.5) {
      struggledStudents_length[1] += 1;
    }
  });

  return struggledStudents_length[0] + struggledStudents_length[1] > 0 ? (
    <div className="grid grid-cols-10 gap-4">
      <div className="col-span-7">
        <h2 className="text-xl font-bold">Students Struggled</h2>
        <div className="flex gap-1 items-center">
          {/* <QuestionMarkCircleIcon className="w-4 h-4 text-neutral-500" /> */}
          <p className="text-neutral-600 text-[0.7rem]">
            Students who failed half of the given tasks
          </p>
        </div>
        <div className="mt-4 gap-4">
          <div className="">
            <StruggledStudentCard
              open={open}
              setIsOpen={setIsOpen}
              title="Written Works"
              struggledStudents={struggledStudents}
              struggledStudents_length={struggledStudents_length[0]}
              setDialog={setDialog}
              setStrgStudent={setStrgStudent}
              categoryTitle={categoryTitle}
              setCategoryTitle={setCategoryTitle}
            />
            <StruggledStudentCard
              open={open}
              setIsOpen={setIsOpen}
              title="Performance Tasks"
              struggledStudents={struggledStudents}
              struggledStudents_length={struggledStudents_length[1]}
              setDialog={setDialog}
              setStrgStudent={setStrgStudent}
              categoryTitle={categoryTitle}
              setCategoryTitle={setCategoryTitle}
            />
          </div>
        </div>
      </div>
      <div className="col-span-3">
        <h2 className="text-xl font-bold">Students Excelled</h2>
        <div className="flex gap-1 items-center">
          {/* <QuestionMarkCircleIcon className="w-4 h-4 text-neutral-500" /> */}
          <p className="text-neutral-600 text-[0.7rem]">
            Students with no failing task and with at least 1 perfect score
          </p>
        </div>

        <div className="mt-4 px-4 py-2 border-2 border-green-300 rounded-xl max-h-[50vh] overflow-auto">
          <div className="mt-4">
            {studentsExcelled.map((student) => (
              <h4 className="text-lg">{formatName(student.name)}</h4>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex justify-center">
      <div className="flex flex-col">
        <h3 className="text-xl font-bold">
          Wow! Outstanding classroom performance{" "}
        </h3>
        <p className="font-light"> All students passed all the tasks</p>
        <div className="w-1/2">
          <div className="my-2 px-4 py-2 w-[60vw] border-2 border-green-300 rounded-xl">
            <div className="flex justify-between">
              <h4>Students Excelled</h4>
            </div>
            <div className="mt-4 grid grid-cols-6 grid-flow-row gap-1 h-[50vh] overflow-auto">
              {studentsExcelled.map((student) => (
                <div className="col-span-3">
                  <h4 className="text-lg">{student.name}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StruggledSections;
