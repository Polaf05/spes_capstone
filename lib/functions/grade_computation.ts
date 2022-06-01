import { Student } from "../../types/Students";
import { Score, TaskScores } from "../../types/Task";

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

export const getScorePCT = (score: number, total: number) =>
  Number(((score / total) * 100).toFixed(1));
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
export const getTaskScores = (students: Student[], quarter_length: number) => {
  let array_task_scores: TaskScores[][] = [];
  for (let i = 0; i < quarter_length; i++) {
    let task_scores: TaskScores[] = [];
    // get tasks info per student
    students.map((student) => {
      let task_scores_per_quarter: TaskScores = {
        written_works: {
          scores: [],
          ave_score_pct: 0,
        },
        performance_tasks: {
          scores: [],
          ave_score_pct: 0,
        },
      };
      // get task info for written works
      let arr_ww_score_pct: number[] = [];
      student.quarter![i].written_works?.map((task) => {
        const score: Score = {
          score: task.score,
          hp_score: task.highest_possible_score,
          score_pct: getScorePCT(task.score, task.highest_possible_score),
        };
        arr_ww_score_pct.push(
          getScorePCT(task.score, task.highest_possible_score)
        );
        task_scores_per_quarter.written_works.scores.push(score);
      });

      //get task info for performance tasks
      let arr_pt_score_pct: number[] = [];
      student.quarter![i].performance_tasks?.map((task) => {
        const score: Score = {
          score: task.score,
          hp_score: task.highest_possible_score,
          score_pct: getScorePCT(task.score, task.highest_possible_score),
        };
        arr_pt_score_pct.push(
          getScorePCT(task.score, task.highest_possible_score)
        );
        task_scores_per_quarter.performance_tasks.scores.push(score);
      });

      // ave score pct for written works and performance tasks
      task_scores_per_quarter.written_works.ave_score_pct = getAverageGrade([
        arr_ww_score_pct,
      ])[0];
      task_scores_per_quarter.performance_tasks.ave_score_pct = getAverageGrade(
        [arr_pt_score_pct]
      )[0];

      task_scores.push(task_scores_per_quarter);
    });

    array_task_scores.push(task_scores);
  }

  return array_task_scores;
};
export const getSum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);

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
          : option === "ptasks"
          ? student.quarter![i].performance_percentage?.score
          : option === "quarter"
          ? student.quarter![i].grade_before
          : student.final_grade_before
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

export const transmuteGrade = (grade: number) => {
  const equivalent: number[] = [
    99.99, 98.39, 96.79, 95.19, 93.59, 91.99, 90.39, 88.79, 87.19, 85.59, 83.99,
    82.39, 80.79, 79.19, 77.59, 75.99, 74.39, 72.19, 69.59, 67.99, 66.39, 64.79,
    63.19, 61.59, 59.99, 55.99, 51.99, 47.99, 43.99, 39.99, 31.99, 27.99, 23.99,
    19.99, 15.99, 11.99, 7.99, 3.99,
  ];

  let transmuted_grade = 100;
  for (let i = 0; i < equivalent.length; i++) {
    if (equivalent[i] < grade) break;
    transmuted_grade -= 1;
  }

  return transmuted_grade;
};
