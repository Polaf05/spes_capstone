import { Student } from "../../types/Students";

export const generateFeedback = (num: number) => {
  return null;
};

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
