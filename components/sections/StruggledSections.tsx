import React from "react";
import { StruggledStudent, Student } from "../../types/Students";
import StruggledStudentCard from "./StruggledStudentCard";

const StruggledSections = ({
  students,
  quarter,
}: {
  students: Student[];
  quarter: number;
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

      pt_length: student?.quarter![quarter - 1].written_works?.length!,
      ww_length: student?.quarter![quarter - 1].performance_tasks?.length!,
    };
    //let nodata_tasks: number[] | null = null;
    student?.quarter![quarter - 1].written_works?.map((task, idx) => {
      if (task.status === "Perfect") {
        thisStudent.passedTasks.ww.perfect.push(task.tasked_number);
      } else if (task.status === "Passed") {
        thisStudent.passedTasks.ww.passed.push(task.tasked_number);
      } else {
        thisStudent.failedTasks.ww.push(task.tasked_number);
      }
    });
    student?.quarter![quarter - 1].performance_tasks?.map((task, idx) => {
      if (task.status === "Perfect") {
        thisStudent.passedTasks.pt.perfect.push(task.tasked_number);
      } else if (task.status === "Passed") {
        thisStudent.passedTasks.pt.passed.push(task.tasked_number);
      } else {
        thisStudent.failedTasks.pt.push(task.tasked_number);
      }
    });

    const half_length = Number(
      (student?.quarter![quarter - 1].written_works!.length * 0.5).toFixed()
    );
    struggledStudents.push(thisStudent);
  });

  let studentsExcelled: Student[] = [];
  struggledStudents.map((student) => {
    // if walang bagsak and may at least 1 perfect score
    if (
      student.failedTasks.pt.length === 0 &&
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
        <div className="mt-4 gap-4">
          <div className="">
            <StruggledStudentCard
              title="Written Works"
              struggledStudents={struggledStudents}
              struggledStudents_length={struggledStudents_length[0]}
            />
            <StruggledStudentCard
              title="Performance Tasks"
              struggledStudents={struggledStudents}
              struggledStudents_length={struggledStudents_length[1]}
            />
          </div>
        </div>
      </div>
      <div className="col-span-3">
        <h2 className="text-xl font-bold">Students Excelled</h2>
        <div className="mt-4 h-fit px-4 py-2 border-2 border-green-300 rounded-xl">
          <div className="mt-4">
            {studentsExcelled.map((student) => (
              <h4 className="text-lg font-bold">{student.name}</h4>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col">
      <h3 className="text-xl font-bold">
        Wow! Outstanding classroom performance{" "}
      </h3>
      <p className="font-light"> All students passed all the tasks</p>
      <div className="w-1/2">
        <div className="my-2 h-fit px-4 py-2 border-2 border-green-300 rounded-xl">
          <div className="flex justify-between">
            <h4>Students Excelled</h4>
          </div>
          <div className="mt-4">
            {studentsExcelled.map((student) => (
              <h4 className="text-lg font-bold">{student.name}</h4>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StruggledSections;
