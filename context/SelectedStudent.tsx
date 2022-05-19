import { createContext, useContext, useEffect, useState } from "react";
import { Student } from "../types/Students";

interface SelectedStudent {
  student: Student | null;
  setStudent: React.Dispatch<React.SetStateAction<Student | null>>;
}

export const SelectedStudentContext = createContext<SelectedStudent>(
  {} as SelectedStudent
);

export const SelectedStudentProvider: React.FC = ({ children }) => {
  const [student, setStudent] = useState<Student | null>(null);

  // on load get students
  useEffect(() => {
    // const students = getInitialState();
    // setStudents(students);
    const localStudent = localStorage.getItem("student");
    if (localStudent) setStudent(JSON.parse(localStudent));
  }, []);

  // on set student
  useEffect(() => {
    if (student) localStorage.setItem("student", JSON.stringify(student));
  }, [student]);

  return (
    <SelectedStudentContext.Provider value={{ student, setStudent }}>
      {children}
    </SelectedStudentContext.Provider>
  );
};
