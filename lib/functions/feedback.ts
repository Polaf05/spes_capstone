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
          quarter_remarks.push(["Good", margin]);
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
    quarter === 4 ? ` passed the school year.` : ` passed ${quarter} quarters.`;
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
  pt_ave_grade: number,
  pt_ave_pct: number
) => {
  let message: string[] = [];

  let ave_grade_margin =
    transmuteGrade(ww_ave_grade) - transmuteGrade(pt_ave_grade);

  const ww_ave_grade_remarks = getRemarks(transmuteGrade(ww_ave_grade));
  const pt_ave_grade_remarks = getRemarks(transmuteGrade(pt_ave_grade));

  if (ave_grade_margin > 10) {
    //class is better at written works

    if (ww_ave_grade_remarks === "Very Poor") {
      // not better at anything

      if (quarters >= 4) {
        // second sem has ended
        // Uh-oh, class performed very poorly for the school year, please check on your students especially those who lack your attention.
      } else {
        // has remaining quarters
        // class needs to focus on both ww and pt for the remaining ${4-quarters} quarters
      }
    } else if (ww_ave_grade_remarks === "Poor") {
      // class needs guidance on both ww and pt
      if (quarters >= 4) {
        // second sem has ended
        // Uh-oh, class performed poorly for the school year, please check on your students especially those who lack your attention.
      } else {
        // has remaining quarters
        // class needs guidance on both ww and pt for the remaining ${4-quarters} quarters
      }
    } else if (ww_ave_grade_remarks === "Average") {
      // class needs guidance on performance tasks and has a lot to improve on written works
      if (quarters >= 4) {
        // second sem has ended
        // Class performed quite good on written works for the school year. however, please check on your students who are struggling with their performance tasks.
      } else {
        // has remaining quarters
        // Although class performs quite good on written works, class still needs to focus on improving their performance tasks for the remaining ${4-quarters} quarters.
      }
    } else if (ww_ave_grade_remarks === "Good") {
      // class is good at written works. however, class needs guidance on performance tasks
      if (quarters >= 4) {
        // second sem has ended
        // Class performed good on written works for the school year. however, please check on your students who are struggling with their performance tasks.
      } else {
        // has remaining quarters
        // Although class performs good on written works, class still needs to focus on improving their performance tasks for the remaining ${4-quarters} quarters.
      }
    } else {
      // class is outstanding on written works. however, class needs guidance on performance tasks
      if (quarters >= 4) {
        // second sem has ended
        // Outstanding class performance on written works for the school year. however, please check on your students who are struggling with their performance tasks.
      } else {
        // has remaining quarters
        // Although class performs outstandingly on written works, class still needs to focus on improving their performance tasks for the remaining ${4-quarters} quarters.
      }
    }
  } else if (ave_grade_margin > 0) {
    //class is slightly better at written works

    if (ww_ave_grade_remarks === "Very Poor") {
      // not better at anything

      if (quarters >= 4) {
        // second sem has ended
        // Uh-oh, class performed very poorly for the school year, please check on your students especially those who lack your attention.
      } else {
        // has remaining quarters
        // class needs to focus on both ww and pt for the remaining ${4-quarters} quarters
      }
    } else if (ww_ave_grade_remarks === "Poor") {
      // class needs guidance on both ww and pt

      if (quarters >= 4) {
        // second sem has ended
        // Uh-oh, class performed poorly for the school year, please check on your students especially those who lack your attention.
      } else {
        // has remaining quarters
        // Class needs to focus on both ww and pt for the remaining ${4-quarters} quarters
      }
    } else if (ww_ave_grade_remarks === "Average") {
      // class is slightly better at written works. however, focusing on performance tasks is also needed.

      if (quarters >= 4) {
        // second sem has ended
        // Not bad, class performed quite good for the school year, please check on your students especially those struggle on performance tasks.
      } else {
        // has remaining quarters
        // Class performed slightly better at written works, however, they need to focus on performance tasks for the remaining ${4-quarters} quarters
      }
    } else if (ww_ave_grade_remarks === "Good") {
      // class is good at written works. on the other hand, performance tasks still has a lot of room to improve.

      if (quarters >= 4) {
        // second sem has ended
        // Wow!, class is good at written works for the school year. however, please check on your students especially those struggle on performance tasks.
      } else {
        // has remaining quarters
        // Wow! class is good at written works. however, performance tasks still has a lot of room to improve for the remaining ${4-quarters} quarters
      }
    } else {
      // class is outstanding on written works. on the other hand, performance tasks still has a lot of room to improve.

      if (quarters >= 4) {
        // second sem has ended
        // Hooray! class performed outstandingly at written works for the school year. however, please check on your students especially those struggle on performance tasks.
      } else {
        // has remaining quarters
        // Hooray! class performed outstandingly at written works. on the other hand, performance tasks still has a lot of room to improve for the remaining ${4-quarters} quarters
      }
    }
  } else if (ave_grade_margin === 0) {
    // class is better at both ww and pt

    if (ww_ave_grade_remarks === "Very Poor") {
      // not better at anything

      if (quarters >= 4) {
        // second sem has ended
        // Uh-oh, class performed very poorly for the school year, please check on your students especially those who lack your attention.
      } else {
        // has remaining quarters
        // class needs to focus on both ww and pt for the remaining ${4-quarters} quarters
      }
    } else if (ww_ave_grade_remarks === "Poor") {
      // class needs guidance on both ww and pt

      if (quarters >= 4) {
        // second sem has ended
        // Uh-oh, class performed very poorly for the school year, please check on your students especially those who lack your attention.
      } else {
        // has remaining quarters
        // class needs to focus on both ww and pt for the remaining ${4-quarters} quarters
      }
    } else if (ww_ave_grade_remarks === "Average") {
      // class is quite good at both ww and pt. maintain focus on improving both of these aspects as it still has a lot of room for it.

      if (quarters >= 4) {
        // second sem has ended
        // Not bad, class performed quite good for the school year, please check on your students especially those who lack your attention.
      } else {
        // has remaining quarters
        // Not bad, class performed quite good on written works and performance tasks. maintain focus on improving both of these aspects for the remaining ${4-quarters} quarters as it still has a lot of room for it.
      }
    } else if (ww_ave_grade_remarks === "Good") {
      // wow! class is good at both ww and pt.

      if (quarters >= 4) {
        // second sem has ended
        // Wow! class performed good for the school year, congratulate your students for doing a great job!
      } else {
        // has remaining quarters
        // Wow! class performed good on both written works and performance tasks. Maintain focus on improving both of these aspects for the remaining ${4-quarters} quarters as it still has a lot of room for it.
      }
    } else {
      // hooray! class performance is outstanding on both written works and performance tasks.
      if (quarters >= 4) {
        // second sem has ended
        // Hooray! class performed outstandingly for the school year, congratulate your students for doing an excellent job!
      } else {
        // has remaining quarters
        // Hooray! class performed outstandingly both on written works and performance tasks. Maintain focus on improving both of these aspects for the remaining ${4-quarters} quarters as it still has a lot of room for it.
      }
    }
  } else if (ave_grade_margin > -10) {
    // class is slightly better at performance tasks

    if (pt_ave_grade_remarks === "Very Poor") {
      // not better at anything

      if (quarters >= 4) {
        // second sem has ended
        // Uh-oh, class performed very poorly for the school year, please check on your students especially those who lack your attention.
      } else {
        // has remaining quarters
        // class needs to focus on both ww and pt for the remaining ${4-quarters} quarters
      }
    } else if (pt_ave_grade_remarks === "Poor") {
      // class needs guidance on both ww and pt

      if (quarters >= 4) {
        // second sem has ended
        // Uh-oh, class performed poorly for the school year, please check on your students especially those who lack your attention.
      } else {
        // has remaining quarters
        // Class needs to focus on both ww and pt for the remaining ${4-quarters} quarters
      }
    } else if (pt_ave_grade_remarks === "Average") {
      // class is slightly better at performance tasks. however, focusing on written works is also needed.
      if (quarters >= 4) {
        // second sem has ended
        // Not bad, class performed quite good for the school year, please check on your students especially those struggle on written works.
      } else {
        // has remaining quarters
        // Class performed slightly better at performance tasks, however, they need to focus on written works for the remaining ${4-quarters} quarters
      }
    } else if (pt_ave_grade_remarks === "Good") {
      // class is good at performance tasks. on the other hand, written works still has a lot of room to improve.
      if (quarters >= 4) {
        // second sem has ended
        // Wow!, class is good at performance tasks for the school year. however, please check on your students especially those struggle on written works.
      } else {
        // has remaining quarters
        // Wow! class is good at performance tasks. however, written works still has a lot of room to improve for the remaining ${4-quarters} quarters
      }
    } else {
      // class is outstanding on performance tasks. on the other hand, written works still has a lot of room to improve.
      if (quarters >= 4) {
        // second sem has ended
        // Hooray! class performed outstandingly at performance tasks for the school year. however, please check on your students especially those struggle on performance tasks.
      } else {
        // has remaining quarters
        // Hooray! class performed outstandingly at performance tasks. on the other hand, written works still has a lot of room to improve for the remaining ${4-quarters} quarters
      }
    }
  } else {
    // class is better at performance tasks

    if (pt_ave_grade_remarks === "Very Poor") {
      // not better at anything

      if (quarters >= 4) {
        // second sem has ended
        // Uh-oh, class performed very poorly for the school year, please check on your students especially those who lack your attention.
      } else {
        // has remaining quarters
        // class needs to focus on both ww and pt for the remaining ${4-quarters} quarters
      }
    } else if (pt_ave_grade_remarks === "Poor") {
      // class needs guidance on both ww and pt
      if (quarters >= 4) {
        // second sem has ended
        // Uh-oh, class performed poorly for the school year, please check on your students especially those who lack your attention.
      } else {
        // has remaining quarters
        // class needs guidance on both ww and pt for the remaining ${4-quarters} quarters
      }
    } else if (pt_ave_grade_remarks === "Average") {
      // class needs guidance on performance tasks and has a lot to improve on written works
      if (quarters >= 4) {
        // second sem has ended
        // Class performed quite good on performance tasks for the school year. however, please check on your students who are struggling with their written works.
      } else {
        // has remaining quarters
        // Although class performs quite good on performance tasks, class still needs to focus on improving their written works for the remaining ${4-quarters} quarters.
      }
    } else if (pt_ave_grade_remarks === "Good") {
      // class good at performance tasks. however, class needs guidance on written works
      if (quarters >= 4) {
        // second sem has ended
        // Class performed good on performance tasks for the school year. however, please check on your students who are struggling with their written works.
      } else {
        // has remaining quarters
        // Although class performs good on performance tasks, class still needs to focus on improving their written works for the remaining ${4-quarters} quarters.
      }
    } else {
      // class is outstanding on performance tasks. however, class needs guidance on written works
      if (quarters >= 4) {
        // second sem has ended
        // Outstanding class performance on performance tasks for the school year. however, please check on your students who are struggling with their performance tasks and written works.
      } else {
        // has remaining quarters
        // Although class performs outstandingly on performance tasks, class still needs to focus on improving their written works for the remaining ${4-quarters} quarters.
      }
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

  if (ave_remarks === "Very Good") {
    message.push(`Very good student performance`);
  } else if (ave_remarks === "Good") {
    message.push(`Good student performance`);
  } else if (ave_remarks === "Average") {
    message.push(`Average student performance`);
  } else if (ave_remarks === "Poor") {
    message.push(`Poor student performance`);
  } else {
    message.push(`Very poor student performance`);
  }

  return message;
};
