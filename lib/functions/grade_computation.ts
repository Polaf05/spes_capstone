export const getRemarks = (grade: number) => {
  return grade < 75
    ? "Very Poor"
    : grade < 83
    ? "Poor"
    : grade < 90
    ? "Average"
    : grade < 97
    ? "Good"
    : "Very Good";
};

export const getGrade = (grade: any) =>
  typeof grade === "string" ? -1 : grade;

export const displayData = (grade: number) =>
  grade === -1 ? "no data" : grade;
