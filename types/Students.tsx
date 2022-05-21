import { type } from "os";
import { Dispatch, SetStateAction } from "react";

//TASK DATA, BOTH WRITTEN AND PERFORMANCE
export type TaskData = {
  tasked_number: number;
  score: number;
  highest_posible_score: number;
  passing_score: number;
};

export type scoreData = {
  score: number;
  highest_posible_score: number;
};

export type TaskAnalysis = {
  fluctuation: number;
  trend: number[];
  consistency: number[];
  passed: number[];
  plunge_task: number[];
  surge_task: number[];
};

export interface Student {
  id: number;
  name: string;
  gender: string;
  quarter: Quarter[] | null;
  final_grade: number;
  remarks: string;
  survey_result: SurveyResult | null;
  inference_result: DataInference | null;
  ranking: number | null;
}

export interface Quarter {
  id: number;
  grade_before: number;
  grade_after: number;
  remarks: string;
  diff: number;
  written_works: TaskData[] | null;
  performance_tasks: TaskData[] | null;
  written_percentage: scoreData | null;
  written_weighted_score: scoreData | null;
  performance_percentage: scoreData | null;
  performance_weighted_score: scoreData | null;
  written_tasks_analysis: TaskAnalysis | null;
  performace_tasks_analysis: TaskAnalysis | null;
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
  written_works: TaskData[] | null;
  performance_work: TaskData[] | null;
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
