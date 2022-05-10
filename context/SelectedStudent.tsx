import { createContext, useContext, useState } from "react";
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

  return (
    <SelectedStudentContext.Provider value={{ student, setStudent }}>
      {children}
    </SelectedStudentContext.Provider>
  );
};
