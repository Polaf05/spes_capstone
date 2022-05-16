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
}

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
