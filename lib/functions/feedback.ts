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
  hisHer: string;
};

export const getPercentageRemarks = (
  score: number,
  participants: number,
  option: string
) => {
  let analysis = "";

  if (score > 90) {
    // very high ave score score
    analysis = ` very high score percentage of ${score}.`;
  } else if (score > 85) {
    // high ave score score
    analysis = ` high score percentage of ${score}.`;
  } else if (score > 75) {
    // good ave score score
    analysis = ` score percentage of ${score}.`;
  } else if (score > 65) {
    // quite bad ave score score, below passing rate
    analysis = ` bad score percentage of ${score}.`;
  } else if (score > 50) {
    // bad ave score score, please consider reviewing your tasks.
    analysis = ` bad score percentage of ${score}. Please consider reviewing your tasks, it may be too difficult for the students and/or other reasons.`;
  } else {
    // very bad ave score score, please consider reviewing your tasks.
    analysis = ` very bad score percentage of ${score}. Please consider reviewing your tasks, it may be too difficult for the students and/or other reasons.`;
  }

  return analysis;
};

export const getTaskAnalysis = (
  option: string,
  students: number,
  score_pct: number,
  participants_pct: number
) => {
  let final_analysis = "";

  if (participants_pct > 90) {
    // very high ave score pct
    final_analysis = `Great! ${participants_pct}% of the class are actively participating on ${option}`;
  } else if (participants_pct > 85) {
    // high ave score pct
    final_analysis = `As should be, ${participants_pct}% of the class are actively participating on ${option}`;
  } else if (participants_pct > 75) {
    // good ave score pct
    final_analysis = `Not bad, ${participants_pct}% of the class are participating on ${option}`;
  } else if (participants_pct > 55) {
    // quite bad ave score pct, below passing rate
    final_analysis = `Only ${participants_pct}% of the class are participating on ${option}`;
  } else {
    // bad ave score pct, please consider reviewing your tasks.
    final_analysis = `There might be something wrong, only ${participants_pct}% of the class are participating on ${option}`;
  }

  const whileAlso = "while also averaging a";
  const plsConsider =
    "Please consider reviewing your tasks, it may be too difficult for the students and/or other reasons.";
  let analysis = "";

  if (score_pct > 90) {
    // very high ave score score
    analysis = `${whileAlso} very high score percentage of ${score_pct}%.`;
  } else if (score_pct > 85) {
    // high ave score score
    analysis = `${whileAlso} high score percentage of ${score_pct}%.`;
  } else if (score_pct > 75) {
    // good ave score score
    analysis = `${whileAlso} score percentage of ${score_pct}%.`;
  } else if (score_pct > 65) {
    // quite bad ave score score, below passing rate
    analysis = `${whileAlso} quite bad score percentage of ${score_pct}%.`;
  } else if (score_pct > 50) {
    // poor ave score score, please consider reviewing your tasks.
    analysis = `${whileAlso} poor score percentage of ${score_pct}%. ${plsConsider}`;
  } else {
    // very poor ave score score, please consider reviewing your tasks.
    analysis = `${whileAlso} very poor score percentage of ${score_pct}%. ${plsConsider}`;
  }

  return `${final_analysis} ${analysis}`;
};

export const getFinalTaskAnalysis = (
  ww_passing_rate: number,
  pt_passing_rate: number,
  ww_ave_score: number,
  pt_ave_score: number,
  ww_ave_participants: number,
  pt_ave_participants: number
) => {
  const final_analysis = "";

  const passing_margin = ww_passing_rate - pt_passing_rate;
  let margin_analysis = "";
  if (passing_margin > 40) {
    const remarks = getRemarks(ww_passing_rate);
    if (remarks.match(/Good|Average/g)) {
      margin_analysis = `The margin of (+${passing_margin}) between the passing rates indicates that students are having a hard time with performance tasks.`;
    } else {
      margin_analysis = `The margin of (+${passing_margin}) between the passing rates indicates that students are having a hard time with written works and much harder on performance tasks.`;
    }
  } else if (passing_margin >= 20) {
  } else if (passing_margin > 0) {
  } else if (passing_margin === 0) {
  } else if (passing_margin >= -20) {
  } else if (passing_margin >= 40) {
  } else {
  }

  return final_analysis;
};

export const getPronoun = (gender: string) => {
  const male: Gender = {
    heShe: "he",
    himHer: "him",
    hisHers: "his",
    hisHer: "his",
  };
  const female: Gender = {
    heShe: "she",
    himHer: "her",
    hisHers: "hers",
    hisHer: "her",
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

const recentQuarterComparison = (
  set_a: number[],
  set_b: number[],
  i: number
) => {
  let quarter_remarks: string = ``;
  // if recent quarter is greater than 0

  const better_than = [
    "slightly better than",
    "better than",
    "much better than",
  ];
  const remarks = (
    better_at_quarter: string,
    quarter_no: number,
    index: number
  ) => {
    let better_at: number[] = [];
    better_at =
      better_at_quarter === "current"
        ? [quarter_no + 1, quarter_no]
        : [quarter_no, quarter_no + 1];

    return `, quarter ${better_at[0]} performance is ${better_than[index]} quarter ${better_at[1]}.`;
  };

  type ClassRemarks = {
    insight: string;
    result: string;
  };

  const class_remarks: ClassRemarks = {
    insight: "",
    result: "",
  };

  if (i - 1 >= 0) {
    const weight = [0, 0, 0, 0, 0];

    // current quarter vs recent quarter
    const recent_margin = set_a[i] - set_a[i - 1];
    if (recent_margin > 60) {
      // greater than 60
      quarter_remarks = `${remarks("current", i, 2)}`;
    } else if (recent_margin >= 30) {
      // 30 to 60
      quarter_remarks = `${remarks("current", i, 1)} `;
    } else if (recent_margin > 0) {
      // 1 to 30
      quarter_remarks = `${remarks("current", i, 0)} `;
    } else if (recent_margin === 0) {
      // 0
      //quarter_remarks = `${remarks("current", i)} `;
    } else if (recent_margin >= -30) {
      // -1 to -30
      quarter_remarks = `${remarks("recent", i, 0)} `;
    } else if (recent_margin >= -60) {
      // -31 - -60
      quarter_remarks = `${remarks("recent", i, 1)}`;
    } else {
      quarter_remarks = `${remarks("recent", i, 2)}`;
    }
  } else {
    return ".";
  }

  return quarter_remarks;
};

export const getMarginResults = (dataset: Dataset, option: string) => {
  let quarter_remarks: string[] = [];

  if (dataset?.set_a && dataset.set_b) {
    let set_a: number[] = dataset.set_a;
    let set_b: number[] = dataset.set_b;

    for (let i = 0; i < dataset.set_a.length; i++) {
      let margin = set_a[i] - set_b[i];
      if (margin > 40) {
        quarter_remarks.push(
          `For quarter ${i + 1}, students performed very good` +
            recentQuarterComparison(set_a, set_b, i)
        );
      } else if (margin >= 20) {
        quarter_remarks.push(
          `For quarter ${i + 1}, students performed good` +
            recentQuarterComparison(set_a, set_b, i)
        );
      } else if (margin >= 0) {
        quarter_remarks.push(
          `For quarter ${i + 1}, students performed quite good` +
            recentQuarterComparison(set_a, set_b, i)
        );
      } else if (margin >= -20) {
        quarter_remarks.push(
          `For quarter ${i + 1}, students performed poor` +
            recentQuarterComparison(set_a, set_b, i)
        );
      } else {
        quarter_remarks.push(
          `For quarter ${i + 1}, students performed very poor` +
            recentQuarterComparison(set_a, set_b, i)
        );
      }
    }
  }

  return quarter_remarks;
};

export const getPassingRemarks = (passing_pct: number, quarter: number) => {
  //console.log("here:", passing_pct, quarter);

  const failedStudents = 100 - passing_pct;
  const passing_student = `${
    10 - Number((failedStudents / 10).toFixed())
  } out of 10 students`;
  const passing_pct_remarks = ` ${passing_pct.toFixed(
    1
  )}% of the classroom or `;

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
        message = `Not bad, class performed quite good for the school year, please check on your students especially those struggling on performance tasks as they might have failed the school year.`;
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
        message = `Wow!, class is good at written works for the school year. However, please check on your students especially those struggling on performance tasks as they might have failed the school year`;
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
        message = `Hooray! class performed outstandingly at written works for the school year. However, please check on your students especially those struggling on performance tasks as they might have failed the school year.`;
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
        message = `Not bad, class performed quite good for the school year, please check on your students especially those struggling on written works.`;
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
        message = `Wow!, class is good at performance tasks for the school year. However, please check on your students especially those struggling on written works.`;
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
        message = `Hooray! class performed outstandingly at performance tasks for the school year. However, please check on your students especially those struggling on performance tasks as they might have failed the school year.`;
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
  const ave_score_pct = ((ww_ave_pct + pt_ave_pct) / 2).toFixed(1);

  console.log(ww_ave_pct, pt_ave_pct, ave_score_pct);

  if (participants_diff > 5) {
    if (ww_participation > 88) {
      message_participants = `Students tend to participate on written works more than performance tasks. In-addition, the average classroom participation is ${ave_participants.toFixed(
        1
      )}% with an average score percentage of ${ave_score_pct}% which resulted to an average student remark of "${ave_remarks}".`;
    } else {
      message_participants = `Students tend to participate on written works more than performance tasks. However, it can also be seen that only an average of ${ave_participants.toFixed(
        1
      )}% with an average score percentage of ${ave_score_pct}% of the classroom are actively participating on school tasks which resulted to an average student remark of "${ave_remarks}".`;
    }
  } else if (participants_diff > 0) {
    if (ww_participation > 88) {
      message_participants = `Students tend to participate on written works slightly more than performance tasks. In-addition, the average classroom participation is ${ave_participants.toFixed(
        1
      )}% with an average score percentage of ${ave_score_pct}% which resulted to an average student remark of "${ave_remarks}".`;
    } else {
      message_participants = `Students tend to participate on written works slightly more than performance tasks. However, it can also be seen that only an average of ${ave_participants.toFixed(
        1
      )}% with an average score percentage of ${ave_score_pct}% of the classroom are actively participating on school tasks which resulted to an average student remark of "${ave_remarks}".`;
    }
  } else if (participants_diff === 0) {
    if (ww_participation > 88) {
      message_participants = `Wow! Students are actively participating on classroom activities. In-addition, the average classroom participation is ${ave_participants.toFixed(
        1
      )}% with an average score percentage of ${ave_score_pct}% which resulted to an average student remark of "${ave_remarks}".`;
    } else {
      message_participants = `Students tend to actively participate on both Written Works and Performance Tasks. However, it can also be seen that only an average of ${ave_participants.toFixed(
        1
      )}% with an average score percentage of ${ave_score_pct}% of the classroom are actively participating on school tasks which resulted to an average student remark of "${ave_remarks}".`;
    }
  } else if (participants_diff > -5) {
    if (ww_participation > 88) {
      message_participants = `Students tend to participate on performance tasks slightly more than written works. In-addition, the average classroom participation is ${ave_participants.toFixed(
        1
      )}% with an average score percentage of ${ave_score_pct}% which resulted to an average student remark of "${ave_remarks}".`;
    } else {
      message_participants = `Students tend to participate on performance tasks slightly more than written works. However, it can also be seen that only an average of ${ave_participants.toFixed(
        1
      )}% with an average score percentage of ${ave_score_pct}% of the classroom are actively participating on school tasks which resulted to an average student remark of "${ave_remarks}".`;
    }
  } else {
    if (ww_participation > 88) {
      message_participants = `Students tend to participate on performance tasks more than written works. In-addition, the average classroom participation is ${ave_participants.toFixed(
        1
      )}% with an average score percentage of ${ave_score_pct}% which resulted to an average student remark of "${ave_remarks}".`;
    } else {
      message_participants = `Students tend to participate on performance tasks than written works. However, it can also be seen that only an average of ${ave_participants.toFixed(
        1
      )}% with an average score percentage of ${ave_score_pct}% of the classroom are actively participating on school tasks which resulted to an average student remark of "${ave_remarks}".`;
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
