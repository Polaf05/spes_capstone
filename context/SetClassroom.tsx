import { createContext, useContext, useState } from "react";
import { Student, Classroom } from "../types/Students";

export const SetClassroomContext = createContext<Classroom>({} as Classroom);

export const SetClassroomProvider: React.FC = ({ children }) => {
  const [classroom, setClassroom] = useState<Classroom | null>(null);

  return (
    <SetClassroomContext.Provider value={{ classroom, setClassroom }}>
      {children}
    </SetClassroomContext.Provider>
  );
};
