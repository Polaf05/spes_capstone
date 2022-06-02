import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Image from "next/image";
import { useClassroom } from "../hooks/useSetClassroom";
import { Tab } from "@headlessui/react";
import { Task } from "../components/Task";
import BarChart from "../components/BarChart";
import { DataSet, Student } from "../types/Students";
import PeopleChart from "../components/PeopleChart";
import { useRouter } from "next/router";
import ProgressComponent from "../components/ProgressComponent";
import StruggledSections from "../components/sections/StruggledSections";
import { QuestionMarkCircleIcon } from "@heroicons/react/outline";
import { getGrade, getRemarks } from "../lib/functions/grade_computation";
import { useSelectedQuarter } from "../hooks/useSelectedQuarter";
import { classNames } from "../lib/functions/concat";
import { TaskInfo } from "../types/Task";
import { students_json } from "../public/json/grades.js";
ChartJS.register(ArcElement, Tooltip, Legend);

export const getStaticProps = async () => {
  return {
    props: {
      students: students_json,
    },
  };
};

const Test = (students: any) => {
  const { quarter } = useSelectedQuarter();
  const [open, setIsOpen] = useState<boolean>(false);
  const [task, setTask] = useState<number>(0);
  const [ww_task_array, setWWTaskArray] = useState<TaskInfo[]>([]);
  const [pt_task_array, setPTTaskArray] = useState<TaskInfo[]>([]);
  const [task_buttons, setButtons] = useState<string[][]>([
    ["Task 1", "Task 2"],
    ["Task 1", "Task 2"],
  ]);
  const [ww_task_selected, setWWTaskSelected] = useState<number>(0);
  const [pt_task_selected, setPTTaskSelected] = useState<number>(0);
  const [wgh_ww, setWghWW] = useState<number>(0);
  const [wgh_pt, setWghPT] = useState<number>(0);

  const router = useRouter();

  const [categories] = useState([
    {
      title: "Over All",
      value: getRemarks(180 / 2),
    },
    {
      title: "Written Works",
      value: getRemarks(91),
    },
    {
      title: "Performance Tasks",
      value: getRemarks(81),
    },
  ]);

  useEffect(() => {
    if (!students) {
      //router.back();
    } else {
      console.log("NOREM");

      let ww_task_array: TaskInfo[] = [];
      let pt_task_array: TaskInfo[] = [];

      //category average
      let ww_cat_sum = 0,
        pt_cat_sum = 0,
        ww_ave_cat_sum = 0,
        pt_ave_cat_sum = 0;

      // //Written Works
      // students![0].quarter![quarter].written_works?.forEach((task, idx) => {
      //   //initialized values
      //   const task_info: TaskInfo = {
      //     task_no: idx + 1,
      //     total: 0,
      //     ave_score: 0,
      //     ave_score_pct: 0,
      //     population: 0, // total classroom population
      //     participated: 0, // students participated
      //     no_data: [], // students absent/no data found
      //     passed: [], //passed students
      //     perfect: [],
      //     failed: [],
      //     considerable: [],
      //   };
      //   let score_sum = 0;
      //   students?.map((student, no) => {
      //     const status = student?.quarter![quarter].written_works![idx].status;
      //     if (status === "??") {
      //       task_info.no_data.push(student);
      //     } else {
      //       if (status === "Perfect") task_info.perfect.push(student);
      //       else if (status === "Passed") task_info.passed.push(student);
      //       else if (status === "Considerable")
      //         task_info.considerable.push(student);
      //       else task_info.failed.push(student);
      //       //particpants
      //       task_info.participated += 1;
      //       //score sum
      //       score_sum += student?.quarter![quarter].written_works![idx].score;
      //     }
      //     //total population
      //     task_info.population += 1;
      //   });
      //   //total score
      //   task_info.total = task.highest_possible_score;
      //   task_info.ave_score = Number(
      //     (score_sum / students?.length!).toFixed(1)
      //   );
      //   task_info.ave_score_pct = Number(
      //     ((task_info.ave_score / task_info.total) * 100).toFixed(1)
      //   );
      //   ww_ave_cat_sum += task_info.ave_score_pct;

      //   //get sum of passing percentage
      //   ww_cat_sum += Number(
      //     (
      //       ((task_info.passed.length + task_info.perfect.length) /
      //         task_info.participated) *
      //       100
      //     ).toFixed(1)
      //   );
      //   ww_task_array.push(task_info);
      // });

      // //Performance Tasks
      // students![0].quarter![quarter].performance_tasks?.forEach((task, idx) => {
      //   //initialized values
      //   const task_info: TaskInfo = {
      //     task_no: idx + 1,
      //     total: 0,
      //     ave_score: 0,
      //     ave_score_pct: 0,
      //     population: 0, // total classroom population
      //     participated: 0, // students participated
      //     no_data: [], // students absent/no data found
      //     passed: [], //passed students
      //     perfect: [],
      //     failed: [],
      //     considerable: [],
      //   };
      //   let score_sum = 0;
      //   students?.map((student, no) => {
      //     const status =
      //       student?.quarter![quarter].performance_tasks![idx].status;
      //     if (status === "??") {
      //       task_info.no_data.push(student);
      //     } else {
      //       if (status === "Perfect") task_info.perfect.push(student);
      //       else if (status === "Passed") task_info.passed.push(student);
      //       else if (status === "Considerable")
      //         task_info.considerable.push(student);
      //       else task_info.failed.push(student);
      //       //particpants
      //       task_info.participated += 1;
      //       //score sum
      //       score_sum +=
      //         student?.quarter![quarter].performance_tasks![idx].score;
      //     }
      //     //total population
      //     task_info.population += 1;
      //   });
      //   //total score
      //   task_info.total = task.highest_possible_score;
      //   task_info.ave_score = Number(
      //     (score_sum / students?.length!).toFixed(1)
      //   );
      //   task_info.ave_score_pct = Number(
      //     ((task_info.ave_score / task_info.total) * 100).toFixed(1)
      //   );

      //   pt_ave_cat_sum += task_info.ave_score_pct;

      //   //get sum of passing percentage
      //   pt_cat_sum += Number(
      //     (
      //       ((task_info.passed.length + task_info.perfect.length) /
      //         task_info.participated) *
      //       100
      //     ).toFixed(1)
      //   );
      //   pt_task_array.push(task_info);
      // });

      // setWWTaskArray([]);
      // setPTTaskArray([]);
    }
  }, []);

  return (
    <>
      <pre>{students ? JSON.stringify(students, null, 2) : "No data"}</pre>
    </>
  );
};

export default Test;
