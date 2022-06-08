import { Student, TaskData } from "../../types/Students";
import { getPronoun } from "./feedback";
import { formatArray, getRemarks } from "./formatting";

export const performanceAnalysis = (
  student: Student,
  i: number,
  surpassed: any,
  average: any
) => {
  const getPassFail = (studentTask: TaskData[]) => {
    let pass = 0;
    let fails = 0;
    let perfect = 0;
    let considerable = 0;
    let no_data = 0;

    studentTask.map((task, i) => {
      if (task.score >= task.passing_score) {
        pass++;
        if (task.status === "Perfect") {
          perfect++;
        }
      } else {
        fails++;
        if (task.status === "Considerable") {
          considerable++;
        } else if (task.status === "??") {
          no_data++;
        }
      }
    });

    return {
      pass: pass,
      fails: fails,
      perfect: perfect,
      considerable: considerable,
      no_data: no_data,
    };
  };

  const taskSummary = (taskSummary: any, type: string) => {
    let taskString = [];
    if (taskSummary.pass > taskSummary.fails) {
      //most of his task passed
      taskString.push(`Most of ${gender.hisHer} ${type} passed`);
      if (taskSummary.perfect > 0) {
        taskString.push(` where ${taskSummary.perfect} of it is perfect and`);
      } else {
        taskString.push(" where none of it is perfect and");
      }

      taskString.push(`${taskSummary.fails} of it failed where`);
      if (taskSummary.considerable > 0) {
        taskString.push(
          `${taskSummary.considerable} of it is considerable and `
        );
      } else {
        taskString.push("none of it is considerable and");
      }
      if (taskSummary.no_data > 0) {
        taskString.push(`${taskSummary.no_data} of it had no data.`);
      } else {
        taskString.push(`${gender.heShe} was present in all the task.`);
      }
    } else if (taskSummary.pass < taskSummary.fails) {
      //most of his task fails
      taskString.push(`Most of ${gender.hisHer} ${type} failed where`);
      if (taskSummary.considerable > 0) {
        taskString.push(`${taskSummary.considerable} of it is considerable, `);
      } else {
        taskString.push("none of it is considerable,");
      }
      if (taskSummary.no_data > 0) {
        taskString.push(`${taskSummary.no_data} of it had no data and`);
      } else {
        taskString.push(`${gender.heShe} was present in all the task and`);
      }

      taskString.push(`${taskSummary.fails} of it passed`);
      if (taskSummary.perfect > 0) {
        taskString.push(` where ${taskSummary.perfect} of it is perfect.`);
      } else {
        taskString.push("where none of it is perfect.");
      }
    } else {
      taskString.push(`Half of ${gender.hisHer} ${type} passed`);
      if (taskSummary.perfect > 0) {
        taskString.push(` where ${taskSummary.perfect} of it is perfect and`);
      } else {
        taskString.push("where none of it is perfect and");
      }

      taskString.push(`half of it failed where`);
      if (taskSummary.considerable > 0) {
        taskString.push(
          `${taskSummary.considerable} of it is considerable and`
        );
      } else {
        taskString.push("none of it is considerable and");
      }
      if (taskSummary.no_data > 0) {
        taskString.push(`${taskSummary.no_data} of it had no data.`);
      } else {
        taskString.push(`${gender.heShe} was present in all the task.`);
      }
    }

    return taskString.join(" ");
  };

  let quarter: string[] = [];

  let remarks = getRemarks(student.quarter[i].grade_before).toLowerCase();

  let task = lineGraphAssessment(student, i);

  let gender = getPronoun(student.gender);

  let wwtaskSummary = getPassFail(student.quarter[i].written_works);

  let pttaskSummary = getPassFail(student.quarter[i].performance_tasks);

  if (remarks === `very poor`) {
    if (task.value < 3) {
      quarter.push(
        `The students requires attention because ${gender.hisHer} grade is very poor and ` +
          task.linguistics
      );
    } else {
      quarter.push(
        `Althought Students grade is very poor, ` + task.linguistics
      );
    }
  } else if (remarks === `poor`) {
    if (task.value < 3) {
      quarter.push(
        `The students grade this quarter is poor and ` + task.linguistics
      );
    } else {
      quarter.push(`Althought Students grade is poor, ` + task.linguistics);
    }
  } else if (remarks === `average`) {
    if (task.value < 3 || task.value > 3) {
      quarter.push(
        `The students grade this quarter is average and ` + task.linguistics
      );
    } else {
      quarter.push(
        `The students grade this quarter is average and ` + task.linguistics
      );
    }
  } else if (remarks === `good`) {
    if (task.value < 3) {
      quarter.push(`Althought Students grade is good, ` + task.linguistics);
    } else {
      quarter.push(
        `The students grade this quarter is good but ` + task.linguistics
      );
    }
  } else {
    if (task.value < 3) {
      quarter.push(
        `Althought Students grade is very good, ` + task.linguistics
      );
    } else {
      quarter.push(
        `The students grade this quarter is good and ` + task.linguistics
      );
    }
  }

  if (
    student?.quarter[i].written_tasks_analysis.plunge_task.length > 0 &&
    student?.quarter[i].written_tasks_analysis.surge_task.length > 0
  ) {
    quarter.push(
      `${
        student?.gender == "MALE" ? "His" : "Her"
      } score in written works suddenly plunged in ${
        student?.quarter[i].written_tasks_analysis.plunge_task.length > 0
          ? "tasks"
          : "task"
      } ${formatArray(
        student?.quarter[i].written_tasks_analysis.plunge_task
      )} while it surged  in ${
        student?.quarter[i].written_tasks_analysis.surge_task.length > 0
          ? "tasks"
          : "task"
      }  ${formatArray(student?.quarter[i].written_tasks_analysis.surge_task)}.`
    );
  } else if (
    student?.quarter[i].written_tasks_analysis.plunge_task.length > 0 &&
    student?.quarter[i].written_tasks_analysis.surge_task.length == 0
  ) {
    quarter.push(
      `${
        student?.gender == "MALE" ? "His" : "Her"
      } score in written works suddenly plunged in ${
        student?.quarter[i].written_tasks_analysis.plunge_task.length > 1
          ? "tasks"
          : "task"
      } ${formatArray(student?.quarter[i].written_tasks_analysis.plunge_task)}.`
    );
  }
  if (
    student?.quarter[i].written_tasks_analysis.plunge_task.length == 0 &&
    student?.quarter[i].written_tasks_analysis.surge_task.length > 0
  ) {
    quarter.push(
      `${
        student?.gender == "MALE" ? "His" : "Her"
      } score in written works suddenly surged  in ${
        student?.quarter[i].written_tasks_analysis.surge_task.length > 1
          ? "tasks"
          : "task"
      }  ${formatArray(student?.quarter[i].written_tasks_analysis.surge_task)}.`
    );
  }

  if (
    student?.quarter[i].performace_tasks_analysis.plunge_task.length > 0 &&
    student?.quarter[i].performace_tasks_analysis.surge_task.length > 0
  ) {
    quarter.push(
      `${
        student?.gender == "MALE" ? "His" : "Her"
      } score in performance task suddenly plunged in ${
        student?.quarter[i].performace_tasks_analysis.plunge_task.length > 0
          ? "tasks"
          : "task"
      } ${formatArray(
        student?.quarter[i].performace_tasks_analysis.plunge_task
      )} while it surged  in ${
        student?.quarter[i].performace_tasks_analysis.surge_task.length > 0
          ? "tasks"
          : "task"
      }  ${formatArray(
        student?.quarter[i].performace_tasks_analysis.surge_task
      )}.`
    );
  } else if (
    student?.quarter[i].performace_tasks_analysis.plunge_task.length > 0 &&
    student?.quarter[i].written_tasks_analysis.surge_task.length == 0
  ) {
    quarter.push(
      `${
        student?.gender == "MALE" ? "His" : "Her"
      } score in performance task suddenly plunged in ${
        student?.quarter[i].performace_tasks_analysis.plunge_task.length > 1
          ? "tasks"
          : "task"
      } ${formatArray(
        student?.quarter[i].performace_tasks_analysis.plunge_task
      )}.`
    );
  }
  if (
    student?.quarter[i].performace_tasks_analysis.plunge_task.length == 0 &&
    student?.quarter[i].performace_tasks_analysis.surge_task.length > 0
  ) {
    quarter.push(
      `${
        student?.gender == "MALE" ? "His" : "Her"
      } score in performance task suddenly surged  in ${
        student?.quarter[i].performace_tasks_analysis.surge_task.length > 1
          ? "tasks"
          : "task"
      }  ${formatArray(
        student?.quarter[i].performace_tasks_analysis.surge_task
      )}.`
    );
  }

  let writtenSummary = taskSummary(wwtaskSummary, "written works");
  let performanceSummary = taskSummary(pttaskSummary, "performance task");

  quarter.push(writtenSummary);
  quarter.push(performanceSummary);

  quarter.push(
    `${
      gender.heShe.charAt(0).toUpperCase() + gender.heShe.slice(1)
    } surpassed ${surpassed.ww} out of ${
      surpassed.len
    } in written works having an average of ${average.ww}% and surpassed ${
      surpassed.pt
    } out of ${surpassed.len} in performance task having an average of ${
      average.pt
    }%.`
  );
  return quarter.join(` `);
};

export const lineGraphAssessment = (student: Student, i: number) => {
  // ligens lang malaakakan
  //downward = 1
  //slightly down = 2
  //consistent linear = 3
  //slightly upward = 4
  //upward = 5

  const performanceAssessment = () => {
    if (student.quarter[i].performace_tasks_analysis.trends === `upward`) {
      return 5;
    } else if (
      student.quarter[i].performace_tasks_analysis.trends === `slightly upward`
    ) {
      return 4;
    } else if (
      student.quarter[i].performace_tasks_analysis.trends ===
      `consistent linear`
    ) {
      return 3;
    } else if (
      student.quarter[i].performace_tasks_analysis.trends ===
      `slightly downward`
    ) {
      return 2;
    } else if (
      student.quarter[i].performace_tasks_analysis.trends === `downward`
    ) {
      return 1;
    } else {
      return 0;
    }
  };

  let gender = getPronoun(student.gender);

  let performance_results = performanceAssessment();

  if (student.quarter[i].written_tasks_analysis.trends === `upward`) {
    switch (performance_results) {
      case 5:
        return {
          value: 5,
          linguistics: `the students performance in both written works and performance task is very good because both is going in an upward motion.`,
        };
        break;
      case 4:
        return {
          value: 4,
          linguistics: `the students performance in ${gender.hisHer} written works is very good because the trend is in an upward motion and ${gender.hisHer} performance in performance task is slighlty going upward.`,
        };
        break;
      case 3:
        return {
          value: 3,
          linguistics: `the students performance in ${gender.hisHer} written works is very good because the trend is in an upward motion but ${gender.hisHer} perforamance in ${gender.hisHer} performance task is just consistently linear.`,
        };
        break;
      case 2:
        return {
          value: 2,
          linguistics: `the students perfromance in ${gender.hisHer} written works is very good because the trend is in an upward motion while ${gender.hisHer} performance in performance task is slightly going downward.`,
        };
        break;
      case 1:
        return {
          value: 1,
          linguistics: `the students written works is very good because its trend is in an upward motion while ${gender.hisHer} performance in performance task is going on the opposite direction and requires direct attention.`,
        };
        break;
      default:
        return {
          value: 0,
          linguistics: `the students written works is very good because its trend is in an upward motion while ${gender.hisHer} performance in performance task is ${student.quarter[i].performace_tasks_analysis.trends}`,
        };
    }
  } else if (
    student.quarter[i].written_tasks_analysis.trends === `slightly upward`
  ) {
    switch (performance_results) {
      case 5:
        return {
          value: 5,
          linguistics: `the students performance in ${gender.hisHer} written works is good because the trend is slightly going in an upward motion and ${gender.hisHer} performance in performance task is very bacause it is going in an upward motion.`,
        };
        break;
      case 4:
        return {
          value: 4,
          linguistics: `the students performance in both written works and perforamance task is good bacause it is both slightly doing in an upward motion.`,
        };
        break;
      case 3:
        return {
          value: 3,
          linguistics: `the students performance in ${gender.hisHer} written works is good because the trend is slightly going in an upward motion but ${gender.hisHer} perforamance in ${gender.hisHer} performance task is just consistently linear.`,
        };
        break;
      case 2:
        return {
          value: 2,
          linguistics: `the students performance in ${gender.hisHer} written works is good because the trend is slightly going in an upward motion while ${gender.hisHer} performance in performance task is slightly going downward.`,
        };
        break;
      case 1:
        return {
          value: 1,
          linguistics: `the students performance in ${gender.hisHer} written works is good because the trend is slightly going in an upward motion while ${gender.hisHer} performance in performance task is going on the opposite direction and requires direct attention.`,
        };
      default:
        return {
          value: 0,
          linguistics: `the students written works is good because its trend is in an upward motion while ${gender.hisHer} performance in performance task is ${student.quarter[i].performace_tasks_analysis.trends}`,
        };
    }
  } else if (
    student.quarter[i].written_tasks_analysis.trends === `consistent linear`
  ) {
    switch (performance_results) {
      case 5:
        return {
          value: 5,
          linguistics: `the students performance in ${gender.hisHer} written works is average because the trend is consistent and ${gender.hisHer} performance in performance task is very good bacause it is going in an upward motion.`,
        };
        break;
      case 4:
        return {
          value: 4,
          linguistics: `the students performance in ${gender.hisHer} written works is average because the trend is consistent and ${gender.hisHer} performance in performance task is good bacause the trend is slightly going upward.`,
        };
        break;
      case 3:
        return {
          value: 3,
          linguistics: `the students performance in both written works and performance task all through out the quarter is consistent.`,
        };
        break;
      case 2:
        return {
          value: 2,
          linguistics: `the students performance in ${gender.hisHer} written works is average because the trend is consistent while ${gender.hisHer} performance task is slightly going in a downward motion.`,
        };
        break;
      case 1:
        return {
          value: 1,
          linguistics: `the students performance in ${gender.hisHer} written works is average because the trend is consistent while ${gender.hisHer} performance in performance task is very poor that requires a direct attention.`,
        };
        break;
      default:
        return {
          value: 0,
          linguistics: `the students written works is average because its trend is in an upward motion while ${gender.hisHer} performance in performance task is ${student.quarter[i].performace_tasks_analysis.trends}`,
        };
    }
  } else if (
    student.quarter[i].written_tasks_analysis.trends === `slightly downward`
  ) {
    switch (performance_results) {
      case 5:
        return {
          value: 5,
          linguistics: `the students performance in ${gender.hisHer} written works is poor and its motion is slightly going downward and ${gender.hisHer} performance in performance task is very good bacause it is going in an upward motion.`,
        };
        break;
      case 4:
        return {
          value: 4,
          linguistics: `the students performance in ${gender.hisHer} written works is poor and its motion is slightly going downward and ${gender.hisHer} performance in performance task is good bacause the trend is slightly going upward.`,
        };
        break;
      case 3:
        return {
          value: 3,
          linguistics: `the students performance in ${gender.hisHer} written works is poor and its motion is slightly going downward and ${gender.hisHer} performance in performance task si completely consistent.`,
        };
        break;
      case 2:
        return {
          value: 2,
          linguistics: `both of ${gender.hisHer} performance in written works and performance task is poor and is both slightly going on a downward motion.`,
        };
        break;
      case 1:
        return {
          value: 1,
          linguistics: `the students performance in ${gender.hisHer} written works is poor and its motion is slightly going downward while ${gender.hisHer} performance in performance task is very poor that requiress a direct attention.`,
        };
      default:
        return {
          value: 0,
          linguistics: `the students written works is very poor because its trend is in an upward motion while ${gender.hisHer} performance in performance task is ${student.quarter[i].performace_tasks_analysis.trends}`,
        };
    }
  } else if (student.quarter[i].written_tasks_analysis.trends === `downward`) {
    switch (performance_results) {
      case 5:
        return {
          value: 5,
          linguistics: `the students performance in ${gender.hisHer} written works is very poor that requires a direct attention while ${gender.hisHer} performance in performance task is very good bacause it is going in an upward motion.`,
        };
        break;
      case 4:
        return {
          value: 4,
          linguistics: `the students performance in ${gender.hisHer} written works is very poor that requires a direct attention while ${gender.hisHer} performance in performance task is good bacause the trend is slightly going upward.`,
        };
        break;
      case 3:
        return {
          value: 3,
          linguistics: `the students performance in ${gender.hisHer} written works is very poor that requires a direct attention while ${gender.hisHer} performance in performance task si completely consistent.`,
        };
        break;
      case 2:
        return {
          value: 2,
          linguistics: `the students performance in ${gender.hisHer} written works is very poor that requires a direct attention while ${gender.hisHer} performance in performance task is slightly going downward.`,
        };
        break;
      case 1:
        return {
          value: 1,
          linguistics: `the students need both direct attention on ${gender.hisHer} performance task and written works because the trend of ${gender.hisHer} performance is going downward.`,
        };
      default:
        return {
          value: 0,
          linguistics: `the students written works is very good because its trend is in an upward motion while ${gender.hisHer} performance in performance task is ${student.quarter[i].performace_tasks_analysis.trends}`,
        };
    }
  } else {
    switch (performance_results) {
      case 5:
        return {
          value: 5,
          linguistics: `the students performance in ${gender.hisHer} written works is ${student.quarter[i].performace_tasks_analysis.trends} while ${gender.hisHer} performance in performance task is very good bacause it is going in an upward motion.`,
        };
        break;
      case 4:
        return {
          value: 4,
          linguistics: `the students performance in ${gender.hisHer} written works is ${student.quarter[i].performace_tasks_analysis.trends} while ${gender.hisHer} performance in performance task is good bacause the trend is slightly going upward.`,
        };
        break;
      case 3:
        return {
          value: 3,
          linguistics: `the students performance in ${gender.hisHer} written works is ${student.quarter[i].performace_tasks_analysis.trends} while ${gender.hisHer} performance in performance task si completely consistent.`,
        };
        break;
      case 2:
        return {
          value: 2,
          linguistics: `the students performance in ${gender.hisHer} written works is ${student.quarter[i].performace_tasks_analysis.trends} while ${gender.hisHer} performance in performance task is slightly going downward.`,
        };
        break;
      case 1:
        return {
          value: 1,
          linguistics: `the students performance in ${gender.hisHer} written works is ${student.quarter[i].performace_tasks_analysis.trends} while ${gender.hisHer} performance in performance task is slightly going downward.`,
        };
      default:
        return {
          value: 0,
          linguistics: `the students performance in ${gender.hisHer} written works is ${student.quarter[i].performace_tasks_analysis.trends} while ${gender.hisHer} performance in performance task is ${student.quarter[i].performace_tasks_analysis.trends}.`,
        };
    }
  }
};

export const barGraphhAssessment = (student: Student, len: number) => {
  if (student.quarter_analysis.trends === "upward") {
    if (len >= 4) {
      return {
        value: 5,
        linguistic:
          "the students performance is very good and deserves a recognition.",
      };
    } else {
      return {
        value: 5,
        linguistic:
          "the students performance is very good and deserves a recognition.",
      };
    }
  } else if (student.quarter_analysis.trends === "slightly upward") {
    if (len >= 4) {
      return {
        value: 4,
        linguistic:
          "the students performance is slightly good and deserves a recognition",
      };
    } else {
      return {
        value: 4,
        linguistic:
          "the students performance is slithly good and deserves a recognition.",
      };
    }
  } else if (student.quarter_analysis.trends === "consistently linear") {
    if (len >= 4) {
      return {
        value: 3,
        linguistic:
          "the students performance is consistently linear to all quarters.",
      };
    } else {
      return {
        value: 3,
        linguistic:
          "the students performance is consistently linear to all quarters.",
      };
    }
  } else if (student.quarter_analysis.trends === "slightly downward") {
    if (len >= 4) {
      return {
        value: 2,
        linguistic: "the students performance is slightly going downward",
      };
    } else {
      return {
        value: 2,
        linguistic: "the students performance is slightly goind downward",
      };
    }
  } else if (student.quarter_analysis.trends === "downward") {
    if (len >= 4) {
      return {
        value: 1,
        linguistic:
          "the students performance is very poor all throughout the school year.",
      };
    } else {
      return {
        value: 1,
        linguistic:
          "the students performance is very poor and requires direct attention for the next incoming quarter.",
      };
    }
  } else {
    if (student.quarter_analysis.trends === "Very Poor") {
      return {
        value: 1,
        linguistic:
          "the students performance is very poor and requires direct attention for the next quarter.",
      };
    } else if (student.quarter_analysis.trends === "Poor") {
      return {
        value: 2,
        linguistic:
          "the students performance is poor and might need some attention for the next incoming quarter.",
      };
    } else if (student.quarter_analysis.trends === "Average") {
      return {
        value: 3,
        linguistic: "the students perfomarnce is average.",
      };
    } else if (student.quarter_analysis.trends === "Good") {
      return {
        value: 4,
        linguistic: "the students performance is good.",
      };
    } else {
      return {
        value: 5,
        linguistic: "the students perfroamamce os very good.",
      };
    }
  }
};
