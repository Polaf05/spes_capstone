import { Dispatch, SetStateAction } from "react";

//TASK DATA, BOTH WRITTEN AND PERFORMANCE
export type TaskData = {
  tasked_number: number;
  score: number;
  highest_possible_score: number;
  passing_score: number;
  status: string;
  ranking: number;
};

export type scoreData = {
  score: number;
  highest_possible_score: number;
  ranking: number;
};

export type StruggledStudent = {
  student: Student;
  failedTasks: {
    pt: number[];
    ww: number[];
  };
  passedTasks: {
    pt: {
      passed: number[];
      perfect: number[];
    };
    ww: {
      passed: number[];
      perfect: number[];
    };
  };

  pt_length: number;
  ww_length: number;
  //noDataTasks: number[];
};

export type TaskAnalysis = {
  fluctuation: number;
  trend: number[];
  consistency: number[];
  plunge_task: number[];
  surge_task: number[];
};

export interface Student {
  id: number;
  name: string;
  gender: string;
  quarter: Quarter[];
  quarter_analysis: TaskAnalysis;
  final_grade_before: number;
  final_grade_after: number;
  final_remarks: string;
  remarks: string;
  survey_result: SurveyResult;
  inference_result: DataInference;
  ranking: number | null;
}

export interface DataSet {
  label: string;
  data: any[];
  fill: true;
  backgroundColor: string;
  borderColor: string;
}

export interface Quarter {
  id: number;
  grade_before: number;
  grade_after: number;
  remarks: string;
  diff: number;
  written_works: TaskData[];
  performance_tasks: TaskData[];
  written_percentage: scoreData;
  written_weighted_score: scoreData;
  performance_percentage: scoreData;
  performance_weighted_score: scoreData;
  written_tasks_analysis: TaskAnalysis;
  performace_tasks_analysis: TaskAnalysis;
  ranking: number | null;
}

export type Classroom = {
  students: Student[] | null;
  setStudents: Dispatch<SetStateAction<Student[] | null>>;
};

export type TestStudent = {
  name: string;
  before: number;
  diff: number;
  after: number;
  remarks: string;
};

export interface ScoreTotal {
  written_works: TaskData[];
  performance_work: TaskData[];
  written_percentage: number;
  written_weighted_score: number;
  performance_percentage: number;
  performance_weighted_score: number;
}

export interface SurveyResult {
  email: string;
  mobile: string;
  name: string;
  gender: string;
  grade: string;
  school: string;
  learning_type: string;
  learning_difficulty: string;
  effectivity_implementation: InferenceDetails;
  learning_performance_similarities: InferenceDetails;
  environment_factors: EnvironmentFactors;
  wifi: InferenceDetails;
  data: InferenceDetails;
  device: InferenceDetails;
  tech_difficulty: number;
  platform: string;
  accessible_usage: number;
}

export type EnvironmentFactors = {
  unwanted_noise: string;
  limited_space: string;
  household_chorse: string;
  comfortability: string;
  support: string;
  internet: string;
  device: string;
  faculty_readiness: string;
  value: number[];
};

export interface DataInference {
  experience: InferenceDetails;
  internet: InferenceDetails;
  resource: InferenceDetails;
  accessibility: InferenceDetails;
  technological: InferenceDetails;
  environment: InferenceDetails;
  external_elements: InferenceDetails;
}

export type InferenceDetails = {
  value: number;
  linguistic: string;
};
