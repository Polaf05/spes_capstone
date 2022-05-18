import { type } from "os";
import { Dispatch, SetStateAction } from "react";

//TASK DATA, BOTH WRITTEN AND PERFORMANCE
export type TaskData = {
  tasked_number: number;
  score: number;
};

export type TaskAnalysis = {
  fluctuation: number;
  trend: number[];
  consistency: number;
  passed: number;
  questionable: number[];
};

export interface Student {
  id: number;
  name: string;
  gender: string;
  grade_before: number;
  grade_after: number;
  remarks: string;
  diff: number;
  written_works: TaskData[] | null;
  performance_tasks: TaskData[] | null;
  written_percentage: number[];
  written_weighted_score: number[];
  performance_percentage: number[];
  performance_weighted_score: number[];
  written_tasks_analysis: TaskAnalysis | null;
  performace_tasks_analysis: TaskAnalysis | null;
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
  tech_difficulty: InferenceDetails;
  platform: string;
  accessible_usage: InferenceDetails;
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
};

export interface DataInference {
  internet: InferenceDetails;
  resource: InferenceDetails;
  accessibility: InferenceDetails;
  technological: InferenceDetails;
  environment: InferenceDetails;
  external_elements: InferenceDetails;
}

export type InferenceDetails = {
  value: number;
  linguestic: string;
};
