import { Student } from "../../types/Students";

export const getIndexOfStudent = (student: Student, students: Student[]) => {
  students.map((stud, idx) => {
    if (stud.id === student.id) {
      return idx;
    }
  });

  return 0;
};
