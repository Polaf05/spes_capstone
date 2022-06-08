import { StruggledStudent } from "../../types/Students";

export const getLabels = (label: string, quarter_length: number) => {
  let arr: string[] = [];
  for (let i = 0; i < quarter_length; i++) {
    arr.push(`${label} ${i + 1}`);
  }
  return arr;
};

export const toggleModule = (
  option: string,
  student: StruggledStudent | null
) => {
  switch (option) {
    case "Written Works":
      return student
        ? student.failedTasks.ww.length > student.ww_length * 0.5
        : null;
    case "Performance Tasks":
      return student
        ? student.failedTasks.pt.length > student.pt_length * 0.5
        : null;
    default:
      return null;
  }
};
