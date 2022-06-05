import { Student } from "../../types/Students";
import { Dataset } from "../../types/Task";

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
  dataset: Dataset | null,
  ave_remarks: string,
  q_ave_grade: number,
  ww_ave_grade: number,
  ww_ave_pct: number,
  pt_ave_grade: number,
  pt_ave_pct: number
) => {
  let message: string[] = [];

  const set: string | null =
    dataset?.set_a && dataset.set_b
      ? ave_remarks.match(/Poor/g)
        ? "a"
        : "b"
      : null;

  const remarks_arr: number[] =
    dataset?.set_a && dataset.set_b
      ? set === "a"
        ? dataset?.set_b
        : dataset?.set_a
      : [];

  const total =
    dataset?.set_a && dataset.set_b ? dataset?.set_a[0] + dataset?.set_b[0] : 0;
  const max_index = remarks_arr.indexOf(Math.max(...remarks_arr));
  let significant_quarters: number[] = [max_index];

  remarks_arr.forEach((element, idx) => {
    if (idx !== max_index && remarks_arr[max_index] - element <= 5)
      significant_quarters.push(idx);
  });

  if (ave_remarks === "Very Good") {
    message.push(`Very good class performance! ${significant_quarters}`);
  } else if (ave_remarks === "Good") {
    message.push(`Good class performance! ${significant_quarters}`);
  } else if (ave_remarks === "Average") {
    message.push(`Average class performance! ${significant_quarters}`);
  } else if (ave_remarks === "Poor") {
    message.push(`Poor class performance! ${significant_quarters}`);
  } else if (ave_remarks === "Very Poor") {
    message.push(`Very poor class performance! ${significant_quarters}`);
  }

  return message;
};
