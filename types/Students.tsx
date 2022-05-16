import { Dispatch, SetStateAction } from "react";

export interface WrittenTask {
  tasked_number: number
  score: number[];
  task_data: TaskData | null;
};

export interface PerformanceTask {
  tasked_number: number;
  score: number[];
  percentage: number[];
  weighted_score: number[];
  task_data: TaskData | null;
};

export interface TaskData {
  fluctuation: number;
  trend: number[];
  consistency: number;
  passed: boolean;
  questionable: boolean;
}

export interface Student {
  id: number;
  name: string;
  gender: string;
  grade_before: number;
  grade_after: number;
  remarks: string;
  diff: number;
  written_works: WrittenTask[] | null;
  performance_tasks: PerformanceTask[] | null;
  written_percentage: number[];
  written_weighted_score: number[];
  performance_percentage: number[];
  performance_weighted_score: number[];
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
  written_works: WrittenTask | null;
  performance_work: PerformanceTask | null;
  written_percentage: number[];
  written_weighted_score: number[];
  performance_percentage: number[];
  performance_weighted_score: number[];
}
