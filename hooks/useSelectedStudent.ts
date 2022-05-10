import { useContext } from "react";
import { SelectedStudentContext } from "../context/SelectedStudent";

export const useSelectedStudent = () => {
  const { student, setStudent } = useContext(SelectedStudentContext);
  return { student, setStudent };
};
