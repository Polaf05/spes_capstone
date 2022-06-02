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

ChartJS.register(ArcElement, Tooltip, Legend);

const Test = () => {
  const { students } = useClassroom();
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
      router.back();
    } else {
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
                      quarter={quarter}
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
              <div className="h-fit m-8 px-24 border-b-2 border-ocean-400">
                <div className="flex justify-between">
                  <div>
                    <h1 className="text-3xl font-bold">Tasks Assessment</h1>
                    <div className="flex gap-1 items-center">
                      <QuestionMarkCircleIcon className="w-4 h-4 text-neutral-500" />
                      <p className="text-neutral-600 text-sm">
                        Click on the chart label to view the task info
                      </p>
                    </div>
                  </div>
                  <div>
                    <a
                      href={"#analysis"}
                      className="text-xl font-semibold underline decoration-2 hover:cursor-pointer hover:text-ocean-400 underline-offset-8"
                    >
                      View Analysis
                    </a>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 mt-4">
                  <div className="col-span-4 py-4">
                    <h2 className="text-xl font-semibold">
                      Written Work: {task + 1}
                    </h2>
                    <div>
                      <h6 className="font-light">Average Score: 88</h6>
                      <h6 className="font-light">Average Score PCT: 22</h6>

                      <h6 className="font-light">
                        No. of Students Participated:33
                      </h6>
                      <h6 className="font-light">No. of Students Passed: 2</h6>
                      <div className="w-full">
                        <PeopleChart
                          passed_tasks={9}
                          length={10}
                          color="yellow"
                        />
                        <p className="font-light text-center">
                          <span className="font-semibold">8 out of 10</span>{" "}
                          students passed task no. {task + 1}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-8 pl-4 border-l">
                    <div className="relative">
                      <div className="z-40 absolute py-8 w-[3vw] h-full bg-white flex flex-col justify-around">
                        {task_buttons[0].map((button, idx) => (
                          <button
                            className="text-sm"
                            onClick={() => {
                              setWWTaskSelected(idx);
                            }}
                          >
                            {button}
                          </button>
                        ))}
                      </div>
                      {/* <BarChart
                        display={false}
                        indexAxis="y"
                        labels={task_buttons[0]}
                        datasets={ww_quarter_dataset}
                      /> */}
                    </div>
                  </div>
                </div>
                <div className="h-fit pb-12">
                  <div className="grid grid-cols-12 gap-4 mt-4">
                    <div className="col-span-4 py-4">
                      <h2 className="text-xl font-semibold">
                        Performance Task: {1}
                      </h2>

                      <div>
                        <h6 className="font-light">Average Score: {11}</h6>
                        <h6 className="font-light">Average Score PCT: {12}</h6>

                        <h6 className="font-light">
                          No. of Students Participated: {13}
                        </h6>
                        <h6 className="font-light">
                          No. of Students Passed: {1}
                        </h6>
                        <div className="w-full">
                          <PeopleChart
                            passed_tasks={10}
                            length={10}
                            color="blue"
                          />
                          <p className="font-light text-center">
                            <span className="font-semibold">
                              {10} out of 10
                            </span>{" "}
                            students passed task no. {task + 1}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-8 pl-4 border-l">
                      <div className="relative">
                        <div className="z-40 absolute py-8 w-[3vw] h-full bg-white flex flex-col justify-around">
                          {task_buttons[1].map((button, idx) => (
                            <button
                              className="text-sm"
                              onClick={() => {
                                setPTTaskSelected(idx);
                              }}
                            >
                              {button}
                            </button>
                          ))}
                        </div>
                        <BarChart
                          display={false}
                          indexAxis="y"
                          labels={task_buttons[1]}
                          datasets={[
                            {
                              label: "Ave Score PCT",
                              data: [69, 96],
                              fill: true,
                              backgroundColor: "#63C7FF",
                              borderColor: "#63C7FF",
                            },
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Circular Progress Chart */}
              <div id="analysis" className="my-12 grid grid-cols-2 gap-4 h-fit">
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
                          value={96}
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
                          value={66}
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
                          value={32}
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
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Test;
