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
      quarter.push(`Although Students grade is very poor, ` + task.linguistics);
    }
  } else if (remarks === `poor`) {
    if (task.value < 3) {
      quarter.push(
        `The students grade this quarter is poor and ` + task.linguistics
      );
    } else {
      quarter.push(`Although Students grade is poor, ` + task.linguistics);
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
      quarter.push(`Although Students grade is good, ` + task.linguistics);
    } else {
      quarter.push(
        `The students grade this quarter is good but ` + task.linguistics
      );
    }
  } else {
    if (task.value < 3) {
      quarter.push(`Although Students grade is very good, ` + task.linguistics);
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
        linguistic: "the students performance is very good.",
      };
    }
  }
};

export const getEnvironmenetalAssessment = (
  student: Student,
  average: number
) => {
  let gender = getPronoun(student.gender);
  let values: any = Object.values(student.survey_result.environment_factors);
  let properties: any = Object.keys(student.survey_result.environment_factors);

  let envGroup: string[] = [];
  let envProps: string[] = [];

  let group_values: any = [];

  const reformat = (props: string) => {
    let property = "";
    if (props.includes("_")) {
      property = props.replace("_", " ");

      return property;
    } else {
      return props;
    }
  };

  group_values["Greatly Affecting"] = [];
  group_values["Affecting"] = [];
  group_values["Quite Affecting"] = [];
  group_values["Unaffecting at all"] = [];
  for (let i = 0; i < values.length - 1; i++) {
    envGroup.push(values[i]);
    envProps.push(properties[i]);
  }

  envGroup.map((value, index) => {
    group_values[value].push(reformat(properties[index]));
  });

  var assessment: string[] = [];

  assessment.push(
    `The students environmental factor is ${student.inference_result.environment.linguistic}.`
  );

  if (group_values["Greatly Affecting"].length > 0) {
    if (average < 82) {
      assessment.push(
        `Factors like ${formatArray(
          group_values["Greatly Affecting"]
        )} is severly affecting ${
          gender.hisHer
        } performance that may be the reason why ${
          gender.hisHer
        } performance is poor.`
      );
    } else if (average >= 82 && average <= 89) {
      assessment.push(
        `Although factors like ${formatArray(
          group_values["Greatly Affecting"]
        )} severly affects ${
          gender.hisHer
        } performance, he can still keep up in ${gender.hisHer} studies.`
      );
    } else {
      assessment.push(
        `Although factors like ${formatArray(
          group_values["Greatly Affecting"]
        )} severly affects ${
          gender.hisHer
        } performance, he still performs very well in ${gender.hisHer} class.`
      );
    }
  } else {
    assessment.push(
      "There are no factors the greatly affects his performance."
    );
  }
  if (group_values["Affecting"].length > 0) {
    if (group_values["Greatly Affecting"] == 0) {
      if (average < 82) {
        assessment.push(
          `Factors like ${formatArray(
            group_values["Affecting"]
          )} is affecting ${
            gender.hisHer
          } performance that may be the reason why ${
            gender.hisHer
          } performance is poor.`
        );
      } else if (average >= 82 && average <= 89) {
        assessment.push(
          `Although factors like ${formatArray(
            group_values["Affecting"]
          )} affects ${gender.hisHer} performance, he can still keep up in ${
            gender.hisHer
          } studies`
        );
      } else {
        assessment.push(
          `Although factors like ${formatArray(
            group_values["Affecting"]
          )} affects ${
            gender.hisHer
          } performance, he still performs very well in ${gender.hisHer} class`
        );
      }
    } else {
      assessment.push(
        `Factors like ${formatArray(group_values["Affecting"])} also affects ${
          gender.hisHer
        } performance.`
      );
    }
  }
  if (group_values["Quite Affecting"].length > 0) {
    if (
      group_values["Greatly Affecting"].length > 0 ||
      group_values["Affecting"].length > 0
    ) {
      assessment.push(
        `Also factors like ${formatArray(
          group_values["Quite Affecting"]
        )} quitly affects ${
          gender.hisHer
        } performance but isn't that really affecting.`
      );
    } else {
      assessment.push(
        `Factors like ${formatArray(
          group_values["Quite Affecting"]
        )} quitly affects ${
          gender.hisHer
        } performance but isn't that really affecting.`
      );
    }
  }
  if (group_values["Unaffecting at all"].length > 0) {
    if (
      group_values["Greatly Affecting"].length > 0 ||
      group_values["Affecting"].length > 0 ||
      group_values["Quite Affecting"].length > 0
    ) {
      assessment.push(
        `However factors like ${formatArray(
          group_values["Unaffecting at all"]
        )} doesn't really affects ${gender.hisHer} performance.`
      );
    } else {
      assessment.push(
        `However factors like ${formatArray(
          group_values["Unaffecting at all"]
        )} doesn't really affects ${gender.hisHer} performance.`
      );
    }
  }

  return assessment.join(" ");
};

export const getTechnologicalAssesment = (
  student: Student,
  average: number
) => {
  let gender = getPronoun(student.gender);
  let technologicalAssessment: string[] = [];

  const wifiAssessment = () => {
    if (student.survey_result.wifi.linguistic === "Good") {
      return 3;
    } else if (student.survey_result.wifi.linguistic === "Bad") {
      return 2;
    } else if (student.survey_result.wifi.linguistic === "No Wifi Connection") {
      return 1;
    }
  };

  let wifi = wifiAssessment();

  if (student.survey_result.data.linguistic === "Good") {
    switch (wifi) {
      case 1:
        technologicalAssessment.push(
          `The students data and wifi connection are both fast and reliable resulting that ${
            gender.hisHer
          } internet is ${student.inference_result.internet.linguistic.toLowerCase()}.`
        );
        break;
      case 2:
        technologicalAssessment.push(
          `Although the students have a fast and reliable data, ${
            gender.hisHer
          } wifi connection is slow resulting that ${
            gender.hisHer
          } internet is ${student.inference_result.internet.linguistic.toLowerCase()}.`
        );
        break;
      default:
        technologicalAssessment.push(
          `The student doesn't have any available wifi connection however the students have a fast and reliable data connection resulting that ${
            gender.hisHer
          } internet is ${student.inference_result.internet.linguistic.toLowerCase()}.`
        );
    }
  } else if (student.survey_result.data.linguistic === "Bad") {
    switch (wifi) {
      case 1:
        technologicalAssessment.push(
          `Although the students data is bad, ${
            gender.hisHer
          } wifi connection is fast and reliable resulting that ${
            gender.hisHer
          } internet is ${student.inference_result.internet.linguistic.toLowerCase()}.`
        );
        break;
      case 2:
        technologicalAssessment.push(
          `The student both have bad wifi and data resulting that ${
            gender.hisHer
          } internet is ${student.inference_result.internet.linguistic.toLowerCase()}.`
        );
        break;
      default:
        technologicalAssessment.push(
          `The student doesn't have an available wifi connection and the data connection is bad resulting that ${
            gender.hisHer
          } internet is ${student.inference_result.internet.linguistic.toLowerCase()}.`
        );
    }
  } else {
    switch (wifi) {
      case 1:
        technologicalAssessment.push(
          `Although the student doesn't have any data connection, he has a fast and reliable wifi resulting that ${
            gender.hisHer
          } internet is ${student.inference_result.internet.linguistic.toLowerCase()}.`
        );
        break;
      case 2:
        technologicalAssessment.push(
          `Although the student doesn't have data connection, he has a slow wifi connection resulting that ${
            gender.hisHer
          } internet is ${student.inference_result.internet.linguistic.toLowerCase()}.`
        );
        break;
      default:
        technologicalAssessment.push(
          `The student doesn't have any internet connection resulting that ${
            gender.hisHer
          } internet is ${student.inference_result.internet.linguistic.toLowerCase()}.`
        );
    }
  }

  const accessibilty = () => {
    if (student.inference_result.accessibility.linguistic === "Very Good") {
      return 5;
    } else if (student.inference_result.accessibility.linguistic === "Good") {
      return 4;
    } else if (
      student.inference_result.accessibility.linguistic === "Average"
    ) {
      return 3;
    } else if (student.inference_result.accessibility.linguistic === "Poor") {
      return 2;
    } else {
      return 1;
    }
  };

  if (student.survey_result.device.linguistic === "No Device") {
    technologicalAssessment.push(
      `${
        gender.heShe.charAt(0).toUpperCase() + gender.heShe.slice(1)
      } doesn't have any device that may also affects ${
        gender.hisHer
      } performance in ${gender.hisHer} studies.`
    );
  } else if (student.survey_result.device.linguistic === "Renting Device") {
    technologicalAssessment.push(
      `${
        gender.heShe.charAt(0).toUpperCase() + gender.heShe.slice(1)
      } rents a device that may also affect gis perforamance in ${
        gender.hisHer
      } studies.`
    );
  } else if (student.survey_result.device.linguistic === "Sharing Device") {
    technologicalAssessment.push(
      `${
        gender.heShe.charAt(0).toUpperCase() + gender.heShe.slice(1)
      } is sharing a device with ${
        gender.hisHer
      } siblings, pertaining that they have a schedule in using the device.`
    );
  } else if (student.survey_result.device.linguistic === "Borrowing a Device") {
    technologicalAssessment.push(
      `${
        gender.heShe.charAt(0).toUpperCase() + gender.heShe.slice(1)
      } is Borrowing a devie to ${
        gender.hisHer
      } parent, pertaining that they have a schedule in using the device.`
    );
  } else if (student.survey_result.device.linguistic === "Mobile/Table only") {
    technologicalAssessment.push(
      `${
        gender.heShe.charAt(0).toUpperCase() + gender.heShe.slice(1)
      } have a Mobile/Tablet to use in ${gender.hisHer} studies.`
    );
  } else if (
    student.survey_result.device.linguistic === "Laptop/Computer only."
  ) {
    technologicalAssessment.push(
      `${
        gender.heShe.charAt(0).toUpperCase() + gender.heShe.slice(1)
      } have a Laptop/Computer to use int ${gender.hisHer} Studies.`
    );
  } else {
    technologicalAssessment.push(
      `${
        gender.heShe.charAt(0).toUpperCase() + gender.heShe.slice(1)
      } both have a Mobile/Tablet and Laptop/Computer to use in ${
        gender.hisHer
      } studies.`
    );
  }

  let access = accessibilty();

  if (student.inference_result.resource.linguistic === "Very Good") {
    switch (access) {
      case 5:
        technologicalAssessment.push(
          `${
            gender.hisHer.charAt(0).toUpperCase() + gender.hisHer.slice(1)
          } resources, accessibility and knowledge to technology that is both very good.`
        );
        break;
      case 4:
        technologicalAssessment.push(
          `${
            gender.hisHer.charAt(0).toUpperCase() + gender.hisHer.slice(1)
          } resources that is very good while ${
            gender.hisHer
          } accessibility and knowledge to technology is good.`
        );
        break;
      case 3:
        technologicalAssessment.push(
          `${
            gender.hisHer.charAt(0).toUpperCase() + gender.hisHer.slice(1)
          } resources is very good while ${
            gender.hisHer
          } accessibility and knowledge to technology is average.`
        );
        break;
      case 2:
        technologicalAssessment.push(
          `Although ${gender.hisHer} resouces is very good, ${gender.hisHer} accessiblity and knowledge to technology is poor.`
        );
        break;
      default:
        technologicalAssessment.push(
          `Although ${gender.hisHer} resources is very good, ${gender.hisHer} accessiblity and knowldge to technology is very poor.`
        );
    }
  } else if (student.inference_result.resource.linguistic === "Good") {
    switch (access) {
      case 5:
        technologicalAssessment.push(
          `${
            gender.hisHer.charAt(0).toUpperCase() + gender.hisHer.slice(1)
          } resources very good while ${
            gender.hisHer
          } accessibility and knowledge to technology is very good.`
        );
        break;
      case 4:
        technologicalAssessment.push(
          `${
            gender.hisHer.charAt(0).toUpperCase() + gender.hisHer.slice(1)
          } resources, accessibility and knowledge to technology that is both good.`
        );
        break;
      case 3:
        technologicalAssessment.push(
          `${
            gender.hisHer.charAt(0).toUpperCase() + gender.hisHer.slice(1)
          } resources is good while ${
            gender.hisHer
          } accessibility and knowledge to technology is average.`
        );
        break;
      case 2:
        technologicalAssessment.push(
          `Although ${gender.hisHer} resouces is good, ${gender.hisHer} accessiblity and knowledge to technology is poor.`
        );
        break;
      default:
        technologicalAssessment.push(
          `Although ${gender.hisHer} resources is good, ${gender.hisHer} accessiblity and knowldge to technology is very poor.`
        );
    }
  } else if (student.inference_result.resource.linguistic === "Average") {
    switch (access) {
      case 5:
        technologicalAssessment.push(
          `${
            gender.hisHer.charAt(0).toUpperCase() + gender.hisHer.slice(1)
          } resources is average while ${
            gender.hisHer
          } accessibility and knowledge to technology is very good.`
        );
        break;
      case 4:
        technologicalAssessment.push(
          `${
            gender.hisHer.charAt(0).toUpperCase() + gender.hisHer.slice(1)
          } resources is average while ${
            gender.hisHer
          } accessibility and knowledge to technology is good.`
        );
        break;
      case 3:
        technologicalAssessment.push(
          `${
            gender.hisHer.charAt(0).toUpperCase() + gender.hisHer.slice(1)
          } resources, accessiblity and knowledge to technology is both average.`
        );
        break;
      case 2:
        technologicalAssessment.push(
          `Although ${gender.hisHer} resouces is average, ${gender.hisHer} accessiblity and knowledge to technology is poor.`
        );
        break;
      default:
        technologicalAssessment.push(
          `Although ${gender.hisHer} resources is average, ${gender.hisHer} accessiblity and knowldge to technology is very poor.`
        );
    }
  } else if (student.inference_result.resource.linguistic === "Poor") {
    switch (access) {
      case 5:
        technologicalAssessment.push(
          `Although ${gender.hisHer} resources is poor, ${gender.hisHer} accessibility and knowledge to technology is very good.`
        );
        break;
      case 4:
        technologicalAssessment.push(
          `Although ${gender.hisHer} resources is poor, ${gender.hisHer} accessibility and knowledge to technology is good.`
        );
        break;
      case 3:
        technologicalAssessment.push(
          `Although ${gender.hisHer} resources is poor, ${gender.hisHer} accessiblity and knowledge to technology is average.`
        );
        break;
      case 2:
        technologicalAssessment.push(
          `Both of ${gender.hisHer} resources, accessibility and knowledge to technology is poor.`
        );
        break;
      default:
        technologicalAssessment.push(
          `${
            gender.hisHer.charAt(0).toUpperCase() + gender.hisHer.slice(1)
          } resources is poor. Accessibility and knowledge to technology is very poor.`
        );
    }
  } else {
    switch (access) {
      case 5:
        technologicalAssessment.push(
          `Although ${gender.hisHer} resources is very poor, ${gender.hisHer} accessibility and knowledge to technology is very good.`
        );
        break;
      case 4:
        technologicalAssessment.push(
          `Although ${gender.hisHer} resources is very poor, ${gender.hisHer} accessibility and knowledge to technology is good.`
        );
        break;
      case 3:
        technologicalAssessment.push(
          `Although ${gender.hisHer} resources is very poor, ${gender.hisHer} accessiblity and knowledge to technology is average.`
        );
        break;
      case 2:
        technologicalAssessment.push(
          `${
            gender.hisHer.charAt(0).toUpperCase() + gender.hisHer.slice(1)
          } resources is very poor. Accessibility and knowledge to technology is very poor.`
        );
        break;
      default:
        technologicalAssessment.push(
          `${
            gender.hisHer.charAt(0).toUpperCase() + gender.hisHer.slice(1)
          } resources is poor. Accessibility and knowledge to technology is very poor.`
        );
    }
  }

  if (student.inference_result.technological.linguistic === "Very Good") {
    if (average <= 82) {
      technologicalAssessment.push(
        `Overall, ${gender.hisHer} technological factors is very good and ${
          gender.hisHer
        } perfromance is ${getRemarks(average).toLowerCase()}`
      );
    } else {
      technologicalAssessment.push(
        `Overall, ${gender.hisHer} technological factors is very good however ${
          gender.hisHer
        } performance is ${getRemarks(average).toLowerCase()}`
      );
    }
  } else if (student.inference_result.technological.linguistic === "Good") {
    if (average <= 82) {
      technologicalAssessment.push(
        `Overall, ${gender.hisHer} technological factors is good and ${
          gender.hisHer
        } perfromance is ${getRemarks(average).toLowerCase()}`
      );
    } else {
      technologicalAssessment.push(
        `Although ${gender.hisHer} technological factors is good, ${
          gender.hisHer
        } performance is ${getRemarks(average).toLowerCase()}`
      );
    }
  } else if (student.inference_result.technological.linguistic === "Average") {
    if (average <= 82) {
      technologicalAssessment.push(
        `Overall, ${gender.hisHer} technological factors is average and ${
          gender.hisHer
        } perfromance is ${getRemarks(average).toLowerCase()}`
      );
    } else {
      technologicalAssessment.push(
        `Since ${gender.hisHer} technological factors is average, ${
          gender.hisHer
        } performance is ${getRemarks(average).toLowerCase()}`
      );
    }
  } else if (student.inference_result.technological.linguistic === "Poor") {
    if (average <= 82) {
      technologicalAssessment.push(
        `Although ${gender.hisHer} technological factors is poor, ${
          gender.hisHer
        } performance is ${getRemarks(average).toLowerCase()}`
      );
    } else {
      technologicalAssessment.push(
        `Overall, ${gender.hisHer} technological factors is poor and ${
          gender.hisHer
        } perfromance is ${getRemarks(average).toLowerCase()}`
      );
    }
  } else {
    if (average <= 82) {
      technologicalAssessment.push(
        `Although ${gender.hisHer} technological factors is very poor, ${
          gender.hisHer
        } performance is ${getRemarks(average).toLowerCase()}`
      );
    } else {
      technologicalAssessment.push(
        `Overall, ${gender.hisHer} technological factors is very poor and ${
          gender.hisHer
        } perfromance is ${getRemarks(average).toLowerCase()}`
      );
    }
  }
  return technologicalAssessment.join(" ");
};

// The students technological factors is average.
//Student have their slow data and slow wifi that result his
//internet conenction is average.
// He only borrows device to his parents that may also affects his performance in
// his studies. Factoring that his resource is average and his accessibilty and knowledge technology is average,
// this may be one of the reason why he underperforms in class. It is also stated
// that the implementation is effective and his experience is similar resulting his overall experience is Good.
