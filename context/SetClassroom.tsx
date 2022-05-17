import { createContext, useContext, useEffect, useState } from "react";
import { Student, Classroom } from "../types/Students";

export const SetClassroomContext = createContext<Classroom>({} as Classroom);

export const SetClassroomProvider: React.FC = ({ children }) => {
  const [students, setStudents] = useState<Student[] | null>(null);

  // on load get students
  useEffect(() => {
    const localStudents = localStorage.getItem("students");
    setStudents(JSON.parse(localStudents!));
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
