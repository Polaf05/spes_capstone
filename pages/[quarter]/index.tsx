import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Image from "next/image";
import { useClassroom } from "../../hooks/useSetClassroom";
import { Tab } from "@headlessui/react";
import { Task } from "../../components/Task";
import { GetServerSideProps } from "next";
import BarChart from "../../components/BarChart";
import { DataSet, Student } from "../../types/Students";
import CircularProgress from "../../components/CircularProgress";
import PeopleChart from "../../components/PeopleChart";
import { useRouter } from "next/router";
import ProgressComponent from "../../components/ProgressComponent";
import CardInfo from "../../components/CardInfo";
import StruggledSections from "../../components/sections/StruggledSections";
import { render } from "@headlessui/react/dist/utils/render";

ChartJS.register(ArcElement, Tooltip, Legend);

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { quarter } = query;
  return {
    props: {
      quarter: Number(quarter),
    },
  };
};

export default function Tasks({ quarter }: { quarter: number }) {
  const { students } = useClassroom();
  const [open, setIsOpen] = useState<boolean>(false);
  const [task, setTask] = useState<number>(0);
  const [pt_task, setPtTask] = useState<number>(0);
  const labels = ["Very Good", "Good", "Average", "Poor", "Very Poor"];
  const router = useRouter();
  var count = [0, 0, 0, 0, 0];

  if (!students) router.back();
  const myStudent = students![0].quarter![0];
  // get weighted omsim of a written works and performance task
  const wgh_ww = myStudent.written_weighted_score?.highest_possible_score;
  const wgh_pt = myStudent.performance_weighted_score?.highest_possible_score;

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
  const [categories] = useState([
    {
      title: "Over All",
      value: "Good",
    },
    {
      title: "Written Works",
      value: "Average",
    },
    {
      title: "Performance Tasks",
      value: "Very Good",
    },
  ]);

  type TaskInfo = {
    task_no: number;
    total: number;
    ave_score: number;
    ave_score_pct: number;
    population: number; // total classroom population
    participated: number; // students participated
    no_data: Student[]; // students absent/no data found
    passed: Student[]; //passed students
    perfect: Student[];
    failed: Student[];
    considerable: Student[];
  };
  let ww_task_array: TaskInfo[] = [];
  let pt_task_array: TaskInfo[] = [];

  const index = quarter - 1;
  console.log(students ? "meron" : "wala");

  //Written Works
  students![0].quarter![index].written_works?.forEach((task, idx) => {
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
    };
    let score_sum = 0;
    students?.map((student, no) => {
      const status = student?.quarter![index].written_works![idx].status;
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
        score_sum += student?.quarter![index].written_works![idx].score;
      }
      //total population
      task_info.population += 1;
    });
    //total score
    task_info.total = task.highest_possible_score;
    task_info.ave_score = Number((score_sum / students?.length!).toFixed(1));
    task_info.ave_score_pct = Number(
      ((task_info.ave_score / task_info.total) * 100).toFixed(1)
    );

    ww_task_array.push(task_info);
  });

  //Performance Tasks
  students![0].quarter![index].performance_tasks?.forEach((task, idx) => {
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
    };
    let score_sum = 0;
    students?.map((student, no) => {
      const status = student?.quarter![index].performance_tasks![idx].status;
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
        score_sum += student?.quarter![index].performance_tasks![idx].score;
      }
      console.log(task_info.population);
      //total population
      task_info.population += 1;
    });
    //total score
    task_info.total = task.highest_possible_score;
    task_info.ave_score = Number((score_sum / students?.length!).toFixed(1));
    task_info.ave_score_pct = Number(
      ((task_info.ave_score / task_info.total) * 100).toFixed(1)
    );

    pt_task_array.push(task_info);
  });

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
      label: "Written Works Ave Score PCT",
      data: ww_render_data,
      fill: true,
      backgroundColor: "#FFF598",
      borderColor: "#FFF598",
    },
  ];

  const pt_quarter_dataset: DataSet[] = [
    {
      label: "Performance Tasks Ave Score PCT",
      data: pt_render_data,
      fill: true,
      backgroundColor: "#63C7FF",
      borderColor: "#63C7FF",
    },
  ];

  const tasks_buttons = [ww_render_labels, pt_render_labels];

  return (
    <>
      {students && (
        <div className="bg-white h-full w-[100vw]]">
          <div className="">
            <Tab.Group>
              <div className="grid grid-cols-3 justify-between mx-10 mt-4 h-20">
                <div className="w-20 h-20 p-1">
                  <Image
                    src="/logo.png"
                    alt="logo picture"
                    width={100}
                    height={100}
                  />
                </div>
                <Tab.List className="col-span-2 flex justify-end">
                  {categories.map((category) => (
                    <Tab
                      key={category.title}
                      className={({ selected }) =>
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
                  <Tab.Panel key={idx} className="h-[90vh] bg-ocean-100 pt-10">
                    {/* Content Section */}
                    <Task
                      open={open}
                      setIsOpen={setIsOpen}
                      category={category.title}
                      assessment={category.value}
                      quarter={quarter - 1}
                    />
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
            <div className="bg-white h-fit px-12 py-10">
              {/* Omsim Chart */}
              {/* Student Cards */}
              <div className="m-8 pb-24">
                <StruggledSections students={students} quarter={quarter} />
              </div>
              {/* Bar Chart */}
              <div className="h-fit m-8 px-24 pb-24 border-b-2 border-ocean-400">
                <div className="grid grid-cols-12 gap-4 mt-4">
                  <div className="col-span-4 py-4">
                    <h2 className="text-xl font-semibold">
                      Task Information: {task + 1}
                    </h2>
                    <div>
                      <h6 className="font-light">
                        Average Score: {ww_task_array[task].ave_score}/
                        {ww_task_array[task].total}
                      </h6>
                      <h6 className="font-light">
                        Average Score PCT: {ww_task_array[task].ave_score_pct}
                      </h6>

                      <h6 className="font-light">
                        No. of Students Participated:
                        {ww_task_array[task].participated}
                      </h6>
                      <h6 className="font-light">
                        No. of Students Passed:
                        {ww_task_array[task].passed.length +
                          ww_task_array[task].perfect.length}
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
                    <h2 className="text-3xl font-bold">Written Works</h2>
                    <div className="relative">
                      <div className="z-40 absolute py-8 w-[3vw] h-full bg-white flex flex-col justify-around">
                        {tasks_buttons[0].map((button, idx) => (
                          <button
                            className="text-sm"
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
                <div className="h-fit pb-24">
                  <div className="grid grid-cols-12 gap-4 mt-4">
                    <div className="col-span-4 py-4">
                      <h2 className="text-xl font-semibold">
                        Task Information: {pt_task + 1}
                      </h2>
                      <div>
                        <h6 className="font-light">
                          Average Score: {pt_task_array[pt_task].ave_score}/
                          {pt_task_array[pt_task].total}
                        </h6>
                        <h6 className="font-light">
                          Average Score PCT:{" "}
                          {pt_task_array[pt_task].ave_score_pct}
                        </h6>

                        <h6 className="font-light">
                          No. of Students Participated:
                          {pt_task_array[pt_task].participated}
                        </h6>
                        <h6 className="font-light">
                          No. of Students Passed:
                          {pt_task_array[pt_task].passed.length +
                            pt_task_array[pt_task].perfect.length}
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
                      <h2 className="text-3xl font-bold">Performance Tasks</h2>
                      <div className="relative">
                        <div className="z-40 absolute py-8 w-[3vw] h-full bg-white flex flex-col justify-around">
                          {tasks_buttons[1].map((button, idx) => (
                            <button
                              className="text-sm"
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
                <p className="italic text-justify mt-8">
                  Paragraph (Large) Lorem ipsum dolor sit amet, consectetuer
                  adipiscing elit, sedlor sit amet, consectetuer adipiscing
                  elit, sedParagraph (Large) Lorem ipsum dolor sit amet,
                  consectetuer adipiscing elit, sedlor sit amet, consectetuer
                  adipiscing elit, sedParagraph (Large) Lorem ipsum dolor sit
                  amet, consectetuer adipiscing elit, sedlor sit amet,
                  consectetuer adipiscing elit, sedParagraph (Large) Lorem ipsum
                  dolor sit amet, consectetuer adipiscing elit, sedlor sit amet,
                  consectetuer adipiscing elit, sedParagraph (Large) Lorem ipsum
                  dolor sit amet, consectetuer adipiscing elit, sedlor sit amet,
                  consectetuer adipiscing elit, sedParagraph (Large) Lorem ipsum
                  dolor sit amet, consectetuer adipiscing elit, sedlor sit amet,
                  consectetuer adipiscing elit, sed
                </p>
              </div>

              {/* Circular Progress Chart */}
              <div className="my-12 grid grid-cols-2 gap-4 h-fit py-24 border-b-2 border-ocean-400">
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
                          value={69}
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
                          Paragraph (Large) Lorem ipsum dolor sit amet,
                          consectetuer adipiscing elit, sedlor sit amet,
                          consectetuer adipiscing elit, sed
                        </p>
                      </div>
                      <div className="col-span-4 ">
                        <ProgressComponent
                          value={22}
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
                          value={22}
                          title="Average"
                          subtitle="Score PCT"
                          pathColor="#63C7FF"
                          strokeWidth={10}
                          size="small"
                        />
                      </div>
                      <div className="col-span-8 flex justify-center items-center">
                        <p className="italic">
                          Paragraph (Large) Lorem ipsum dolor sit amet,
                          consectetuer adipiscing elit, sedlor sit amet,
                          consectetuer adipiscing elit, sed
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
                          value={69}
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}
