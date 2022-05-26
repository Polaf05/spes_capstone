import { createContext, useContext, useEffect, useState } from "react";
import { Student, Classroom } from "../types/Students";

export const SetClassroomContext = createContext<Classroom>({} as Classroom);

export const SetClassroomProvider: React.FC = ({ children }) => {
  const [students, setStudents] = useState<Student[] | null>(null);

  // on load get students
  useEffect(() => {
    // const students = getInitialState();
    // setStudents(students);
    const localStudents = localStorage.getItem("students");
    if (localStudents) setStudents(JSON.parse(localStudents));
  }, []);

  // on set student
  useEffect(() => {
    if (students) localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  return (
    <SetClassroomContext.Provider value={{ students, setStudents }}>
      {children}
    </SetClassroomContext.Provider>
  );
};
