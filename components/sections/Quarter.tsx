import Image from "next/image";
import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import { GetServerSideProps } from "next";
import { Bar, Line, Radar } from "react-chartjs-2";
import { StarIcon } from "@heroicons/react/solid";
import { CheckIcon, XIcon } from "@heroicons/react/outline";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { tasks } from "googleapis/build/src/apis/tasks";
import { Router, useRouter } from "next/router";
import { type } from "os";
import { useClassroom } from "../../hooks/useSetClassroom";
import { useSelectedStudent } from "../../hooks/useSelectedStudent";
import { formatArray } from "../../lib/functions/formatting";
import BarChart from "../BarChart";
import CardInfo from "../CardInfo";
import { classNames } from "../../lib/functions/concat";
import CircularProgress from "../CircularProgress";
import { DataSet } from "../../types/Students";

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
);

// methods
const capitalize = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

const getIndexOfMaxNumber = (arr: any[]) => arr.indexOf(Math.max(...arr));
const getIndexOfMinNumber = (arr: any[]) => arr.indexOf(Math.min(...arr));
const addOrdinal = (n: number) =>
  `${n}${[, "st", "nd", "rd"][(n % 100 >> 3) ^ 1 && n % 10] || "th"}`;
const generateFeedback = (option: any, diff: any) => {
  switch (option) {
    case "better at":
      return diff > 2
        ? ` better at Performance Tasks with a margin of (+${diff}).`
        : diff > 0
        ? ` slightly better at Performance Tasks with a margin of (+${diff}).`
        : diff === 0
        ? ` good at both Written Works and Performance Tasks with a margin of (+${diff}).`
        : diff > -1
        ? ` slightly better at Written Works with a margin of (+${diff})`
        : ` better at Written Tasks with a margin of (+${diff * -1})`;
    default:
      return null;
  }
};
const getTask = (option: any, arr: number[]) => {
  switch (option) {
    case "best":
      return getIndexOfMaxNumber(arr);
    default:
      return null;
  }
};

const StudentInfo = ({ quarter, id }: { quarter: number; id: string }) => {
  const { students } = useClassroom();
  const { student, setStudent } = useSelectedStudent();
  const router = useRouter();
  let myquar: string[] = [];

  //set quarter page to render
  const [quar, setQuar] = useState<number>(quarter - 1);
  let ww_available_scores = [];
  let pt_available_scores = [];
  if (!students || !student) {
    //TO FIX: ROUTE BACK USER
  } else {
    let qSum: any = 0;
    students![0].quarter?.map((quarter) => {
      qSum += quarter.written_works?.length! > 0 ? 1 : 0;
    });

    var buttons: string[] = [];
    for (var i = 1; i <= qSum; i++) {
      buttons.push("Quarter " + i);
      const ww_grade = student?.quarter![i - 1].written_percentage?.score;
      const pt_grade = student?.quarter![i - 1].performance_percentage?.score;

      ww_available_scores.push(typeof ww_grade === "string" ? 0 : ww_grade);
      pt_available_scores.push(typeof pt_grade === "string" ? 0 : pt_grade);
    }
    myquar = buttons;
  }
  //set data of student for the quarter
  const [myStudent, setMyStudent] = useState(student?.quarter![quarter - 1]!);

  //set quarter data
  const quarter_grades = {
    written_works:
      // grade pct
      ww_available_scores,
    performance_tasks:
      //grade pct
      pt_available_scores,
  };

  // get best quarter - written works
  const ww_best_quarter = addOrdinal(
    getIndexOfMaxNumber(quarter_grades.written_works) + 1
  );
  // get best quarter - performance tasks
  const pt_best_quarter = addOrdinal(
    getIndexOfMaxNumber(quarter_grades.performance_tasks) + 1
  );
  // get underperformed quarter - written works

  const ww_underperformed_quarter = addOrdinal(
    getIndexOfMinNumber(quarter_grades.written_works) + 1
  );
  // get underperformed quarter - performance tasks
  const pt_underperformed_quarter = addOrdinal(
    getIndexOfMinNumber(quarter_grades.performance_tasks) + 1
  );

  //get all quarter grades and average rank
  const quarter_data: number[] = [];
  let sum = 0,
    ww_qsum = 0,
    pt_qsum = 0,
    ww_sum: number[] = [],
    hps_ww: number[] = [],
    pt_sum: number[] = [],
    hps_pt: number[] = [];

  //get average grade per quarter
  const ave_quarter_grade = [0, 0, 0, 0];
  for (let i = 0; i < myquar.length; i++) {
    let sum: number = 0;
    students?.map((student, idx) => {
      sum += student!.quarter![i].grade_before;
    });
    const ave = Number((sum / students?.length!).toFixed(1));
    ave_quarter_grade[i] = ave;
  }

  for (let i = 0; i < myquar.length; i++) {
    //console.log(student?.quarter![i].grade_before!);
    quarter_data.push(student?.quarter![i].grade_before!);
    sum += student?.quarter![i].ranking!;
    let scr = 0;
    //console.log(student?.quarter![i].written_percentage?.score!);

    //get sum of Weighted Score
    if (typeof student?.quarter![i].written_percentage?.score! !== "string") {
      let scr = student?.quarter![i].written_percentage?.score!;
      ww_qsum += scr;
    }
    if (
      typeof student?.quarter![i].performance_percentage?.score! !== "string"
    ) {
      let scr = student?.quarter![i].performance_percentage?.score!;
      pt_qsum += scr;
    }

    let w = 0,
      hw = 0,
      hp = 0,
      p = 0;
    student?.quarter![i].written_works?.map((task) => {
      if (task.score != undefined) w += task.score;
      hw += task.highest_possible_score;
    });
    student?.quarter![i].performance_tasks?.map((task) => {
      if (task.score != undefined) p += task.score;
      hp += task.highest_possible_score;
    });

    //score / total score
    ww_sum.push(w);
    hps_ww.push(hw);
    pt_sum.push(p);
    hps_pt.push(hp);
  }

  const ww_labels: string[] = [];
  const ww_status: string[] = [];
  const pt_labels: string[] = [];
  const pt_status: string[] = [];

  // get all passed scores
  interface TaskDataScores {
    ww: {
      raw_scores: {
        score: any[];
        pct: any[];
        hp: any[];
        total: any[];
        task: any[];
        status: any[];
      };
      scores: number[];
      hp_scores: number[];
      scores_pct: number[];
      score_sum: number;
      total_item: number;
      passed: number;
      total: number;
      percentage: number;
    };
    pt: {
      raw_scores: {
        score: any[];
        pct: any[];
        hp: any[];
        total: any[];
        task: any[];
        status: any[];
      };
      scores: number[];
      hp_scores: number[];
      scores_pct: number[];
      score_sum: number;
      total_item: number;
      passed: number;
      total: number;
      percentage: number;
    };
    better_at: string;
    underperformed_tasks: any[];
  }
  // get task data
  let tdata: TaskDataScores = {
    ww: {
      raw_scores: {
        score: [],
        pct: [],
        hp: [],
        total: [],
        task: [],
        status: [],
      },
      scores: [],
      hp_scores: [],
      scores_pct: [],
      score_sum: ww_sum[quar],
      total_item: hps_ww[quar],
      passed: 0,
      total: myStudent.written_works?.length!,
      percentage: 0,
    },
    pt: {
      raw_scores: {
        score: [],
        pct: [],
        hp: [],
        total: [],
        task: [],
        status: [],
      },
      scores: [],
      hp_scores: [],
      scores_pct: [],
      score_sum: pt_sum[quar],
      total_item: hps_pt[quar],
      passed: 0,
      total: myStudent.performance_tasks?.length!,
      percentage: 0,
    },
    better_at: "",
    underperformed_tasks: [],
  };

  myStudent.written_works?.forEach((task) => {
    const task_label = "Task " + task.tasked_number.toString();
    ww_labels.push(task_label);
    ww_status.push(task.status);
    const score = task.score;
    if (score != undefined) {
      tdata.ww.scores.push(score);
      tdata.ww.hp_scores.push(task.highest_possible_score);
      const pct = (score / task.highest_possible_score) * 100;
      tdata.ww.scores_pct.push(pct);
      tdata.ww.raw_scores.score.push(score);
      tdata.ww.raw_scores.pct.push(pct);
      tdata.ww.raw_scores.total.push(task.highest_possible_score);
      tdata.ww.raw_scores.status.push(task.status);
      tdata.ww.raw_scores.task.push("Written Work " + task.tasked_number);
    } else {
      tdata.ww.raw_scores.score.push(-1);
      tdata.ww.raw_scores.pct.push(-1);
    }

    tdata.ww.raw_scores.hp.push(task.highest_possible_score);
    tdata.ww.passed += task.status.match(/Passed|Perfect/g) ? 1 : 0;
  });
  myStudent.performance_tasks?.forEach((task) => {
    const task_label = "Task " + task.tasked_number.toString();
    pt_labels.push(task_label);
    pt_status.push(task.status);
    const score = task.score;
    if (score != undefined) {
      tdata.pt.scores.push(score);
      tdata.pt.hp_scores.push(task.highest_possible_score);
      const pct = (score / task.highest_possible_score) * 100;

      tdata.pt.raw_scores.score.push(score);
      tdata.pt.scores_pct.push(pct);
      tdata.pt.raw_scores.pct.push(pct);
      tdata.pt.raw_scores.total.push(task.highest_possible_score);
      tdata.pt.raw_scores.status.push(task.status);
      tdata.pt.raw_scores.task.push("Performance Task " + task.tasked_number);
    } else {
      tdata.pt.raw_scores.score.push(-1);
      tdata.pt.raw_scores.pct.push(-1);
    }
    tdata.pt.raw_scores.hp.push(task.highest_possible_score);
    tdata.pt.passed += task.status.match(/Passed|Perfect/g) ? 1 : 0;
  });

  let qSum: any = 0;
  students![0].quarter?.map((quarter) => {
    qSum +=
      quarter.written_works?.length! > 0 ||
      quarter.performance_tasks?.length! > 0
        ? 1
        : 0;
  });

  //set underperformed tasks
  tdata.ww.raw_scores.status.map((task, idx) => {
    const _score = tdata.ww.raw_scores.score[idx];
    const _total = tdata.ww.raw_scores.total[idx];
    const _task = tdata.ww.raw_scores.task[idx];
    const _status = task;
    if (task.match(/Failed|Considerable|Zero/g))
      tdata.underperformed_tasks.push([_score, _total, _task, _status]);
  });
  tdata.pt.raw_scores.status.map((task, idx) => {
    const _score = tdata.pt.raw_scores.score[idx];
    const _total = tdata.pt.raw_scores.total[idx];
    const _task = tdata.pt.raw_scores.task[idx];
    const _status = task;
    if (task.match(/Failed|Considerable|Zero/g))
      tdata.underperformed_tasks.push([_score, _total, _task, _status]);
  });

  //surpassed students
  const ww_ranks: number[] = [];
  const pt_ranks: number[] = [];
  //initialize ranks
  students?.map((s) => {
    ww_ranks.push(0);
    pt_ranks.push(0);
  });
  students?.map((s) => {
    const ww_index = Math.trunc(
      s.quarter![quarter - 1].written_percentage?.ranking!
    );
    const pt_index = Math.trunc(
      s.quarter![quarter - 1].performance_percentage?.ranking!
    );

    ww_ranks[ww_index - 1] += 1;
    pt_ranks[pt_index - 1] += 1;
  });

  //student rank
  const my_ranking = Math.trunc(myStudent.written_percentage?.ranking!);
  //sum of surpassed
  let ww_surp_sum = 0;
  let pt_surp_sum = 0;

  for (let i = my_ranking; i < students?.length!; i++) {
    ww_surp_sum += ww_ranks[i];
    pt_surp_sum += pt_ranks[i];
  }
  const ww_pct = Number(((ww_surp_sum / students?.length!) * 100).toFixed(1));
  const pt_pct = Number(((pt_surp_sum / students?.length!) * 100).toFixed(1));
  // get weighted omsim of a written works and performance task
  const wgh_ww = myStudent.written_weighted_score?.highest_possible_score;
  const wgh_pt = myStudent.performance_weighted_score?.highest_possible_score;

  // get best written task accomplished
  let ww_best_task: number | null = getTask("best", tdata.ww.raw_scores.pct);
  //get best performance task accomplished
  let pt_best_task: number | null = getTask("best", tdata.pt.raw_scores.pct);

  // calculate task percentage
  tdata.ww.percentage = Number(
    ((tdata.ww.score_sum / tdata.ww.total_item) * 100).toFixed(1)
  );
  tdata.pt.percentage = Number(
    ((tdata.pt.score_sum / tdata.pt.total_item) * 100).toFixed(1)
  );

  // generate feedback
  const tdiff = tdata.pt.percentage - tdata.ww.percentage;
  const feedback: string | null = generateFeedback(
    "better at",
    Number(tdiff.toFixed(1))
  );
  const ave_rank: string = (sum / qSum).toFixed(2);
  const ave_ww_pct: number = Number((ww_qsum / qSum).toFixed(1));
  const ave_pt_pct: number = Number((pt_qsum / qSum).toFixed(1));
  let better_at: string = "";
  let better: string = "";
  let better_score: number = 0;
  let lower_score: number = 0;
  let flag = "both";
  let margin: number = 0;
  if (ave_pt_pct === ave_ww_pct) {
    better_at = "good with both Written Works and Performance Tasks";
    better = "Both";
  } else if (ave_pt_pct > ave_ww_pct) {
    better_at = "better in Performance Tasks";
    better = "Performance Tasks";
    better_score = ave_pt_pct;
    lower_score = ave_ww_pct;
    flag = "pt";
    margin = ave_pt_pct - ave_ww_pct;
  } else {
    better_at = "better in Written Works";
    better = "Written Works";
    better_score = ave_ww_pct;
    lower_score = ave_pt_pct;
    flag = "ww";
    margin = ave_ww_pct - ave_pt_pct;
  }

  margin = Number(margin.toFixed(1));

  const getOverallFeedback = () => {
    let overall_feedback: string[] = [];

    if (
      student?.final_grade_before! >= 83 &&
      student?.inference_result?.external_elements.value! >= 0.5
    ) {
      overall_feedback.push(
        `Student performed ${student?.remarks} in ${
          student?.gender == "MALE" ? "his" : "her"
        } studies because ${
          student?.gender == "MALE" ? "his" : "her"
        } external factors is ${
          student?.inference_result?.external_elements.linguistic
        }.`
      );
    } else if (
      student?.final_grade_before! < 83 &&
      student?.inference_result?.external_elements.value! >= 0.5
    ) {
      overall_feedback.push(
        `Student performed ${student?.remarks} in ${
          student?.gender == "MALE" ? "his" : "her"
        } studies even though ${
          student?.gender == "MALE" ? "his" : "her"
        } external factors is ${
          student?.inference_result?.external_elements.linguistic
        }.`
      );
    } else if (
      student?.final_grade_before! >= 83 &&
      student?.inference_result?.external_elements.value! < 0.5
    ) {
      overall_feedback.push(
        `Student performed ${student?.remarks} in ${
          student?.gender == "MALE" ? "his" : "her"
        } studies even though ${
          student?.gender == "MALE" ? "his" : "her"
        } external factors is ${
          student?.inference_result?.external_elements.linguistic
        }.`
      );
    } else if (
      student?.final_grade_before! < 83 &&
      student?.inference_result?.external_elements.value! < 0.5
    ) {
      overall_feedback.push(
        `Student performed ${student?.remarks} in ${
          student?.gender == "MALE" ? "his" : "her"
        } studies because ${
          student?.gender == "MALE" ? "his" : "her"
        } external factors is ${
          student?.inference_result?.external_elements.linguistic
        }.`
      );
    }

    if (
      student?.quarter_analysis.fluctuation! > 3 ||
      student?.quarter_analysis.fluctuation! < -3
    ) {
      overall_feedback.push(
        `Students grade is not consistent and has a high fluctuation rate.`
      );
    } else if (student?.quarter_analysis.fluctuation! == 0) {
      overall_feedback.push(
        `Students grade is consistent and doesn’t fluctuate.`
      );
    } else if (
      (student?.quarter_analysis.fluctuation! > 0 &&
        student?.quarter_analysis.fluctuation! <= 3) ||
      (student?.quarter_analysis.fluctuation! < 0 &&
        student?.quarter_analysis.fluctuation! >= 3)
    ) {
      overall_feedback.push(
        `Student grade is almost consistent, and his fluctuation rate is low.`
      );
    }

    if (
      student?.quarter_analysis.plunge_task.length! > 0 &&
      student?.quarter_analysis.surge_task.length! > 0
    ) {
      overall_feedback.push(
        `${
          student?.gender == "MALE" ? "His" : "Her"
        } grades suddenly plunged in ${
          student?.quarter_analysis.plunge_task.length! > 1
            ? "quarters"
            : " quarter"
        } ${formatArray(
          student?.quarter_analysis.plunge_task
        )} while it surged  in ${
          student?.quarter_analysis.surge_task.length! > 1
            ? "quarters"
            : "quarter"
        }  ${formatArray(student?.quarter_analysis.surge_task)}.`
      );
    } else if (
      student?.quarter_analysis.plunge_task.length! > 0 &&
      student?.quarter_analysis.surge_task.length! == 0
    ) {
      overall_feedback.push(
        `${
          student?.gender == "MALE" ? "His" : "Her"
        } grades suddenly plunged in ${
          student?.quarter_analysis.plunge_task.length! > 1
            ? "quarters"
            : "quarter"
        } ${formatArray(student?.quarter_analysis.plunge_task)}.`
      );
    }
    if (
      student?.quarter_analysis.plunge_task.length! == 0 &&
      student?.quarter_analysis.surge_task.length! > 0
    ) {
      overall_feedback.push(
        `${
          student?.gender == "MALE" ? "His" : "Her"
        } grades suddenly surged  in ${
          student?.quarter_analysis.surge_task.length! > 1
            ? "quarters"
            : "quarter"
        }  ${formatArray(student?.quarter_analysis.surge_task)}.`
      );
    }

    // else if (
    //   student?.quarter_analysis.plunge_task.length! == 0 &&
    //   student?.quarter_analysis.surge_task.length! == 0
    // ) {
    //   overall_feedback.push(
    //     `${
    //       student?.gender == "MALE" ? "he" : "she"
    //     } grades suddenly plunge in ${student?.quarter_analysis.plunge_task.join()}`
    //   );
    // }

    if (margin == 0 && ave_pt_pct >= 83 && ave_ww_pct >= 83) {
      overall_feedback.push(
        "Student both performs better in Performance Tasks and Written Works"
      );
    } else if (margin <= 3 && ave_pt_pct >= 83 && ave_ww_pct >= 83) {
      overall_feedback.push(
        `Student performs slightly better in ${better} with a margin of (${margin})`
      );
    } else if (margin > 3 && better_score >= 78) {
      overall_feedback.push(
        `Student performs better in ${better} with a margin of (${margin})`
      );
    } else if (margin > 3 && ave_pt_pct >= 78 && ave_ww_pct >= 83) {
      overall_feedback.push(
        `Student performs better in ${better} with a margin of (${margin})`
      );
    } else if (margin > 3 && better_score >= 78 && lower_score < 75) {
      overall_feedback.push(
        `Student performs better in ${better}however student needs attention in variable 2 since ${
          student?.gender == "MALE" ? "his" : "her"
        } performance is very poor `
      );
    } else if (better_score <= 77) {
      overall_feedback.push(
        `Student need attention in both Performance Tasks and Written Works because ${
          student?.gender == "MALE" ? "he" : "she"
        } performed poorly `
      );
    }

    return overall_feedback.join(" ");
  };

  const performanceAnalysis = (i: number) => {
    let quarter: string[] = [];

    if (
      student?.quarter![i].written_tasks_analysis?.fluctuation == 0 &&
      student?.quarter![i].performace_tasks_analysis?.fluctuation == 0
    ) {
      quarter.push(
        `The students written works and performance task is consistent in this quarter.`
      );
    } else if (
      student?.quarter![i].written_tasks_analysis?.fluctuation == 0 &&
      student?.quarter![i].performace_tasks_analysis?.fluctuation! > 3
    ) {
      quarter.push(
        `The student’s written works is consistent while ${
          student?.gender == "MALE" ? "his" : "her"
        } performance task is inconsistent in this quarter.`
      );
    } else if (
      student?.quarter![i].written_tasks_analysis?.fluctuation! > 3 &&
      student?.quarter![i].performace_tasks_analysis?.fluctuation! == 0
    ) {
      quarter.push(
        `The student’s written works is inconsistent while ${
          student?.gender == "MALE" ? "his" : "her"
        } performance task is consistent in this quarter.`
      );
    } else if (
      student?.quarter![i].written_tasks_analysis?.fluctuation! > 3 &&
      student?.quarter![i].performace_tasks_analysis?.fluctuation! == 0
    ) {
      quarter.push(
        `The student’s written works is inconsistent while ${
          student?.gender == "MALE" ? "his" : "her"
        } performance task is consistent in this quarter.`
      );
    } else if (
      student?.quarter![i].written_tasks_analysis?.fluctuation! > 0 &&
      student?.quarter![i].written_tasks_analysis?.fluctuation! <= 3 &&
      student?.quarter![i].performace_tasks_analysis?.fluctuation! == 0
    ) {
      quarter.push(
        `The student’s written work is slightly consistent while ${
          student?.gender == "MALE" ? "his" : "her"
        } performance task is consistent in this quarter.`
      );
    } else if (
      student?.quarter![i].written_tasks_analysis?.fluctuation! > 0 &&
      student?.quarter![i].written_tasks_analysis?.fluctuation! <= 3 &&
      student?.quarter![i].performace_tasks_analysis?.fluctuation! > 0 &&
      student?.quarter![i].performace_tasks_analysis?.fluctuation! <= 3
    ) {
      quarter.push(
        `The students written work and performance task are both slightly consistent in this quarter.`
      );
    } else if (
      student?.quarter![i].written_tasks_analysis?.fluctuation! == 0 &&
      student?.quarter![i].performace_tasks_analysis?.fluctuation! > 0 &&
      student?.quarter![i].performace_tasks_analysis?.fluctuation! <= 3
    ) {
      quarter.push(
        `The student’s written work is consistent while ${
          student?.gender == "MALE" ? "his" : "her"
        } performance task is slightly consistent in this quarter.`
      );
    } else if (
      student?.quarter![i].written_tasks_analysis?.fluctuation! > 0 &&
      student?.quarter![i].written_tasks_analysis?.fluctuation! <= 3 &&
      student?.quarter![i].performace_tasks_analysis?.fluctuation! > 0 &&
      student?.quarter![i].performace_tasks_analysis?.fluctuation! <= 3
    ) {
      quarter.push(
        `The student’s written work is consistent while ${
          student?.gender == "MALE" ? "his" : "her"
        } performance task is slightly consistent in this quarter.`
      );
    } else if (
      student?.quarter![i].written_tasks_analysis?.fluctuation! > 0 &&
      student?.quarter![i].written_tasks_analysis?.fluctuation! <= 3 &&
      student?.quarter![i].performace_tasks_analysis?.fluctuation! > 0 &&
      student?.quarter![i].performace_tasks_analysis?.fluctuation! <= 3
    ) {
      quarter.push(
        `The students written work and performance task are both slightly consistent in this quarter.`
      );
    } else if (
      student?.quarter![i].written_tasks_analysis?.fluctuation! > 0 &&
      student?.quarter![i].performace_tasks_analysis?.fluctuation! > 0 &&
      student?.quarter![i].performace_tasks_analysis?.fluctuation! <= 3
    ) {
      quarter.push(
        `The student’s written work is not consistent while ${
          student?.gender == "MALE" ? "his" : "her"
        } performance task is slightly consistent in this quarter.`
      );
    } else if (
      student?.quarter![i].written_tasks_analysis?.fluctuation! > 0 &&
      student?.quarter![i].written_tasks_analysis?.fluctuation! <= 3 &&
      student?.quarter![i].performace_tasks_analysis?.fluctuation! == 0
    ) {
      quarter.push(
        `The student’s written work is slightly consistent while ${
          student?.gender == "MALE" ? "his" : "her"
        } performance task is not consistent in this quarter.`
      );
    } else if (
      student?.quarter![i].written_tasks_analysis?.fluctuation! > 0 &&
      student?.quarter![i].performace_tasks_analysis?.fluctuation! > 0
    ) {
      quarter.push(
        `The students written works and performance task is not consistent in this quarter.`
      );
    }

    return quarter.join(" ");
  };

  const quarter_dataset: DataSet[] = [
    {
      label: "Grade",
      data: quarter_data,
      fill: true,
      backgroundColor: "#FFF598",
      borderColor: "#FFF598",
    },
    {
      label: "Average Student Grade",
      data: ave_quarter_grade,
      fill: true,
      backgroundColor: "#63C7FF",
      borderColor: "#63C7FF",
    },
  ];

  let diffArrow, stud_id: number;
  if (student) {
    diffArrow =
      myStudent.diff > 0 ? "up" : myStudent.diff === 0 ? "neutral" : "down";
  }
  const dataToRender: DataSet[] = [
    {
      label: "Written Works",
      data: tdata.ww.raw_scores.pct,
      fill: true,
      backgroundColor: "rgba(75,192,192,0)",
      borderColor: "#FFF598",
    },
    {
      label: "Performance Task",
      data: tdata.pt.raw_scores.pct,
      fill: true,
      backgroundColor: "rgba(128,0,128, 0)",
      borderColor: "#63C7FF",
    },
  ];

  const length: number =
    student?.survey_result?.environment_factors.value.length!;

  let fsum = 0;
  student?.survey_result?.environment_factors.value.map((val) => {
    fsum += val;
  });
  const ave_env_fuzzy = Number((fsum / length).toFixed(1));
  const radarData = [
    {
      label: "Degree of Truth",
      data: student?.survey_result?.environment_factors.value,
      fill: true,
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgb(54, 162, 235)",
    },
  ];

  const wworks: string[] = ww_status;
  const ptasks: string[] = pt_status;

  let count_nd = [0, 0];
  for (let i = wworks.length; i < 10; i++) {
    wworks.push("no data");
    count_nd[0] += 1;
  }
  for (let i = ptasks.length; i < 10; i++) {
    ptasks.push("no data");
    count_nd[1] += 1;
  }

  let no_data_found = [false, false];
  if (count_nd[0] === myStudent.written_works?.length!) no_data_found[0] = true;

  if (count_nd[1] === myStudent.performance_tasks?.length!)
    no_data_found[1] = true;
  const percentage: number = 0;

  return (
    <>
      {/* Header */}
      <div className="mx-12 py-2 h-[10vh]">
        <div className="w-20 h-20 p-1">
          <Image src="/logo.png" alt="logo picture" width={100} height={100} />
        </div>
      </div>
      <div className="mx-12 mt-10 mb-4 grid grid-cols-3">
        <div className="col-span-2">
          <h1 className=" text-xl">Student Evaluation</h1>
          <h1 className="font-bold font-poppins text-4xl">{student?.name}</h1>
          <h6>{student?.gender}</h6>
        </div>
        <div className="flex justify-end place-content-center">
          <h1 className="font-bold text-tallano_gold-300 text-3xl">
            {student?.remarks}
          </h1>
        </div>
      </div>
      {/* General Section */}
      <div className="bg-ocean-100 h-[110vh] flex flex-col justify-between">
        <div className="mx-12 py-8">
          <h3 className="text-justify mb-4">{getOverallFeedback()}</h3>
          <h2 className="font-bold text-2xl">
            Final Grade: {student?.final_grade_after}
          </h2>
          {/* Bar Chart */}
          <div className="grid grid-cols-9 h-fit gap-4">
            <div className="col-span-5 bg-neutral-50 p-4 rounded-xl">
              <BarChart
                display={true}
                indexAxis="x"
                labels={myquar}
                datasets={quarter_dataset}
              />
              <div className="border-t mt-3 text-sm text-neutral-500">
                <div className="flex gap-2">
                  <p>
                    Fluctuation:{" "}
                    {student?.quarter_analysis.fluctuation.toFixed(1)}
                  </p>
                  {student?.quarter_analysis.plunge_task.length! > 0 && (
                    <p>
                      Plunged:{" "}
                      {student?.quarter_analysis.plunge_task.join(", ")}
                    </p>
                  )}
                  {student?.quarter_analysis.surge_task.length! > 0 && (
                    <p>
                      Surged: {student?.quarter_analysis.surge_task.join(", ")}
                    </p>
                  )}
                </div>
              </div>
            </div>
            {/* Overall Performance Assessment */}
            <div className="col-span-4 h-[65vh] overflow-x-auto px-3">
              <h2 className="text-xl font-bold">Overall Performance:</h2>
              <div className="grid grid-cols-10 mb-4">
                <CardInfo
                  className={classNames(
                    "w-full h-fit px-4 py-2 bg-tallano_gold-100 rounded-l-xl",
                    flag === "both"
                      ? "col-span-5"
                      : flag === "ww"
                      ? "col-span-6"
                      : "col-span-4"
                  )}
                  title={"Written Works"}
                  value={ave_ww_pct}
                >
                  <div className="font-light text-[0.8rem]">
                    <h5 className="flex justify-between">
                      Quarter with highest grade:
                      <span className="font-semibold">{ww_best_quarter}</span>
                    </h5>
                    <h5 className="flex justify-between">
                      Quarter with lowest grade:
                      <span className="font-semibold">
                        {ww_underperformed_quarter}
                      </span>
                    </h5>
                  </div>
                </CardInfo>
                <CardInfo
                  className={classNames(
                    "w-full h-fit px-4 py-2 bg-white rounded-r-xl",
                    flag === "both"
                      ? "col-span-5"
                      : flag === "pt"
                      ? "col-span-6"
                      : "col-span-4"
                  )}
                  title={"Performance Tasks"}
                  value={ave_pt_pct}
                >
                  <div className="text-[0.8rem]">
                    <h5 className="font-semibold">{pt_best_quarter}</h5>
                    <h5 className="font-semibold">
                      {pt_underperformed_quarter}
                    </h5>
                  </div>
                </CardInfo>
              </div>
              <div className="flex justify-center gap-4 h-40 mb-4">
                {student?.quarter?.map(
                  (quarter, idx) =>
                    idx < myquar.length && (
                      <div
                        className={classNames(
                          "w-28 h-full rounded-2xl border-4",
                          quarter.grade_before >= 75
                            ? "bg-green-100 border-green-300"
                            : "bg-red-100 border-red-300"
                        )}
                      >
                        <p className="font-bold text-[0.7rem] pt-1 px-2 italic">
                          Quarter {idx + 1}
                        </p>
                        <div className="w-full grid place-items-center">
                          <h2 className="font-bold text-2xl">
                            {quarter.grade_before}
                          </h2>
                          <h2 className="border-t-2 border-black font-semibold text-base">
                            Class Rank:
                          </h2>
                          <h2 className="font-bold text-xl">
                            {quarter.ranking}
                          </h2>
                        </div>
                      </div>
                    )
                )}
              </div>

              <div className="text-sm flex justify-between border-t border-neutral-300">
                <h6>
                  Performs {better_at} with a margin of (+{margin})
                </h6>

                <h6>
                  Average Rank: <span className="font-bold">{ave_rank}</span>
                </h6>
              </div>
            </div>
          </div>
        </div>
        {/* Toggle Quarter */}
        <div className="flex justify-end">
          {myquar.map((quarter, idx) => (
            <div
              key={idx}
              className={classNames(
                "px-12 pt-4 pb-1 text-xl rounded-t-xl",
                quar === idx ? "bg-white" : ""
              )}
            >
              <button
                onClick={() => {
                  setQuar(idx);
                  setMyStudent(student?.quarter![idx]!);
                }}
              >
                {myquar[idx]}
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Quarter Section */}
      <div className="min-h-[90vh]">
        <div className="mx-12 my-10">
          <div className="h-full">
            <div className="grid grid-cols-2">
              <div>
                <h1 className="font-bold text-2xl">Performance Analysis</h1>
                <h3 className="italic">{myquar[quar]} Evaluation</h3>
              </div>
              {/* Grade Component */}
              <div className="col-span-1 flex justify-end gap-4">
                <div className="flex flex-col place-content-center">
                  <h1 className="text-lg font-semibold">Quarter Grade:</h1>
                  <h3 className="text-base">
                    Suggested Grade:{" "}
                    <span className="font-bold">{myStudent.grade_after}</span>
                  </h3>
                  <div className="flex gap-3">
                    <h3>
                      Class Ranking:{" "}
                      <span className="font-bold">{myStudent.ranking}</span>
                    </h3>
                    {myStudent.ranking! <= 4 && (
                      <StarIcon className="h-5 text-tallano_gold-300" />
                    )}
                  </div>
                </div>
                <div className="grid place-content-center">
                  <div className="grid place-content-center w-28 h-28 rounded-full bg-tallano_gold-200">
                    <h1 className="font-bold text-3xl">
                      {myStudent.grade_before}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mx-4 py-6 h-fit">
              {/* Line Chart */}
              <div>
                <Line
                  data={{
                    labels:
                      ww_labels.length >= pt_labels.length
                        ? ww_labels
                        : pt_labels,
                    datasets: dataToRender,
                  }}
                  options={{
                    scales: {
                      y: { max: 100, min: 0, ticks: { stepSize: 20 } },
                    },
                    plugins: {
                      legend: {
                        display: true,
                      },
                    },
                  }}
                />
                <div className="border-t mt-3 text-sm text-neutral-500">
                  <div className="flex justify-between">
                    <div className="flex justify-center items-center gap-2">
                      <div className="bg-yellow-200 w-5 h-1"></div>

                      <p>
                        Fluctuation:{" "}
                        {myStudent.written_tasks_analysis?.fluctuation.toFixed(
                          1
                        )}
                      </p>

                      {myStudent.written_tasks_analysis?.plunge_task.length! >
                        0 && (
                        <p>
                          Plunged:{" "}
                          {myStudent.written_tasks_analysis?.plunge_task.join(
                            ", "
                          )}
                        </p>
                      )}
                      {myStudent.written_tasks_analysis?.surge_task.length! >
                        0 && (
                        <p>
                          Surged:{" "}
                          {myStudent.written_tasks_analysis?.surge_task.join(
                            ", "
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex justify-center items-center gap-2">
                      <div className="bg-ocean-200 w-5 h-1"></div>
                      <p>
                        Fluctuation:{" "}
                        {myStudent.performace_tasks_analysis?.fluctuation.toFixed(
                          1
                        )}
                      </p>

                      {myStudent.performace_tasks_analysis?.plunge_task
                        .length! > 0 && (
                        <p>
                          Plunged:{" "}
                          {myStudent.performace_tasks_analysis?.plunge_task.join(
                            ", "
                          )}
                        </p>
                      )}
                      {myStudent.performace_tasks_analysis?.surge_task.length! >
                        0 && (
                        <p>
                          Surged:{" "}
                          {myStudent.performace_tasks_analysis?.surge_task.join(
                            ", "
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* Line Chart Assessment */}
              <div className="h-[45vh] overflow-x-auto px-3">
                <h5 className="text-justify">Assessment:</h5>
              </div>
            </div>
            <div className="grid grid-cols-9 gap-4 mx-4 py-6 h-fit">
              <div className="col-span-4">
                {/* Top Performance Section */}
                <div className="">
                  <h3 className="text-xl font-bold">
                    {tdata.ww.raw_scores.score[ww_best_task!] != -1 &&
                    tdata.pt.raw_scores.score[pt_best_task!] != -1
                      ? "Top Performance"
                      : "No data available for student  "}
                  </h3>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {tdata.ww.raw_scores.score[ww_best_task!] != -1 && (
                      <div className=" h-24 bg-tallano_gold-100 py-2 rounded-3xl flex flex-col justify-between">
                        <h6 className="px-4 ">
                          Written Work {ww_best_task! + 1}:
                        </h6>
                        <div className="flex justify-end">
                          <h1 className="font-bold text-xl px-6">
                            {tdata.ww.raw_scores.score[ww_best_task!]} /{" "}
                            {tdata.ww.raw_scores.hp[ww_best_task!]}
                          </h1>
                        </div>
                      </div>
                    )}
                    {tdata.pt.raw_scores.score[pt_best_task!] != -1 && (
                      <div className=" h-24 bg-ocean-100 py-2 rounded-3xl flex flex-col justify-between">
                        <h6 className="px-4">
                          Performance Task {pt_best_task! + 1} :
                        </h6>
                        <div className="flex justify-end px-6">
                          <h1 className="font-bold text-xl">
                            {tdata.pt.raw_scores.score[pt_best_task!]} /{" "}
                            {tdata.pt.raw_scores.hp[pt_best_task!]}
                          </h1>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/* Tasks Streak */}
                <div className="mt-4">
                  <div className="border-b-2 pb-3">
                    <div className="flex justify-between">
                      <h6>Written Works: </h6>
                      <h6>
                        <span className="font-bold">{tdata.ww.passed}</span> of{" "}
                        <span className="font-bold">{tdata.ww.total}</span>{" "}
                        task/s passed.
                      </h6>
                    </div>
                    <div className="flex gap-2">
                      {wworks.map((task, idx) =>
                        task === "Perfect" ? (
                          <div className="rounded-full border-4 w-14 h-14 border-yellow-300">
                            <StarIcon className="text-tallano_gold-300" />
                          </div>
                        ) : task === "??" ? (
                          <div className="flex justify-center items-center w-14 h-14 bg-neutral-50 border-4 rounded-full">
                            <h1 className="text-sm font-bold text-neutral-500">
                              No data
                            </h1>
                          </div>
                        ) : task === "Passed" ? (
                          <div className="w-14 h-14 border-4 rounded-full border-green-300">
                            <CheckIcon className="text-green-300" />
                          </div>
                        ) : task === "Failed" ? (
                          <div className="w-14 h-14 border-4 border-red-300 rounded-full">
                            <XIcon className="text-red-300" />
                          </div>
                        ) : task === "Considerable" ? (
                          <div className="flex justify-center items-center w-14 h-14 border-4 border-orange-300 rounded-full">
                            <h1 className="text-3xl font-bold text-orange-300">
                              C
                            </h1>
                          </div>
                        ) : task === "Zero" ? (
                          <div className="w-14 h-14 border-4 border-red-300 rounded-full">
                            <h1 className="text-3xl font-bold text-red-300">
                              0
                            </h1>
                          </div>
                        ) : (
                          <div
                            data-tip
                            data-for={idx.toString()}
                            className="w-14 h-14 bg-neutral-50 border-dashed border-2 rounded-full"
                          ></div>
                        )
                      )}
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between">
                      <h6>Performance Tasks: </h6>
                      <h6>
                        <span className="font-bold">{tdata.pt.passed}</span> of{" "}
                        <span className="font-bold">{tdata.pt.total}</span>{" "}
                        task/s passed.
                      </h6>
                    </div>
                    <div className="flex gap-2">
                      {ptasks.map((task) =>
                        task === "Perfect" ? (
                          <div className="rounded-full border-4 w-14 h-14 border-yellow-300">
                            <StarIcon className="text-tallano_gold-300" />
                          </div>
                        ) : task === "??" ? (
                          <div className="flex justify-center items-center w-14 h-14 bg-neutral-50 border-4 rounded-full">
                            <h1 className="text-sm font-bold text-neutral-500">
                              No data
                            </h1>
                          </div>
                        ) : task === "Passed" ? (
                          <div className="w-14 h-14 border-4 rounded-full border-green-300">
                            <CheckIcon className="text-green-300" />
                          </div>
                        ) : task === "Failed" ? (
                          <div className="w-14 h-14 border-4 border-red-300 rounded-full">
                            <XIcon className="text-red-300" />
                          </div>
                        ) : task === "Considerable" ? (
                          <div className="flex justify-center items-center w-14 h-14 border-4 border-orange-300 rounded-full">
                            <h1 className="text-3xl font-bold text-orange-300">
                              C
                            </h1>
                          </div>
                        ) : task === "Zero" ? (
                          <div className="w-14 h-14 border-4 border-red-300 rounded-full">
                            <h1 className="text-3xl font-bold text-red-300">
                              0
                            </h1>
                          </div>
                        ) : (
                          <div className="w-14 h-14 bg-neutral-50 border-dashed border-2 rounded-full"></div>
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <h2 className="text-xl font-bold">
                    {tdata.ww.raw_scores.score[ww_best_task!] == -1 &&
                    tdata.pt.raw_scores.score[pt_best_task!] == -1
                      ? ""
                      : tdata.underperformed_tasks.length > 0
                      ? `${capitalize("student")} had a hard time with:`
                      : `Wow! ${capitalize(
                          "student"
                        )} didn't fail a single task!`}
                  </h2>
                  {/* Failed Tasks */}
                  <div className="w-full h-fit grid grid-cols-2 grid-flow-row gap-2 mt-4">
                    {tdata.underperformed_tasks.map((task, idx) => (
                      <div
                        key={idx}
                        className={classNames(
                          "h-24 py-2 rounded-3xl border-2 flex flex-col justify-between",
                          task[3] === "Considerable"
                            ? "border-orange-300"
                            : "border-red-300"
                        )}
                      >
                        <h6 className="px-4 ">{task[2]}:</h6>
                        <div className="flex justify-end">
                          <h1 className="font-bold text-xl px-6">
                            {task[0]} / {task[1]}
                          </h1>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div
                className={classNames("col-span-5 grid grid-cols-10 gap-3 p-4")}
              >
                {/* WW Data */}
                <div
                  className={classNames(
                    wgh_ww! > wgh_pt!
                      ? "col-span-6"
                      : wgh_pt! > wgh_ww!
                      ? "col-span-4"
                      : "col-span-5"
                  )}
                >
                  {/* Written Works Circular Progress */}
                  <div className="relative">
                    <div className="z-40 absolute inset-0 flex justify-center items-center">
                      <div className="flex flex-col justify-center items-center">
                        <h2 className="font-bold text-3xl">
                          {tdata.ww.percentage}%
                        </h2>
                        <h3 className="text-lg font-semibold">Written Works</h3>
                        <p className="text-base">
                          Scored {tdata.ww.score_sum} out of{" "}
                          {tdata.ww.total_item}
                        </p>
                      </div>
                    </div>
                    <CircularProgress
                      value={tdata.ww.percentage}
                      pathColor="#FFF598"
                      strokeWidth={8}
                    />
                  </div>
                  <div className="flex justify-end">
                    <div className={"w-6/12"}>
                      <div className="relative">
                        <div className="z-40 absolute inset-0 flex justify-center items-center">
                          <div className="flex flex-col justify-center items-center">
                            <h2 className="font-bold text-xl">{ww_pct}%</h2>
                            <h3 className="text-[0.8rem] font-semibold">
                              Surpassed
                            </h3>
                            <p
                              className={
                                wgh_ww! > wgh_pt!
                                  ? "text-[0.6rem]"
                                  : "text-[0.4rem]"
                              }
                            >
                              {ww_surp_sum} out of {students?.length!} students
                            </p>
                          </div>
                        </div>
                        <CircularProgress
                          value={ww_pct}
                          pathColor="#FFF598"
                          strokeWidth={10}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* PT Data */}
                <div
                  className={classNames(
                    wgh_ww! > wgh_pt!
                      ? "col-span-4"
                      : wgh_pt! > wgh_ww!
                      ? "col-span-6"
                      : "col-span-5"
                  )}
                >
                  {/* Performance Tasks Circular Progress */}
                  <div className={"w-6/12"}>
                    <div className="relative">
                      <div className="z-40 absolute inset-0 flex justify-center items-center">
                        <div className="flex flex-col justify-center items-center">
                          <h2 className="font-bold text-xl">{pt_pct}%</h2>
                          <h3 className="text-[0.8rem] font-semibold">
                            Surpassed
                          </h3>
                          <p
                            className={
                              wgh_ww! < wgh_pt!
                                ? "text-[0.6rem]"
                                : "text-[0.5rem]"
                            }
                          >
                            {pt_surp_sum} out of {students?.length} students
                          </p>
                        </div>
                      </div>
                      <CircularProgress
                        value={pt_pct}
                        pathColor="#63C7FF"
                        strokeWidth={10}
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <div className="z-40 absolute inset-0 flex justify-center items-center">
                      <div className="flex flex-col justify-center items-center">
                        <h2 className="font-bold text-3xl">
                          {tdata.pt.percentage}%
                        </h2>
                        <h3 className="text-lg font-semibold">
                          Performance Tasks
                        </h3>
                        <p className="text-base">
                          Scored {tdata.pt.score_sum} out of{" "}
                          {tdata.pt.total_item}
                        </p>
                      </div>
                    </div>
                    <CircularProgress
                      value={tdata.pt.percentage}
                      pathColor="#63C7FF"
                      strokeWidth={8}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* External Elements Section */}
      <div className="min-h-fit bg-ocean-100">
        <div className="mx-12 my-10">
          <div className="pt-10">
            <h2 className="text-2xl font-bold">
              What affected my performance?
            </h2>
            <h3 className="italic">External Elements/Factors</h3>
          </div>
          <div className="pb-10">
            <div className="flex gap-3 mt-6">
              <h2 className="font-bold text-lg">Environmental Factors: </h2>
              <h2 className="font-bold text-lg">
                {capitalize(student?.inference_result?.environment.linguistic!)}
              </h2>
            </div>
            <div className="grid grid-cols-11 py-4">
              <div className="col-span-5">
                {/* Radar Chart */}
                <div className="bg-white p-5 rounded-xl">
                  <h3 className="font-semibold">
                    Average Degree of Truth: {ave_env_fuzzy}
                  </h3>
                  <div>
                    <Radar
                      data={{
                        labels: [
                          "Unwanted Noise",
                          "Limited Space",
                          "House chores",
                          "Comfortability",
                          "Support",
                          "Internet",
                          "Device",
                          "Faculty Readiness",
                        ],
                        datasets: radarData,
                      }}
                      options={{
                        responsive: true,
                        scales: {
                          r: {
                            angleLines: {
                              display: false,
                            },
                            suggestedMin: 0,
                            suggestedMax: 1,
                            ticks: {
                              stepSize: 0.2,
                            },
                          },
                        },
                        plugins: {
                          legend: {
                            display: false,
                          },

                          title: {
                            display: true,
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-6 ml-6 flex flex-col justify-between">
                <div className="w-1/2 p-4 rounded-lg bg-yellow-50 font-bold">
                  <h4>Legend in Fuzzy Range</h4>
                  <div className="font-normal border-t border-neutral-400 mt-2 pt-2">
                    <div className="flex justify-between">
                      <p>Unaffecting at all</p> <p>0.0</p>
                    </div>
                    <div className="flex justify-between">
                      <p>Quite Affecting </p> <p>0.25</p>
                    </div>
                    <div className="flex justify-between">
                      <p>Affecting </p> <p>0.50</p>
                    </div>
                    <div className="flex justify-between">
                      <p>Greatly Affecting </p> <p>0.75</p>
                    </div>
                    <div className="flex justify-between">
                      <p>Extremely Affecting </p> <p>1.00</p>
                    </div>
                  </div>
                </div>
                <div className="h-96 overflow-x-auto text-justify pr-4">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt ut laoreet dolore magna.
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt ut laoreet dolore magna.
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt ut laoreet dolore magna.
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt ut laoreet dolore
                  magna.Lorem ipsum dolor sit amet, consectetuer adipiscing
                  elit, sed diam nonummy nibh euismod tincidunt ut laoreet
                  dolore magna. Lorem ipsum dolor sit amet, consectetuer
                  adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                  laoreet dolore magna. Lorem ipsum dolor sit amet, consectetuer
                  adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                  laoreet dolore magna. Lorem ipsum dolor sit amet, consectetuer
                  adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                  laoreet dolore magna.Lorem ipsum dolor sit amet, consectetuer
                  adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                  laoreet dolore magna. Lorem ipsum dolor sit amet, consectetuer
                  adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                  laoreet dolore magna. Lorem ipsum dolor sit amet, consectetuer
                  adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                  laoreet dolore magna. Lorem ipsum dolor sit amet, consectetuer
                  adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                  laoreet dolore magna.Lorem ipsum dolor sit amet, consectetuer
                  adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                  laoreet dolore magna. Lorem ipsum dolor sit amet, consectetuer
                  adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                  laoreet dolore magna. Lorem ipsum dolor sit amet, consectetuer
                  adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                  laoreet dolore magna. Lorem ipsum dolor sit amet, consectetuer
                  adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                  laoreet dolore magna.Lorem ipsum dolor sit amet, consectetuer
                  adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                  laoreet dolore magna. Lorem ipsum dolor sit amet, consectetuer
                  adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                  laoreet dolore magna. Lorem ipsum dolor sit amet, consectetuer
                  adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                  laoreet dolore magna. Lorem ipsum dolor sit amet, consectetuer
                  adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                  laoreet dolore magna.Lorem ipsum dolor sit amet, consectetuer
                  adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                  laoreet dolore magna. Lorem ipsum dolor sit amet, consectetuer
                  adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                  laoreet dolore magna. Lorem ipsum dolor sit amet, consectetuer
                  adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                  laoreet dolore magna. Lorem ipsum dolor sit amet, consectetuer
                  adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                  laoreet dolore magna.
                </div>
              </div>
            </div>

            <div className="flex gap-3 py-6">
              <h2 className="font-bold text-lg">Technological Factors: </h2>
              <h2 className="font-bold text-lg">
                {capitalize(
                  student?.inference_result?.technological.linguistic!
                )}
              </h2>
            </div>
            <div className="grid grid-cols-11 gap-4 pb-10">
              <div className="col-span-6 h-96 overflow-x-auto text-justify pr-4">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore
                magna.Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore
                magna.Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore
                magna.Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore
                magna.Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore
                magna.Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna.
              </div>
              <div className="col-span-5">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className=" h-24 bg-tallano_gold-100 py-2 rounded-3xl flex flex-col justify-between font-light">
                    <h6 className="px-4 ">Wi-Fi Connection</h6>
                    <div className="flex justify-end">
                      <h1 className="font-bold text-xl px-6">
                        {student?.survey_result?.wifi.linguistic}
                      </h1>
                    </div>
                  </div>
                  <div className=" h-24 bg-tallano_gold-100 py-2 rounded-3xl flex flex-col justify-between font-light">
                    <h6 className="px-4 ">Data Connection</h6>
                    <div className="flex justify-end">
                      <h1 className="font-bold text-xl px-6">
                        {student?.survey_result?.data.linguistic}
                      </h1>
                    </div>
                  </div>
                </div>
                <div className=" h-28 border border-black py-2 rounded-3xl flex flex-col justify-between">
                  <h6 className="px-4 ">Device Availability</h6>
                  <div className="flex justify-end">
                    <h1 className="font-bold text-xl px-6">
                      {student?.survey_result?.device.linguistic}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white h-[10vh]"></div>
    </>
  );
};

export default StudentInfo;
