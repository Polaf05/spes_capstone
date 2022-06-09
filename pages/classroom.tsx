import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Image from "next/image";
import { useClassroom } from "../hooks/useSetClassroom";
import { Tab } from "@headlessui/react";
import { Task } from "../components/Task";
import BarChart from "../components/BarChart";
import { DataSet, StruggledStudent, Student } from "../types/Students";
import PeopleChart from "../components/PeopleChart";
import { useRouter } from "next/router";
import ProgressComponent from "../components/ProgressComponent";
import StruggledSections from "../components/sections/StruggledSections";
import {
  QuestionMarkCircleIcon,
  ArrowLeftIcon,
} from "@heroicons/react/outline";
import {
  getAverageGrade,
  getGrade,
  transmuteGrade,
} from "../lib/functions/grade_computation";
import { useSelectedQuarter } from "../hooks/useSelectedQuarter";
import { classNames } from "../lib/functions/concat";
import { TaskInfo } from "../types/Task";

import Link from "next/link";
import StudentDialog from "../components/dialogs/StudentDialog";
import ReactTooltip from "react-tooltip";
import {
  getClassPerformanceAssessment,
  getTaskAnalysis,
} from "../lib/functions/feedback";

ChartJS.register(ArcElement, Tooltip, Legend);

const getRemarks = (grade: number) => {
  return grade < 75
    ? "Very Poor"
    : grade < 83
    ? "Poor"
    : grade < 90
    ? "Average"
    : grade < 97
    ? "Good"
    : "Very Good";
};

// export async function getServerSideProps(context: any) {
//   let headerCookie = context.req.headers.cookie;
//   if (typeof headerCookie !== "string") {
//     headerCookie = "";
//   }
//   const cookies: any = cookie.parse(headerCookie);

//   const jwt = cookies.OursiteJWT;

//   if (!jwt) {
//     return { props: { user: null } };
//   }

//   return { props: { user: jwt } };
// }

export default function ClassroomInfo() {
  //const localStudents: Student[] = classroom;
  const { students } = useClassroom();
  const { quarter } = useSelectedQuarter();
  const [open, setIsOpen] = useState<boolean>(false);
  const [task, setTask] = useState<number>(0);
  const [pt_task, setPtTask] = useState<number>(0);
  const labels = ["Very Good", "Good", "Average", "Poor", "Very Poor"];
  const router = useRouter();

  const [wgh_ww, setWghWW] = useState<number>(0);
  const [wgh_pt, setWghPT] = useState<number>(0);

  useEffect(() => {
    // if (!user.user) {
    //   router.push("/login");
    // } else {
    if (!students) {
      router.back();
    } else {
      // console.log(students);
      const myStudent = students![0].quarter![quarter];
      // get weighted omsim of a written works and performance task
      const wgh_ww = myStudent.written_weighted_score?.highest_possible_score;
      const wgh_pt =
        myStudent.performance_weighted_score?.highest_possible_score;
      setWghWW(wgh_ww ? wgh_ww : 0);
      setWghPT(wgh_pt ? wgh_pt : 0);
    }
    // }
  }, []);

  let quarter_index = quarter;

  var count = [0, 0, 0, 0, 0];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Student's performance",
        data: count,
        backgroundColor: [
          "#CCB53B",
          "#F9E852",
          "#A2CAEB",
          "#5DB4E5",
          "#4B94BD",
        ],
      },
    ],
  };

  let ww_task_array: TaskInfo[] = [];
  let pt_task_array: TaskInfo[] = [];

  //category average
  let ww_cat_sum = 0,
    pt_cat_sum = 0,
    ww_ave_cat_sum = 0,
    pt_ave_cat_sum = 0;

  if (students) {
    //Written Works
    students![0].quarter![quarter_index].written_works?.forEach((task, idx) => {
      //initialized values
      const task_info: TaskInfo = {
        task_no: idx + 1,
        total: 0,
        ave_score: 0,
        ave_score_pct: 0,
        population: 0, // total classroom population
        participated: 0, // students participated
        no_data: [], // students absent/no data found
        passed: [], //passed students
        perfect: [],
        failed: [],
        considerable: [],
        zero: [],
      };
      let score_sum = 0;
      students?.map((student, no) => {
        const status =
          student?.quarter![quarter_index].written_works![idx].status;
        if (status === "??") {
          task_info.no_data.push(student);
        } else {
          if (status === "Perfect") task_info.perfect.push(student);
          else if (status === "Passed") task_info.passed.push(student);
          else if (status === "Considerable")
            task_info.considerable.push(student);
          else task_info.failed.push(student);
          //particpants
          task_info.participated += 1;
          //score sum
          score_sum +=
            student?.quarter![quarter_index].written_works![idx].score;
        }
        //total population
        task_info.population += 1;
      });
      //total score
      task_info.total = task.highest_possible_score;
      //console.log(score_sum);
      task_info.ave_score = Number(
        (score_sum / task_info.participated).toFixed(1)
      );
      task_info.ave_score_pct = Number(
        ((task_info.ave_score / task_info.total) * 100).toFixed(1)
      );
      ww_ave_cat_sum += task_info.ave_score_pct;

      //get sum of passing percentage
      ww_cat_sum += Number(
        (
          ((task_info.passed.length + task_info.perfect.length) /
            task_info.participated) *
          100
        ).toFixed(1)
      );
      ww_task_array.push(task_info);
    });

    //Performance Tasks
    students![0].quarter![quarter_index].performance_tasks?.forEach(
      (task, idx) => {
        //initialized values
        const task_info: TaskInfo = {
          task_no: idx + 1,
          total: 0,
          ave_score: 0,
          ave_score_pct: 0,
          population: 0, // total classroom population
          participated: 0, // students participated
          no_data: [], // students absent/no data found
          passed: [], //passed students
          perfect: [],
          failed: [],
          considerable: [],
          zero: [],
        };
        let score_sum = 0;
        students?.map((student, no) => {
          const status =
            student?.quarter![quarter_index].performance_tasks![idx].status;
          if (status === "??") {
            task_info.no_data.push(student);
          } else {
            if (status === "Perfect") task_info.perfect.push(student);
            else if (status === "Passed") task_info.passed.push(student);
            else if (status === "Considerable")
              task_info.considerable.push(student);
            else task_info.failed.push(student);
            //particpants
            task_info.participated += 1;
            //score sum
            score_sum +=
              student?.quarter![quarter_index].performance_tasks![idx].score;
          }
          //total population
          task_info.population += 1;
        });
        //total score
        task_info.total = task.highest_possible_score;
        task_info.ave_score = Number(
          (score_sum / task_info.participated!).toFixed(1)
        );
        task_info.ave_score_pct = Number(
          ((task_info.ave_score / task_info.total) * 100).toFixed(1)
        );

        pt_ave_cat_sum += task_info.ave_score_pct;

        //get sum of passing percentage
        pt_cat_sum += Number(
          (
            ((task_info.passed.length + task_info.perfect.length) /
              task_info.participated) *
            100
          ).toFixed(1)
        );
        pt_task_array.push(task_info);
      }
    );
  }

  const ww_cat_ave =
    ww_cat_sum /
    (students
      ? students![0].quarter![quarter_index].written_works?.length!
      : 0);
  const pt_cat_ave =
    pt_cat_sum /
    (students
      ? students![0].quarter![quarter_index].performance_tasks?.length!
      : 0);
  const [categories] = useState([
    {
      title: "Over All",
      value: getRemarks((ww_cat_ave + pt_cat_ave) / 2),
    },
    {
      title: "Written Works",
      value: getRemarks(ww_cat_ave),
    },
    {
      title: "Performance Tasks",
      value: getRemarks(pt_cat_ave),
    },
  ]);

  const ww_render_data: number[] = [];
  const ww_render_labels: string[] = [];
  ww_task_array.map((task, idx) => {
    ww_render_data.push(task.ave_score_pct);
    ww_render_labels.push(`Task ${task.task_no}`);
  });

  const pt_render_data: number[] = [];
  const pt_render_labels: string[] = [];
  pt_task_array.map((task, idx) => {
    pt_render_data.push(task.ave_score_pct);
    pt_render_labels.push(`Task ${task.task_no}`);
  });

  const ww_quarter_dataset: DataSet[] = [
    {
      label: "Ave Score PCT",
      data: ww_render_data,
      fill: true,
      backgroundColor: "#FFF598",
      borderColor: "#FFF598",
    },
  ];

  const pt_quarter_dataset: DataSet[] = [
    {
      label: "Ave Score PCT",
      data: pt_render_data,
      fill: true,
      backgroundColor: "#63C7FF",
      borderColor: "#63C7FF",
    },
  ];

  type Info = {
    student: Student;
    remarks: string;
  };

  let ww_remarks: Info[] = [];
  let pt_remarks: Info[] = [];
  //average passing rate
  students?.map((student) => {
    ww_remarks.push({
      student: student,
      remarks: getRemarks(
        transmuteGrade(
          getGrade(student.quarter![quarter_index].written_percentage?.score!)
        )
      ),
    });

    pt_remarks.push({
      student: student,
      remarks: getRemarks(
        transmuteGrade(
          getGrade(
            student.quarter![quarter_index].performance_percentage?.score!
          )
        )
      ),
    });
  });

  let pass_ww_info: any[] = [],
    pass_pt_info: any[] = [];
  ww_remarks.map((student) => {
    if (student.remarks !== "Very Poor") pass_ww_info.push(student);
  });
  pt_remarks.map((student) => {
    if (student.remarks !== "Very Poor") pass_pt_info.push(student);
  });

  const ww_passing_ave = Number(
    ((pass_ww_info.length / ww_remarks.length) * 100).toFixed(1)
  );
  const pt_passing_ave = Number(
    ((pass_pt_info.length / pt_remarks.length) * 100).toFixed(1)
  );

  const ww_ave_pct = Number(
    (
      ww_ave_cat_sum /
      (students
        ? students![0].quarter![quarter_index].written_works?.length!
        : 0)
    ).toFixed(1)
  );
  const pt_ave_pct = Number(
    (
      pt_ave_cat_sum /
      (students
        ? students![0].quarter![quarter_index].performance_tasks?.length!
        : 0)
    ).toFixed(1)
  );

  let ww_ave_participants = 0;
  let pt_ave_participants = 0;

  if (students) {
    const ww_arr: number[] = [];
    const pt_arr: number[] = [];
    ww_task_array.map((task) => {
      ww_arr.push((task.participated / students.length) * 100);
    });
    pt_task_array.map((task) => {
      pt_arr.push((task.participated / students.length) * 100);
    });
    ww_ave_participants = getAverageGrade([ww_arr])[0];
    pt_ave_participants = getAverageGrade([pt_arr])[0];
  }

  const tasks_buttons = [ww_render_labels, pt_render_labels];
  const [dialog, setDialog] = useState<string>("");
  const [strgStudent, setStrgStudent] = useState<StruggledStudent | null>(null);
  const [categoryTitle, setCategoryTitle] = useState<string>("");
  const [taskPage, setTaskPage] = useState<boolean>(true);
  const [tooltip, showTooltip] = useState<boolean>(false);
  const [openClassDialog, setClassDialogOpen] = useState<boolean>(false);
  const [tutorial, setTutorial] = useState<string>("");

  return (
    <>
      {students && (
        <div className="bg-white h-full w-[100vw]]">
          <div className="">
            <Tab.Group>
              <div className="grid grid-cols-3 justify-between mx-10 mt-4 h-20">
                <div className="col-span-1 flex items-center gap-4">
                  <div className="font-bold">
                    <Link href="/dashboard" passHref>
                      <ArrowLeftIcon className="w-10 h-10 cursor-pointer"></ArrowLeftIcon>
                    </Link>
                  </div>
                  <div className="w-20 h-20 p-1">
                    <Link href="/dashboard" passHref>
                      <div className="w-fit h-fit cursor-pointer">
                        <Image
                          src="/logo.png"
                          alt="logo picture"
                          width={100}
                          height={100}
                        />
                      </div>
                    </Link>
                  </div>
                </div>

                <Tab.List className="col-span-2 flex justify-end">
                  {categories.map((category, idx) => (
                    <Tab
                      key={category.title}
                      className={({ selected }: { selected: any }) =>
                        classNames(
                          "w-60 text-xl font-bold mx-2",
                          selected
                            ? "text-ocean-400 decoration-4 border-b-8 border-ocean-400"
                            : ""
                        )
                      }
                    >
                      {category.title}
                    </Tab>
                  ))}
                </Tab.List>
              </div>

              <Tab.Panels>
                {categories.map((category, idx) => (
                  <Tab.Panel key={idx} className="h-fit bg-ocean-100 py-10">
                    {/* Content Section */}
                    <Task
                      dialog={dialog}
                      setDialog={setDialog}
                      students={students}
                      open={open}
                      setIsOpen={setIsOpen}
                      category={category.title}
                      assessment={category.value}
                      quarter={quarter_index}
                      strgStudent={strgStudent}
                      categoryTitle={categoryTitle}
                      openClassDialog={openClassDialog}
                      setClassDialogOpen={setClassDialogOpen}
                      tutorial={tutorial}
                      setTutorial={setTutorial}
                    />
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>

            <div className="bg-white h-fit px-12 py-10">
              {/* Omsim Chart */}
              {/* Student Cards */}
              <div className="m-8 pb-24">
                <StruggledSections
                  students={students}
                  quarter={quarter_index}
                  open={open}
                  setIsOpen={setIsOpen}
                  setDialog={setDialog}
                  setStrgStudent={setStrgStudent}
                  categoryTitle={categoryTitle}
                  setCategoryTitle={setCategoryTitle}
                />
              </div>
              {/* Bar Chart */}
              <div className="h-fit m-8 px-24">
                <div className="flex justify-between">
                  <div>
                    <h1 className="text-3xl font-bold">Tasks Assessment</h1>
                    <div
                      data-for="tip"
                      data-tip="Click for a quick tutorial"
                      onMouseEnter={() => showTooltip(true)}
                      onMouseLeave={() => {
                        showTooltip(false);
                        setTimeout(() => showTooltip(true), 50);
                      }}
                      onClick={() => {
                        setClassDialogOpen(true);
                        setTutorial("taskAssessment");
                      }}
                      className="flex gap-1 items-center w-fit hover:cursor-pointer hover:underline decoration-neutral-400"
                    >
                      <QuestionMarkCircleIcon className="w-4 h-4 text-neutral-500" />
                      <p className="text-neutral-600 text-sm">
                        Click on the chart label to view the task info
                      </p>
                    </div>
                    {tooltip && (
                      <div className="font-semibold">
                        <ReactTooltip
                          id="tip"
                          place="bottom"
                          type="dark"
                          effect="float"
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <p
                      onClick={() => {
                        setTaskPage(!taskPage);
                      }}
                      className="text-xl font-semibold underline decoration-2 hover:cursor-pointer hover:text-ocean-400 underline-offset-8"
                    >
                      View{taskPage ? " Analysis" : " Breakdown"}
                    </p>
                  </div>
                </div>
                {taskPage ? (
                  <div>
                    <div className="grid grid-cols-12 gap-4 mt-4">
                      <div className="col-span-4 py-4">
                        <h2 className="text-xl font-semibold">
                          Written Work: {task + 1}
                        </h2>
                        <div>
                          <h6 className="font-light">
                            Average Score:{" "}
                            <span
                              className={classNames(
                                "font-semibold",
                                ww_task_array[task].ave_score_pct < 70
                                  ? "text-red-500"
                                  : ""
                              )}
                            >
                              {ww_task_array[task].ave_score} /{" "}
                              {ww_task_array[task].total}
                            </span>
                          </h6>
                          <h6 className="font-light">
                            Average Score PCT:{" "}
                            <span
                              className={classNames(
                                "font-semibold",
                                ww_task_array[task].ave_score_pct < 70
                                  ? "text-red-500"
                                  : ""
                              )}
                            >
                              {ww_task_array[task].ave_score_pct}%
                            </span>
                          </h6>

                          <h6 className="font-light">
                            No. of Students Participated:{" "}
                            <span
                              className={classNames(
                                "font-semibold",
                                (ww_task_array[task].participated /
                                  students.length) *
                                  100 <
                                  70
                                  ? "text-red-500"
                                  : ""
                              )}
                            >
                              {ww_task_array[task].participated} (
                              {(
                                (ww_task_array[task].participated /
                                  students.length) *
                                100
                              ).toFixed(1)}
                              %)
                            </span>
                          </h6>
                          <h6 className="font-light">
                            No. of Students Passed:{" "}
                            <span
                              className={classNames(
                                "font-semibold",
                                ((ww_task_array[task].passed.length +
                                  ww_task_array[task].perfect.length) /
                                  ww_task_array[task].participated) *
                                  100 <
                                  70
                                  ? "text-red-500"
                                  : ""
                              )}
                            >
                              {ww_task_array[task].passed.length +
                                ww_task_array[task].perfect.length}
                            </span>
                          </h6>
                          <div className="w-full">
                            <PeopleChart
                              passed_tasks={Number(
                                (
                                  ((ww_task_array[task].passed.length +
                                    ww_task_array[task].perfect.length) /
                                    ww_task_array[task].participated) *
                                  10
                                ).toFixed()
                              )}
                              length={10}
                              color="yellow"
                            />
                            <p className="font-light text-center">
                              <span className="font-semibold">
                                {Number(
                                  (
                                    ((ww_task_array[task].passed.length +
                                      ww_task_array[task].perfect.length) /
                                      ww_task_array[task].participated) *
                                    10
                                  ).toFixed()
                                )}{" "}
                                out of 10
                              </span>{" "}
                              students passed task no. {task + 1}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-8 pl-4 border-l">
                        <div className="relative">
                          <div className="z-10 absolute py-8 w-[3vw] h-full bg-white flex flex-col justify-around">
                            {tasks_buttons[0].map((button, idx) => (
                              <button
                                className={classNames(
                                  "text-sm font-semibold hover:underline",
                                  ((ww_task_array[idx].passed.length +
                                    ww_task_array[idx].perfect.length) /
                                    ww_task_array[idx].participated) *
                                    10 <
                                    7 ||
                                    (ww_task_array[idx].participated /
                                      students.length) *
                                      100 <
                                      70
                                    ? "text-red-500"
                                    : ""
                                )}
                                onClick={() => {
                                  setTask(idx);
                                }}
                              >
                                {button}
                              </button>
                            ))}
                          </div>
                          <BarChart
                            display={false}
                            indexAxis="y"
                            labels={tasks_buttons[0]}
                            datasets={ww_quarter_dataset}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="h-fit pb-12">
                      <div className="grid grid-cols-12 gap-4 mt-4">
                        <div className="col-span-4 py-4">
                          <h2 className="text-xl font-semibold">
                            Performance Task: {pt_task + 1}
                          </h2>

                          <div className="">
                            <h6 className="font-light">
                              Average Score:{" "}
                              <span
                                className={classNames(
                                  "font-semibold",
                                  pt_task_array[pt_task].ave_score_pct < 70
                                    ? "text-red-500"
                                    : ""
                                )}
                              >
                                {pt_task_array[pt_task].ave_score} /{" "}
                                {pt_task_array[pt_task].total}
                              </span>
                            </h6>
                            <h6 className="font-light">
                              Average Score PCT:{" "}
                              <span
                                className={classNames(
                                  "font-semibold",
                                  pt_task_array[pt_task].ave_score_pct < 70
                                    ? "text-red-500"
                                    : ""
                                )}
                              >
                                {pt_task_array[pt_task].ave_score_pct}
                              </span>
                            </h6>

                            <h6 className="font-light">
                              No. of Students Participated:{" "}
                              <span
                                className={classNames(
                                  "font-semibold",
                                  (pt_task_array[pt_task].participated /
                                    students.length) *
                                    100 <
                                    70
                                    ? "text-red-500"
                                    : ""
                                )}
                              >
                                {pt_task_array[pt_task].participated} (
                                {(
                                  (pt_task_array[pt_task].participated /
                                    students.length) *
                                  100
                                ).toFixed(1)}
                                %)
                              </span>
                            </h6>
                            <h6 className="font-light">
                              No. of Students Passed:{" "}
                              <span
                                className={classNames(
                                  "font-semibold",
                                  ((pt_task_array[pt_task].passed.length +
                                    pt_task_array[pt_task].perfect.length) /
                                    pt_task_array[pt_task].participated) *
                                    100 <
                                    70
                                    ? "text-red-500"
                                    : ""
                                )}
                              >
                                {pt_task_array[pt_task].passed.length +
                                  pt_task_array[pt_task].perfect.length}
                              </span>
                            </h6>
                            <div className="w-full">
                              <PeopleChart
                                passed_tasks={Number(
                                  (
                                    ((pt_task_array[pt_task].passed.length +
                                      pt_task_array[pt_task].perfect.length) /
                                      pt_task_array[pt_task].participated) *
                                    10
                                  ).toFixed()
                                )}
                                length={10}
                                color="blue"
                              />
                              <p className="font-light text-center">
                                <span className="font-semibold">
                                  {Number(
                                    (
                                      ((pt_task_array[pt_task].passed.length +
                                        pt_task_array[pt_task].perfect.length) /
                                        pt_task_array[pt_task].participated) *
                                      10
                                    ).toFixed()
                                  )}{" "}
                                  out of 10
                                </span>{" "}
                                students passed task no. {task + 1}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-8 pl-4 border-l">
                          <div className="relative">
                            <div className="z-10 absolute py-8 w-[3vw] h-full bg-white flex flex-col justify-around">
                              {tasks_buttons[1].map((button, idx) => (
                                <button
                                  className={classNames(
                                    "text-sm font-semibold hover:underline",
                                    ((pt_task_array[idx].passed.length +
                                      pt_task_array[idx].perfect.length) /
                                      pt_task_array[idx].participated) *
                                      10 <
                                      7 ||
                                      (pt_task_array[idx].participated /
                                        students.length) *
                                        100 <
                                        70
                                      ? "text-red-500"
                                      : ""
                                  )}
                                  onClick={() => {
                                    setPtTask(idx);
                                  }}
                                >
                                  {button}
                                </button>
                              ))}
                            </div>
                            <BarChart
                              display={false}
                              indexAxis="y"
                              labels={tasks_buttons[1]}
                              datasets={pt_quarter_dataset}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <div className="my-12 grid grid-cols-2 gap-4 h-fit">
                        {/* Circular Progress */}
                        <div className="col-span-5 grid grid-cols-12 gap-3">
                          {/* WW Data */}
                          <div className="col-span-6">
                            {/* Written Works Circular Progress */}
                            <div className="flex justify-end">
                              <div
                                className={classNames(
                                  wgh_ww! > wgh_pt!
                                    ? "w-4/5"
                                    : wgh_pt! > wgh_ww!
                                    ? "w-3/5"
                                    : "w-3/4"
                                )}
                              >
                                <ProgressComponent
                                  value={ww_passing_ave}
                                  title="Written Works"
                                  subtitle="Students Passed"
                                  pathColor="#FFF598"
                                  strokeWidth={8}
                                  size="large"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-12 gap-8 mt-4">
                              <div className="col-span-8 flex justify-center items-center">
                                <p className="text-right italic">
                                  {getTaskAnalysis(
                                    "Written Works",
                                    students.length,
                                    ww_ave_pct,
                                    ww_ave_participants
                                  )}
                                </p>
                              </div>
                              <div className="col-span-4 ">
                                <ProgressComponent
                                  value={ww_ave_pct}
                                  title="Average"
                                  subtitle="Score PCT"
                                  pathColor="#FFF598"
                                  strokeWidth={10}
                                  size="small"
                                />
                              </div>
                            </div>
                          </div>
                          {/* PT Data */}
                          <div className="col-span-6">
                            {/* Performance Tasks Circular Progress */}
                            <div className="grid grid-cols-12 gap-8 mb-4">
                              <div className="col-span-4">
                                <ProgressComponent
                                  value={pt_ave_pct}
                                  title="Average"
                                  subtitle="Score PCT"
                                  pathColor="#63C7FF"
                                  strokeWidth={10}
                                  size="small"
                                />
                              </div>
                              <div className="col-span-8 flex justify-center items-center">
                                <p className="italic">
                                  {getTaskAnalysis(
                                    "Performance Tasks",
                                    students.length,
                                    pt_ave_pct,
                                    pt_ave_participants
                                  )}
                                </p>
                              </div>
                            </div>
                            <div className="">
                              <div
                                className={classNames(
                                  wgh_ww! < wgh_pt!
                                    ? "w-4/5"
                                    : wgh_pt! < wgh_ww!
                                    ? "w-3/5"
                                    : "w-3/4"
                                )}
                              >
                                <ProgressComponent
                                  value={pt_passing_ave}
                                  title="Performance Tasks"
                                  subtitle="Students Passed"
                                  pathColor="#63C7FF"
                                  strokeWidth={8}
                                  size="large"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="px-24">
                        <p className="italic text-justify">
                          {getClassPerformanceAssessment(
                            quarter + 1,
                            null,
                            categories[0].value,
                            0,
                            ww_passing_ave,
                            ww_ave_pct,
                            ww_ave_participants,
                            pt_passing_ave,
                            pt_ave_pct,
                            pt_ave_participants
                          )}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
