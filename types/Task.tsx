import { Student } from "./Students";

export type Score = {
  score: number;
  hp_score: number;
  score_pct: number;
};
export interface TaskScores {
  written_works: { scores: Score[]; ave_score_pct: number };
  performance_tasks: { scores: Score[]; ave_score_pct: number };
}

export interface Remarks {
  very_good: Student[];
  good: Student[];
  average: Student[];
  poor: Student[];
  very_poor: Student[];
}

export type Dataset = {
  set_a: number[];
  set_b: number[];
};
