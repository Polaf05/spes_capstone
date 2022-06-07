import { Student } from "../../types/Students";
import { getRemarks } from "./formatting";

export const performanceAnalysis = (
  student: Student,
  i: number,
  len: number
) => {
  let quarter: string[] = [];

  let remarks = getRemarks(student.quarter[i].grade_before).toLowerCase();

  let task = lineGraphAssessment(student, i);

  if (remarks === "very poor") {
    if (task.value < 3) {
      quarter.push(
        "The students needs attention, because his grade is very poor. " +
          task.linguistics
      );
    } else {
      quarter.push(
        "Althought Students grade is very poor, " + task.linguistics
      );
    }
  } else if (remarks === "poor") {
    if (task.value < 3) {
      quarter.push(
        "The students grade this quarter is poor " + task.linguistics
      );
    } else {
      quarter.push("Althought Students grade is poor, " + task.linguistics);
    }
  } else if (remarks === "average") {
    if (task.value < 3 || task.value > 3) {
      quarter.push(
        "The students grade this quarter is average but " + task.linguistics
      );
    } else {
      quarter.push(
        "The students grade this quarter is average and " + task.linguistics
      );
    }
  } else if (remarks === "good") {
    if (task.value < 3) {
      quarter.push("Althought Students grade is good, " + task.linguistics);
    } else {
      quarter.push(
        "The students grade this quarter is good but " + task.linguistics
      );
    }
  } else {
    if (task.value < 3) {
      quarter.push(
        "Althought Students grade is very good, " + task.linguistics
      );
    } else {
      quarter.push(
        "The students grade this quarter is good and " + task.linguistics
      );
    }
  }

  return quarter.join(" ");
};

export const lineGraphAssessment = (student: Student, i: number) => {
  // ligens lang malaakakan
  //downward = 1
  //slightly down = 2
  //consistent linear = 3
  //slightly upward = 4
  //upward = 5

  const performanceAssessment = () => {
    if (student.quarter[i].performace_tasks_analysis.trends === "upward") {
      return 5;
    } else if (
      student.quarter[i].performace_tasks_analysis.trends === "slightly upward"
    ) {
      return 4;
    } else if (
      student.quarter[i].performace_tasks_analysis.trends ===
      "consistent linear"
    ) {
      return 3;
    } else if (
      student.quarter[i].performace_tasks_analysis.trends ===
      "slightly downward"
    ) {
      return 2;
    } else if (
      student.quarter[i].performace_tasks_analysis.trends === "downward"
    ) {
      return 1;
    } else {
      return 0;
    }
  };

  let performance_results = performanceAssessment();

  if (student.quarter[i].written_tasks_analysis.trends === "upward") {
    switch (performance_results) {
      case 5:
        return {
          value: 5,
          linguistics:
            "the students performance in both written works and performance task is very good because both of this is going in an upward motion.",
        };
        break;
      case 4:
        return {
          value: 4,
          linguistics:
            "the students performance in his written works is very good because the trend of his performance is in an upward motion and his performance in performance task is slighlty going upward.",
        };
        break;
      case 3:
        return {
          value: 3,
          linguistics:
            "the students performance in his written works is very good because the trend of his perfoemance is in an upward motion but his perforamance in his performance task is just consistently linear.",
        };
        break;
      case 2:
        return {
          value: 2,
          linguistics:
            "the students perfromance in his written works is very good because the trend of his performance is in an upward motion while his performance in performance task is slightly going downward.",
        };
        break;
      case 1:
        return {
          value: 1,
          linguistics:
            "the students written works is very good because its trend is in an upward motion while his performance in performance task is going on the opposite direction and need direct attention.",
        };
        break;
      default:
        return {
          value: 0,
          linguistics: `the students written works is very good because its trend is in an upward motion while his performance in performance task is ${student.quarter[i].performace_tasks_analysis.trends}`,
        };
    }
  } else if (
    student.quarter[i].written_tasks_analysis.trends === "slightly upward"
  ) {
    switch (performance_results) {
      case 5:
        return {
          value: 5,
          linguistics:
            "the students performance in his written works is good because the trend of his performance is slightly going in an upward motion and his performance in performance task is very bacause it is going in an upward motion.",
        };
        break;
      case 4:
        return {
          value: 4,
          linguistics:
            "the students performance in both written works and perforamance task is good bacause it is both slightly doing in an upward motion.",
        };
        break;
      case 3:
        return {
          value: 3,
          linguistics:
            "the students performance in his written works is good because the trend of his performance is slightly going in an upward motion but his perforamance in his performance task is just consistently linear.",
        };
        break;
      case 2:
        return {
          value: 2,
          linguistics:
            "the students performance in his written works is good because the trend of his performance is slightly going in an upward motion while his performance in performance task is slightly going downward.",
        };
        break;
      case 1:
        return {
          value: 1,
          linguistics:
            "the students performance in his written works is good because the trend of his performance is slightly going in an upward motion while his performance in performance task is going on the opposite direction and need direct attention.",
        };
      default:
        return {
          value: 0,
          linguistics: `the students written works is good because its trend is in an upward motion while his performance in performance task is ${student.quarter[i].performace_tasks_analysis.trends}`,
        };
    }
  } else if (
    student.quarter[i].written_tasks_analysis.trends === "consistent linear"
  ) {
    switch (performance_results) {
      case 5:
        return {
          value: 5,
          linguistics:
            "the students performance in his written works is average because the trend of his performance is consistent and his performance in performance task is very good bacause it is going in an upward motion.",
        };
        break;
      case 4:
        return {
          value: 4,
          linguistics:
            "the students performance in his written works is average because the trend of his performance is consistent and his performance in performance task is good bacause the trend is slightly going upward.",
        };
        break;
      case 3:
        return {
          value: 3,
          linguistics:
            "the students performance in both written works and performance task all through out the quarter is consistent.",
        };
        break;
      case 2:
        return {
          value: 2,
          linguistics:
            "the students performance in his written works is average because the trend of his performance is consistent while his performance task is slightly going in a downward motion.",
        };
        break;
      case 1:
        return {
          value: 1,
          linguistics:
            "the students performance in his written works is average because the trend of his performance is consistent while his performance in performance task is very poor and needs a direct attention.",
        };
        break;
      default:
        return {
          value: 0,
          linguistics: `the students written works is average because its trend is in an upward motion while his performance in performance task is ${student.quarter[i].performace_tasks_analysis.trends}`,
        };
    }
  } else if (
    student.quarter[i].written_tasks_analysis.trends === "slightly downward"
  ) {
    switch (performance_results) {
      case 5:
        return {
          value: 5,
          linguistics:
            "the students performance in his written works is poor and its motion is slightly going downward and his performance in performance task is very good bacause it is going in an upward motion.",
        };
        break;
      case 4:
        return {
          value: 4,
          linguistics:
            "the students performance in his written works is poor and its motion is slightly going downward and his performance in performance task is good bacause the trend is slightly going upward.",
        };
        break;
      case 3:
        return {
          value: 3,
          linguistics:
            "the students performance in his written works is poor and its motion is slightly going downward and his performance in performance task si completely consistent.",
        };
        break;
      case 2:
        return {
          value: 2,
          linguistics:
            "both of his performance in written works and performance task is poor and is both slightly going on a downward motion.",
        };
        break;
      case 1:
        return {
          value: 1,
          linguistics:
            "the students performance in his written works is poor and its motion is slightly going downward while his performance in performance task is very poor and needs a direct attention.",
        };
      default:
        return {
          value: 0,
          linguistics: `the students written works is very poor because its trend is in an upward motion while his performance in performance task is ${student.quarter[i].performace_tasks_analysis.trends}`,
        };
    }
  } else if (student.quarter[i].written_tasks_analysis.trends === "downward") {
    switch (performance_results) {
      case 5:
        return {
          value: 5,
          linguistics:
            "the students performance in his written works is very poor and need a direct attention while his performance in performance task is very good bacause it is going in an upward motion.",
        };
        break;
      case 4:
        return {
          value: 4,
          linguistics:
            "the students performance in his written works is very poor and need a direct attention while his performance in performance task is good bacause the trend is slightly going upward.",
        };
        break;
      case 3:
        return {
          value: 3,
          linguistics:
            "the students performance in his written works is very poor and need a direct attention while his performance in performance task si completely consistent.",
        };
        break;
      case 2:
        return {
          value: 2,
          linguistics:
            "the students performance in his written works is very poor and need a direct attention while his performance in performance task ]is slightly going downward.",
        };
        break;
      case 1:
        return {
          value: 1,
          linguistics:
            "the students need both direct attention on his performance task and written works because the trend of his performance is going downward.",
        };
      default:
        return {
          value: 0,
          linguistics: `the students written works is very good because its trend is in an upward motion while his performance in performance task is ${student.quarter[i].performace_tasks_analysis.trends}`,
        };
    }
  } else {
    switch (performance_results) {
      case 5:
        return {
          value: 5,
          linguistics: `the students performance in his written works is ${student.quarter[i].performace_tasks_analysis.trends} while his performance in performance task is very good bacause it is going in an upward motion.`,
        };
        break;
      case 4:
        return {
          value: 4,
          linguistics: `the students performance in his written works is ${student.quarter[i].performace_tasks_analysis.trends} while his performance in performance task is good bacause the trend is slightly going upward.`,
        };
        break;
      case 3:
        return {
          value: 3,
          linguistics: `the students performance in his written works is ${student.quarter[i].performace_tasks_analysis.trends} while his performance in performance task si completely consistent.`,
        };
        break;
      case 2:
        return {
          value: 2,
          linguistics: `the students performance in his written works is ${student.quarter[i].performace_tasks_analysis.trends} while his performance in performance task is slightly going downward.`,
        };
        break;
      case 1:
        return {
          value: 1,
          linguistics: `the students performance in his written works is ${student.quarter[i].performace_tasks_analysis.trends} while his performance in performance task is slightly going downward.`,
        };
      default:
        return {
          value: 0,
          linguistics: `the students performance in his written works is ${student.quarter[i].performace_tasks_analysis.trends} while his performance in performance task is ${student.quarter[i].performace_tasks_analysis.trends}.`,
        };
    }
  }
};

// if (trend == 0) {
//     return "consistent linear";
//   } else if (trend > 0 && trend <= 2) {
//     return "slightly upward";
//   } else if (trend < 0 && trend >= -2) {
//     return "slightly downward";
//   } else if (trend > 3) {
//     return "upward";
//   } else {
//     return "downward";
//   }
