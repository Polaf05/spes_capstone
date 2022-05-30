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

export const getSum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);
export const getAverageGrade = (arr: number[][]) => {
  //get array length
  const length = arr.length;
  let ave_grade_per_quarter: number[] = [];
  arr.forEach((quarter) => {
    //get sum of all item in array
    const sum = getSum(quarter);
    //compute for average
    const ave = Number((sum / quarter.length).toFixed(1));
    ave_grade_per_quarter.push(ave);
  });
  return ave_grade_per_quarter;
};

export const getGradeArray = (
  option: string,
  students: Student[],
  q: number
) => {
  //array of arrays
  const grade_array: number[][] = [];
  for (let i = 0; i < q; i++) {
    //get all student grades for each available quarter
    let arr: number[] = [];
    students.map((student) => {
      //toggle between wworks and ptasks
      const grade = getGrade(
        option === "wworks"
          ? student.quarter![i].written_percentage?.score
          : student.quarter![i].performance_percentage?.score
      );
      //if student has data
      if (grade !== -1) {
        arr.push(grade);
      }
    });
    //grade array
    grade_array.push(arr);
  }
  return grade_array;
};
