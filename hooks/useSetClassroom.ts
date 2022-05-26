import { useContext } from "react";
import { SetClassroomContext } from "../context/SetClassroom";

export const useClassroom = () => {
  const { students, setStudents } = useContext(SetClassroomContext);
  return { students, setStudents };
};
