import { Dispatch, SetStateAction } from "react";

export type WrittenWorks = {
  passed_tasks: string;
  score: number[];
  task_data: TaskData;
};

export type PerformanceTasks = {
  passed_tasks: string;
  score: number[];
  task_data: TaskData;
};

export interface TaskData {
  fluctuation: number;
  trend: number[];
  consistency: number;
}

export interface Student {
  id: number;
  name: string;
  grade_before: number;
  grade_after: number;
  remarks: string;
  diff: number;
  written_works: WrittenWorks[] | null;
  performance_tasks: PerformanceTasks[] | null;
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
