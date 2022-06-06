import { FinalRemarks } from "../../types/Remarks";
import { Student } from "../../types/Students";
import { Dataset } from "../../types/Task";
import { getRemarks, transmuteGrade } from "./grade_computation";

type Pronoun = {
  male: {
    he: string;
    him: string;
    his: string;
  };
  female: {
    she: string;
    her: string;
    hers: string;
  };
};

type Gender = {
  heShe: string;
  himHer: string;
  hisHers: string;
};

export const getPronoun = (gender: string) => {
  const male: Gender = {
    heShe: "he",
    himHer: "him",
    hisHers: "his",
  };
  const female: Gender = {
    heShe: "she",
    himHer: "her",
    hisHers: "hers",
  };
  return gender === "MALE" ? male : female;
};

export const getRemarksAnalysis = (student: Student, remarks: string) => {
  const gender = getPronoun(student.gender);
  const REMARKS_MESSAGE = [
    "Outstanding Performance, SPES has nothing to say!",
    "Wow, this student has a lot of potential!",
    "Good performance, however there is still a lot of room for improvement.",
    `This student needs attention, help ${gender.himHer} where ${gender.heShe} lacks`,
    `Student performed very poorly, ${gender.heShe} needs a lot of attention.`,
  ];

  if (remarks === "Very Good") return REMARKS_MESSAGE[0];
  else if (remarks === "Good") return REMARKS_MESSAGE[1];
  else if (remarks === "Average") return REMARKS_MESSAGE[2];
  else if (remarks === "Poor") return REMARKS_MESSAGE[3];
  else return REMARKS_MESSAGE[4];
};

export const getMarginResults = (dataset: Dataset, option: string) => {
  let quarter_remarks: any[] = [];

  if (option === "margin") {
  } else {
    if (dataset?.set_a && dataset.set_b) {
      let set_a: number[] = dataset.set_a;
      let set_b: number[] = dataset.set_b;

      for (let i = 0; i < dataset.set_a.length; i++) {
        let margin = set_a[i] - set_b[i];
        if (margin > 40) {
          quarter_remarks.push("Very Good");
        } else if (margin >= 20) {
          quarter_remarks.push("Good");
        } else if (margin >= 0) {
          quarter_remarks.push("Average");
        } else if (margin >= -20) {
          quarter_remarks.push("Poor");
        } else {
          quarter_remarks.push("Very Poor");
        }
      }
    }
  }

  return quarter_remarks;
};

export const getPassingRemarks = (passing_pct: number, quarter: number) => {
  const failedStudents = 100 - passing_pct;
  const passing_student = `${
    10 - Number((failedStudents / 10).toFixed())
  } out of 10 students`;
  const passing_pct_remarks = ` ${passing_pct}% of the classroom or `;

  const quarter_remarks =
    quarter === 4
      ? ` passed the school year.`
      : ` passed ${quarter} quarter/s.`;
  let message_remarks: string[] = [];

  if (passing_pct < 50) {
    message_remarks = [
      "Very poor class performance, only ",
      passing_pct_remarks,
      passing_student,
      quarter_remarks,
    ];
  } else if (passing_pct < 60) {
    message_remarks = [
      "Uh-oh! poor class performance, only",
      passing_pct_remarks,
      passing_student,
      quarter_remarks,
    ];
  } else if (passing_pct < 68) {
    message_remarks = [
      "Too bad, only ",
      passing_pct_remarks,
      passing_student,
      quarter_remarks,
    ];
  } else if (passing_pct < 75) {
    message_remarks = [
      "Not too bad, ",
      passing_pct_remarks,
      passing_student,
      quarter_remarks,
    ];
  } else if (passing_pct < 80) {
    message_remarks = [
      "Expected class performance, ",
      passing_pct_remarks,
      passing_student,
      quarter_remarks,
    ];
  } else if (passing_pct < 90) {
    message_remarks = [
      "Good class performance, ",
      passing_pct_remarks,
      passing_student,
      quarter_remarks,
    ];
  } else if (passing_pct < 99) {
    message_remarks = [
      "Hooray! Very good class performance, ",
      passing_pct_remarks,
      passing_student,
      quarter_remarks,
    ];
  } else {
    message_remarks = [
      "WOW! Outstanding class performance, ",
      passing_pct_remarks,
      passing_student,
      quarter_remarks,
    ];
  }
  return message_remarks;
};

export const getClassPerformanceAssessment = (
  quarters: number,
  dataset: Dataset | null,
  ave_remarks: string,
  q_ave_grade: number,
  ww_ave_grade: number,
  ww_ave_pct: number,
  ww_participation: number,
  pt_ave_grade: number,
  pt_ave_pct: number,
  pt_participation: number
) => {
  let message: string = "";

  let ave_grade_margin =
    transmuteGrade(ww_ave_grade) - transmuteGrade(pt_ave_grade);

  const ww_ave_grade_remarks = getRemarks(transmuteGrade(ww_ave_grade));
  const pt_ave_grade_remarks = getRemarks(transmuteGrade(pt_ave_grade));
  let better_at = "pt";
  if (ave_grade_margin > 5) {
    //class is better at written works

    if (ww_ave_grade_remarks === "Very Poor") {
      // not better at anything

      if (quarters >= 4) {
        // second sem has ended
        message = `Uh-oh, class performed very poorly for the school year, please check on your students especially those who lack your attention.`;
      } else {
        // has remaining quarters
        message = `Class needs to focus on both Written Works and Performance Tasks for the remaining ${
          4 - quarters
        } quarter/s.`;
      }
    } else if (ww_ave_grade_remarks === "Poor") {
      // class needs guidance on both Written Works and Performance Tasks
      if (quarters >= 4) {
        // second sem has ended
        message = `Uh-oh, class performed poorly for the school year, please check on your students especially those who lack your attention as they might have failed the school year.`;
      } else {
        // has remaining quarters
        message = `Class needs guidance on both Written Works and Performance Tasks for the remaining ${
          4 - quarters
        } quarter/s.`;
      }
    } else if (ww_ave_grade_remarks === "Average") {
      // class needs guidance on performance tasks and has a lot to improve on written works
      if (quarters >= 4) {
        // second sem has ended
        message = `Class performed quite good on written works for the school year. However, please check on your students who struggled with their performance tasks as they might have failed the school year.`;
      } else {
        // has remaining quarters
        message = `Although class performs quite good on written works, class still needs to focus on improving their performance tasks for the remaining ${
          4 - quarters
        } quarter/s.`;
      }
    } else if (ww_ave_grade_remarks === "Good") {
      // class is good at written works. However, class needs guidance on performance tasks
      if (quarters >= 4) {
        // second sem has ended
        message = `Class performed good on written works for the school year. However, please check on your students who struggled with their performance tasks as they might have failed the school year.`;
      } else {
        // has remaining quarters
        message = `Although class performs good on written works, class still needs to focus on improving their performance tasks for the remaining ${
          4 - quarters
        } quarter/s.`;
      }
    } else {
      // class is outstanding on written works. However, class needs guidance on performance tasks
      if (quarters >= 4) {
        // second sem has ended
        message = `Outstanding class performance on written works for the school year. However, please check on your students who struggled with their performance tasks as they might have failed the school year`;
      } else {
        // has remaining quarters
        message = `Although class performs outstandingly on written works, class still needs to focus on improving their performance tasks for the remaining ${
          4 - quarters
        } quarter/s.`;
      }
    }

    //change better at variable
    better_at = "ww";
  } else if (ave_grade_margin > 0) {
    //class is slightly better at written works

    if (ww_ave_grade_remarks === "Very Poor") {
      // not better at anything

      if (quarters >= 4) {
        // second sem has ended
        message = `Uh-oh, class performed very poorly for the school year, please check on your students especially those who lack your attention.`;
      } else {
        // has remaining quarters
        message = `Class needs to focus on both Written Works and Performance Tasks for the remaining ${
          4 - quarters
        } quarter/s.`;
      }
    } else if (ww_ave_grade_remarks === "Poor") {
      // class needs guidance on both Written Works and Performance Tasks

      if (quarters >= 4) {
        // second sem has ended
        message = `Uh-oh, class performed poorly for the school year, please check on your students especially those who lack your attention as they might have failed the school year.`;
      } else {
        // has remaining quarters
        message = `Class needs to focus on both Written Works and Performance Tasks for the remaining ${
          4 - quarters
        } quarters`;
      }
    } else if (ww_ave_grade_remarks === "Average") {
      // class is slightly better at written works. However, focusing on performance tasks is also needed.

      if (quarters >= 4) {
        // second sem has ended
        message = `Not bad, class performed quite good for the school year, please check on your students especially those struggle on performance tasks as they might have failed the school year.`;
      } else {
        // has remaining quarters
        message = `Class performed slightly better at written works, however, they need to focus on performance tasks for the remaining ${
          4 - quarters
        } quarters`;
      }
    } else if (ww_ave_grade_remarks === "Good") {
      // class is good at written works. on the other hand, performance tasks still has a lot of room to improve.

      if (quarters >= 4) {
        // second sem has ended
        message = `Wow!, class is good at written works for the school year. However, please check on your students especially those struggle on performance tasks as they might have failed the school year`;
      } else {
        // has remaining quarters
        message = `Wow! class is good at written works. However, performance tasks still has a lot of room to improve for the remaining ${
          4 - quarters
        } quarters`;
      }
    } else {
      // class is outstanding on written works. on the other hand, performance tasks still has a lot of room to improve.

      if (quarters >= 4) {
        // second sem has ended
        message = `Hooray! class performed outstandingly at written works for the school year. However, please check on your students especially those struggle on performance tasks as they might have failed the school year.`;
      } else {
        // has remaining quarters
        message = `Hooray! class performed outstandingly at written works. on the other hand, performance tasks still has a lot of room to improve for the remaining ${
          4 - quarters
        } quarters`;
      }
    }

    //change better at variable
    better_at = "ww";
  } else if (ave_grade_margin === 0) {
    // class is better at both Written Works and Performance Tasks

    if (ww_ave_grade_remarks === "Very Poor") {
      // not better at anything

      if (quarters >= 4) {
        // second sem has ended
        message = `Uh-oh, class performed very poorly for the school year, please check on your students especially those who lack your attention.`;
      } else {
        // has remaining quarters
        message = `Class needs to focus on both Written Works and Performance Tasks for the remaining ${
          4 - quarters
        } quarter/s.`;
      }
    } else if (ww_ave_grade_remarks === "Poor") {
      // class needs guidance on both Written Works and Performance Tasks

      if (quarters >= 4) {
        // second sem has ended
        message = `Uh-oh, class performed very poorly for the school year, please check on your students especially those who lack your attention.`;
      } else {
        // has remaining quarters
        message = `class needs to focus on both Written Works and Performance Tasks for the remaining ${
          4 - quarters
        } quarters`;
      }
    } else if (ww_ave_grade_remarks === "Average") {
      // class is quite good at both Written Works and Performance Tasks. maintain focus on improving both of these aspects as it still has a lot of room for it.

      if (quarters >= 4) {
        // second sem has ended
        message = `Not bad, class performed quite good for the school year, please check on your students especially those who lack your attention.`;
      } else {
        // has remaining quarters
        message = `Not bad, class performed quite good on written works and performance tasks. Maintain focus on improving both of these aspects for the remaining ${
          4 - quarters
        } quarters as it still has a lot of room for it.`;
      }
    } else if (ww_ave_grade_remarks === "Good") {
      // wow! class is good at both Written Works and Performance Tasks.

      if (quarters >= 4) {
        // second sem has ended
        message = `Wow! class performed good for the school year, congratulate your students for doing a great job!`;
      } else {
        // has remaining quarters
        message = `Wow! class performed good on both written works and performance tasks. Maintain focus on improving both of these aspects for the remaining ${
          4 - quarters
        } quarters as it still has a lot of room for it.`;
      }
    } else {
      // hooray! class performance is outstanding on both written works and performance tasks.
      if (quarters >= 4) {
        // second sem has ended
        message = `Hooray! class performed outstandingly for the school year, congratulate your students for doing an excellent job!`;
      } else {
        // has remaining quarters
        message = `Hooray! class performed outstandingly both on written works and performance tasks. Maintain focus on improving both of these aspects for the remaining ${
          4 - quarters
        } quarters as it still has a lot of room for it.`;
      }
    }

    //change better at variable
    better_at = "both";
  } else if (ave_grade_margin > -5) {
    // class is slightly better at performance tasks

    if (pt_ave_grade_remarks === "Very Poor") {
      // not better at anything

      if (quarters >= 4) {
        // second sem has ended
        message = `Uh-oh, class performed very poorly for the school year, please check on your students especially those who lack your attention.`;
      } else {
        // has remaining quarters
        message = `Class needs to focus on both Written Works and Performance Tasks for the remaining ${
          4 - quarters
        } quarters`;
      }
    } else if (pt_ave_grade_remarks === "Poor") {
      // class needs guidance on both Written Works and Performance Tasks

      if (quarters >= 4) {
        // second sem has ended
        message = `Uh-oh, class performed poorly for the school year, please check on your students especially those who lack your attention as they might have failed the school year.`;
      } else {
        // has remaining quarters
        message = `Class needs to focus on both Written Works and Performance Tasks for the remaining ${
          4 - quarters
        } quarters`;
      }
    } else if (pt_ave_grade_remarks === "Average") {
      // class is slightly better at performance tasks. However, focusing on written works is also needed.
      if (quarters >= 4) {
        // second sem has ended
        message = `Not bad, class performed quite good for the school year, please check on your students especially those struggle on written works.`;
      } else {
        // has remaining quarters
        message = `Class performed slightly better at performance tasks, however, they need to focus on written works for the remaining ${
          4 - quarters
        } quarter/s.`;
      }
    } else if (pt_ave_grade_remarks === "Good") {
      // class is good at performance tasks. on the other hand, written works still has a lot of room to improve.
      if (quarters >= 4) {
        // second sem has ended
        message = `Wow!, class is good at performance tasks for the school year. However, please check on your students especially those struggle on written works.`;
      } else {
        // has remaining quarters
        message = `Wow! class is good at performance tasks. However, written works still has a lot of room to improve for the remaining ${
          4 - quarters
        } quarter/s.`;
      }
    } else {
      // class is outstanding on performance tasks. on the other hand, written works still has a lot of room to improve.
      if (quarters >= 4) {
        // second sem has ended
        message = `Hooray! class performed outstandingly at performance tasks for the school year. However, please check on your students especially those struggle on performance tasks as they might have failed the school year.`;
      } else {
        // has remaining quarters
        message = `Hooray! class performed outstandingly at performance tasks. on the other hand, written works still has a lot of room to improve for the remaining ${
          4 - quarters
        } quarter/s.`;
      }
    }
  } else {
    // class is better at performance tasks

    if (pt_ave_grade_remarks === "Very Poor") {
      // not better at anything

      if (quarters >= 4) {
        // second sem has ended
        message = `Uh-oh, class performed very poorly for the school year, please check on your students especially those who lack your attention.`;
      } else {
        // has remaining quarters
        message = `Class needs to focus on both Written Works and Performance Tasks for the remaining ${
          4 - quarters
        } quarter/s.`;
      }
    } else if (pt_ave_grade_remarks === "Poor") {
      // class needs guidance on both Written Works and Performance Tasks
      if (quarters >= 4) {
        // second sem has ended
        message = `Uh-oh, class performed poorly for the school year, please check on your students especially those who lack your attention as they might have failed the school year.`;
      } else {
        // has remaining quarters
        message = `Class needs guidance on both Written Works and Performance Tasks for the remaining ${
          4 - quarters
        } quarter/s.`;
      }
    } else if (pt_ave_grade_remarks === "Average") {
      // class needs guidance on performance tasks and has a lot to improve on written works
      if (quarters >= 4) {
        // second sem has ended
        message = `Class performed quite good on performance tasks for the school year. However, please check on your students who struggled with their written works.`;
      } else {
        // has remaining quarters
        message = `Although class performs quite good on performance tasks, class still needs to focus on improving their written works for the remaining ${
          4 - quarters
        } quarter/s.`;
      }
    } else if (pt_ave_grade_remarks === "Good") {
      // class good at performance tasks. However, class needs guidance on written works
      if (quarters >= 4) {
        // second sem has ended
        message = `Class performed good on performance tasks for the school year. However, please check on your students who struggled with their written works.`;
      } else {
        // has remaining quarters
        message = `Although class performs good on performance tasks, class still needs to focus on improving their written works for the remaining ${
          4 - quarters
        } quarter/s.`;
      }
    } else {
      // class is outstanding on performance tasks. However, class needs guidance on written works
      if (quarters >= 4) {
        // second sem has ended
        message = `Outstanding class performance on performance tasks for the school year. However, please check on your students who struggled with their performance tasks as they might have failed the school year and written works.`;
      } else {
        // has remaining quarters
        message = `Although class performs outstandingly on performance tasks, class still needs to focus on improving their written works for the remaining ${
          4 - quarters
        } quarter/s.`;
      }
    }
  }

  let message_participants = "";
  const ave_participants = (ww_participation + pt_participation) / 2;
  const participants_diff = ww_participation - pt_participation;
  if (participants_diff > 5) {
    if (ww_participation > 88) {
      message_participants = `Students tend to participate on written works more than performance tasks. In-addition, the average classroom participation is ${ave_participants}% which resulted to an average student remark of "${ave_remarks}".`;
    } else {
      message_participants = `Students tend to participate on written works more than performance tasks. However, it can also be seen that only an average of ${ave_participants}% of the classroom are actively participating on school tasks which resulted to an average student remark of "${ave_remarks}".`;
    }
  } else if (participants_diff > 0) {
    if (ww_participation > 88) {
      message_participants = `Students tend to participate on written works slightly more than performance tasks. In-addition, the average classroom participation is ${ave_participants}% which resulted to an average student remark of "${ave_remarks}".`;
    } else {
      message_participants = `Students tend to participate on written works slightly more than performance tasks. However, it can also be seen that only an average of ${ave_participants}% of the classroom are actively participating on school tasks which resulted to an average student remark of "${ave_remarks}".`;
    }
  } else if (participants_diff === 0) {
    if (ww_participation > 88) {
      message_participants = `Wow! Students are actively participating on classroom activities. In-addition, the average classroom participation is ${ave_participants}% which resulted to an average student remark of "${ave_remarks}".`;
    } else {
      message_participants = `Students tend to actively participate on both Written Works and Performance Tasks. However, it can also be seen that only an average of ${ave_participants}% of the classroom are actively participating on school tasks which resulted to an average student remark of "${ave_remarks}".`;
    }
  } else if (participants_diff > -5) {
    if (ww_participation > 88) {
      message_participants = `Students tend to participate on performance tasks slightly more than written works. In-addition, the average classroom participation is ${ave_participants}% which resulted to an average student remark of "${ave_remarks}".`;
    } else {
      message_participants = `Students tend to participate on performance tasks slightly more than performance tasks. However, it can also be seen that only an average of ${ave_participants}% of the classroom are actively participating on school tasks which resulted to an average student remark of "${ave_remarks}".`;
    }
  } else {
    if (ww_participation > 88) {
      message_participants = `Students tend to participate on performance tasks more than performance tasks. In-addition, the average classroom participation is ${ave_participants}% which resulted to an average student remark of "${ave_remarks}".`;
    } else {
      message_participants = `Students tend to participate on performance tasks than performance tasks. However, it can also be seen that only an average of ${ave_participants}% of the classroom are actively participating on school tasks which resulted to an average student remark of "${ave_remarks}".`;
    }
  }

  const final_remarks: FinalRemarks[] = [
    {
      very_good: {
        message: [],
        margin: null,
      },
      good: {
        message: [],
        margin: null,
      },
      average: {
        message: [],
        margin: null,
      },
      poor: {
        message: [],
        margin: null,
      },
      very_poor: { message: [], margin: null },
    },
  ];

  return message + " " + message_participants;
};
