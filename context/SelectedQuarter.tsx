import { createContext, useContext, useEffect, useState } from "react";
import { Student } from "../types/Students";

interface SelectedQuarter {
  quarter: number;
  setQuarter: React.Dispatch<React.SetStateAction<number>>;
}

export const SelectedQuarterContext = createContext<SelectedQuarter>(
  {} as SelectedQuarter
);

export const SelectedQuarterProvider: React.FC = ({ children }) => {
  const [quarter, setQuarter] = useState<number>(-1);

  // on load get students
  useEffect(() => {
    // const students = getInitialState();
    // setQuarters(students);
    const localQuarter = localStorage.getItem("quarter");
    if (localQuarter) setQuarter(JSON.parse(localQuarter));
  }, []);

  // on set student
  useEffect(() => {
    if (quarter) localStorage.setItem("quarter", JSON.stringify(quarter));
  }, [quarter]);

  return (
    <SelectedQuarterContext.Provider value={{ quarter, setQuarter }}>
      {children}
    </SelectedQuarterContext.Provider>
  );
};
