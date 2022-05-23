import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelectedStudent } from "../../../../hooks/useSelectedStudent";
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
import { Bar, Line } from "react-chartjs-2";
import { StarIcon } from "@heroicons/react/solid";
import { CheckIcon, XIcon } from "@heroicons/react/outline";
import BarChart from "../../../../components/BarChart";
import { DataSet, Student } from "../../../../types/Students";
import CardInfo from "../../../../components/CardInfo";
import { useClassroom } from "../../../../hooks/useSetClassroom";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { tasks } from "googleapis/build/src/apis/tasks";

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

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { quarter, id } = query;
  console.log(query);
  return {
    props: {
      quarter: Number(quarter),
      id: id,
    },
  };
};
const StudentInfo = ({ quarter, id }: { quarter: number; id: string }) => {
  const { students } = useClassroom();
  const { student } = useSelectedStudent();
  const [myStudent, setMyStudent] = useState(student?.quarter![quarter - 1]!);
  //set quarter page to render
  const [quar, setQuar] = useState<number>(quarter - 1);
  const myquar = ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"];

  //get all quarter grades and average rank
  const quarter_data: number[] = [];
  let sum = 0,
    ww_qsum = 0,
    pt_qsum = 0,
    ww_sum: number[] = [],
    hps_ww: number[] = [],
    pt_sum: number[] = [],
    hps_pt: number[] = [];

  for (let i = 0; i < 4; i++) {
    quarter_data.push(student?.quarter![i].grade_before!);
    sum += student?.quarter![i].ranking!;
    ww_qsum += student?.quarter![i].written_percentage?.score!;
    pt_qsum += student?.quarter![i].performance_percentage?.score!;

    let w = 0,
      hw = 0,
      hp = 0,
      p = 0;
    student?.quarter![i].written_works?.map((task) => {
      w += task.score;
      hw += task.highest_posible_score;
    });
    student?.quarter![i].performance_tasks?.map((task) => {
      p += task.score;
      hp += task.highest_posible_score;
    });

    //score / total score
    ww_sum.push(w);
    hps_ww.push(hw);
    pt_sum.push(p);
    hps_pt.push(hp);
  }

  const ww_labels: string[] = [];
  const ww_scores: string[] = [];
  const pt_labels: string[] = [];
  const pt_scores: string[] = [];

  // get all passed scores
  interface TaskDataScores {
    ww: {
      score_sum: number;
      total_item: number;
      passed: number;
      total: number;
      percentage: number;
    };
    pt: {
      score_sum: number;
      total_item: number;
      passed: number;
      total: number;
      percentage: number;
    };
    better_at: string;
  }
  // get task data
  let tdata: TaskDataScores = {
    ww: {
      score_sum: ww_sum[quar],
      total_item: hps_ww[quar],
      passed: 0,
      total: myStudent.written_works?.length!,
      percentage: 0,
    },
    pt: {
      score_sum: pt_sum[quar],
      total_item: hps_pt[quar],
      passed: 0,
      total: myStudent.performance_tasks?.length!,
      percentage: 0,
    },
    better_at: "",
  };

  myStudent.written_works?.forEach((task) => {
    const task_label = "Task " + task.tasked_number.toString();
    ww_labels.push(task_label);
    ww_scores.push(task.status);
    tdata.ww.passed += task.status.match(/Passed|Perfect/g) ? 1 : 0;
  });
  myStudent.performance_tasks?.forEach((task) => {
    const task_label = "Task " + task.tasked_number.toString();
    pt_labels.push(task_label);
    pt_scores.push(task.status);
    tdata.pt.passed += task.status.match(/Passed|Perfect/g) ? 1 : 0;
  });

  // calculate task percentage

  tdata.ww.percentage = Number(
    ((tdata.ww.score_sum / tdata.ww.total_item) * 100).toFixed(1)
  );
  tdata.pt.percentage = Number(
    ((tdata.pt.score_sum / tdata.pt.total_item) * 100).toFixed(1)
  );
  const tdiff = tdata.pt.percentage - tdata.ww.percentage;
  const feedback: string =
    tdiff > 2
      ? ` better at Performance Tasks with a margin of (+${tdiff}).`
      : tdiff > 0
      ? ` slightly better at Performance Tasks with a margin of (+${tdiff}).`
      : tdiff === 0
      ? ` good at both Written Works and Performance Tasks with a margin of (+${tdiff}).`
      : tdiff > -1
      ? ` slightly better at Written Works with a margin of (+${tdiff})`
      : ` better at Written Tasks with a margin of (+${tdiff * -1})`;

  const ave_rank: number = sum / 4;
  const ave_ww_60: number = Number((ww_qsum / 4).toFixed(1));
  const ave_pt_60: number = Number((pt_qsum / 4).toFixed(1));
  let better_at: string = "";
  let margin: number = 0;
  if (ave_pt_60 === ave_ww_60) {
    better_at = "good with both Written Works and Performance Tasks";
  } else if (ave_pt_60 > ave_ww_60) {
    better_at = "better in Performance Tasks";
    margin = ave_pt_60 - ave_ww_60;
  } else {
    better_at = "better in Written Works";
    margin = ave_ww_60 - ave_pt_60;
  }

  margin = Number(margin.toFixed(1));

  const quarter_dataset: DataSet[] = [
    {
      label: "Quarter Grade",
      data: quarter_data,
      fill: true,
      backgroundColor: "#FFF598",
      borderColor: "#FFF598",
    },
    {
      label: "Average Grade",
      data: [80, 85, 82, 80],
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
      data: ww_scores,
      fill: true,
      backgroundColor: "rgba(75,192,192,0)",
      borderColor: "#FFF598",
    },
    {
      label: "Performance Task",
      data: pt_scores,
      fill: true,
      backgroundColor: "rgba(128,0,128, 0)",
      borderColor: "#63C7FF",
    },
  ];

  const wworks: string[] = ww_scores;
  const ptasks: string[] = pt_scores;
  for (let i = wworks.length; i < 10; i++) {
    wworks.push("no data");
  }
  for (let i = ptasks.length; i < 10; i++) {
    ptasks.push("no data");
  }

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
      <div className="bg-ocean-100 h-fit">
        <div className="mx-12 py-8">
          <h3 className="text-justify mb-4">
            Assessment: Paragraph (Large) Lorem ipsum dolor sit amet,
            consectetuer adipiscing elit, sed diam nonummy nibh euismod
            tincidunt ut laoreet dolore magna. Lorem ipsum dolor sit amet,
            consectetuer adipiscing elit, sed diam nonummy nibh euismod
            tincidunt ut laoreet dolore magna. Lorem ipsum dolor sit amet,
            consectetuer adipiscing elit, sed diam nonummy nibh euismod
            tincidunt ut laoreet dolore magna.
          </h3>
          <h2 className="font-bold text-2xl">
            Final Grade: {student?.final_grade}
          </h2>
          {/* Bar Chart */}
          <div className="grid grid-cols-9 h-fit gap-4">
            <div className="col-span-5 bg-neutral-50 p-4 rounded-xl">
              <BarChart
                labels={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
                datasets={quarter_dataset}
              />
              <p className="text-sm text-neutral-500">Fluctuation:</p>
            </div>
            {/* Overall Performance Assessment */}
            <div className="col-span-4 h-[65vh] overflow-x-auto px-3">
              <h2 className="text-xl font-bold">Overall Performance:</h2>
              <div className="grid grid-cols-7 mb-4">
                <CardInfo
                  className="col-span-4 w-full h-fit px-4 py-2 bg-tallano_gold-100 rounded-l-xl"
                  title={"Written Works"}
                  value={ave_ww_60}
                >
                  <div className="font-light text-[0.8rem]">
                    <h5 className="flex justify-between">
                      Quarter with highest grade:
                      <span className="font-semibold">1st</span>
                    </h5>
                    <h5 className="flex justify-between">
                      Quarter with lowest grade:
                      <span className="font-semibold">2nd</span>
                    </h5>
                    <h5 className="flex justify-between">
                      Surpassed students in 60:
                      <span className="font-semibold">91%</span>
                    </h5>
                    <h5 className="flex justify-between">
                      Average Rank:
                      <span className="font-semibold">2</span>
                    </h5>
                  </div>
                </CardInfo>
                <CardInfo
                  className="col-span-3 w-full h-fit px-4 py-2 bg-neutral-50 rounded-r-xl"
                  title={"Performance Tasks"}
                  value={ave_pt_60}
                >
                  <div className="text-[0.8rem]">
                    <h5 className="font-semibold">1st</h5>
                    <h5 className="font-semibold">2nd</h5>
                    <h5 className="font-semibold">91%</h5>
                    <h5 className="font-semibold">2</h5>
                  </div>
                </CardInfo>
              </div>
              <div className="flex justify-center gap-4 h-40 mb-4">
                {student?.quarter?.map((quarter, idx) => (
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
                      <h2 className="font-bold text-xl">{quarter.ranking}</h2>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-sm flex justify-between border-t border-neutral-300">
                <h6>
                  Performs {better_at} with a margin of {`(+${margin})`}
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
      <div className="mx-12 my-10 h-[90vh]">
        <div className="h-full">
          <div className="grid grid-cols-2">
            <div>
              <h1 className="font-bold text-2xl">Performance Analysis</h1>
              <h3>{myquar[quar]} Evaluation</h3>
            </div>
            {/* Grade Component */}
            <div className="col-span-1 flex justify-end gap-4">
              <div className="flex flex-col place-content-center">
                <h1 className="text-lg font-semibold">Quarter Grade:</h1>
                <h3 className="text-base">
                  Suggested Grade:{" "}
                  <span className="font-bold">{myStudent.grade_before}</span>
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
              <p className="text-sm text-neutral-500">Fluctuation:</p>
            </div>
            {/* Line Chart Assessment */}
            <div className="h-[45vh] overflow-x-auto px-3">
              <h5 className="text-justify">
                Assessment: Paragraph (Large) Lorem ipsum dolor sit amet,
                consectetuer adipiscing elit, sed diam nonummy nibh euismod
                tincidunt ut laoreet dolore magna. Lorem ipsum dolor sit amet,
                consectetuer adipiscing elit, sed diam nonummy nibh euismod
                tincidunt ut laoreet dolore magna. Lorem ipsum dolor sit amet,
                consectetuer adipiscing elit, sed diam nonummy nibh euismod
                tincidunt ut laoreet dolore magna.Assessment: Paragraph (Large)
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore
                magna.Assessment: Paragraph (Large) Lorem ipsum dolor sit amet,
                consectetuer adipiscing elit, sed diam nonummy nibh euismod
                tincidunt ut laoreet dolore magna. Lorem ipsum dolor sit amet,
                consectetuer adipiscing elit, sed diam nonummy nibh euismod
                tincidunt ut laoreet dolore magna. Lorem ipsum dolor sit amet,
                consectetuer adipiscing elit, sed diam nonummy nibh euismod
                tincidunt ut laoreet dolore magna.Assessment: Paragraph (Large)
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna.
              </h5>
            </div>
          </div>
          <div className="grid grid-cols-9 gap-4 mx-4 py-6 h-fit">
            <div className="col-span-4">
              {/* Best Performance Section */}
              <div className="">
                <h3 className="text-lg font-semibold">Best Performance</h3>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className=" h-24 bg-tallano_gold-100 py-2 rounded-3xl flex flex-col justify-between">
                    <h6 className="px-4 ">Written Work 2:</h6>
                    <div className="flex justify-end">
                      <h1 className="font-bold text-xl px-6">10/10</h1>
                    </div>
                  </div>
                  <div className=" h-24 bg-ocean-100 py-2 rounded-3xl flex flex-col justify-between">
                    <h6 className="px-4">Performance Task 1:</h6>
                    <div className="flex justify-end px-6">
                      <h1 className="font-bold text-xl">18/20</h1>
                    </div>
                  </div>
                </div>
              </div>
              {/* Tasks Streak */}
              <div className="">
                <h3 className="text-lg font-semibold">Tasks Record</h3>
                <div>
                  <h6>Written Works</h6>
                  <div className="flex gap-2">
                    {wworks.map((task) =>
                      task === "Perfect" ? (
                        <div className="rounded-full border-4 w-14 h-14 border-yellow-300">
                          <StarIcon className="text-tallano_gold-300" />
                        </div>
                      ) : task === "no data" ? (
                        <div className="w-14 h-14 bg-neutral-50 border-dashed border-2 rounded-full"></div>
                      ) : task === "Passed" ? (
                        <div className="w-14 h-14 border-4 rounded-full border-green-300">
                          <CheckIcon className="text-green-300" />
                        </div>
                      ) : (
                        <div className="w-14 h-14 border-4 border-red-300 rounded-full">
                          <XIcon className="text-red-300" />
                        </div>
                      )
                    )}
                  </div>
                </div>
                <div>
                  <h6>Performance Tasks</h6>
                  <div className="flex gap-2">
                    {ptasks.map((task) =>
                      task === "Perfect" ? (
                        <div className="rounded-full border-4 w-14 h-14 border-yellow-300">
                          <StarIcon className="text-tallano_gold-300" />
                        </div>
                      ) : task === "no data" ? (
                        <div className="w-14 h-14 bg-neutral-50 border-dashed border-2 rounded-full"></div>
                      ) : task === "Passed" ? (
                        <div className="w-14 h-14 border-4 rounded-full border-green-300">
                          <CheckIcon className="text-green-300" />
                        </div>
                      ) : (
                        <div className="w-14 h-14 border-4 border-red-300 rounded-full">
                          <XIcon className="text-red-300" />
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-5 grid grid-cols-2 gap-3 p-4">
              <div>
                <div className="relative">
                  <div className="z-40 absolute inset-0 flex justify-center items-center">
                    <div className="flex flex-col justify-center items-center">
                      <h2 className="font-bold text-3xl">
                        {tdata.ww.percentage}%
                      </h2>
                      <h3 className="text-lg font-semibold">Written Works</h3>
                    </div>
                  </div>
                  <CircularProgressbar
                    className="rounded-full z-0"
                    value={tdata.ww.percentage}
                    strokeWidth={13}
                    styles={buildStyles({
                      pathTransition:
                        tdata.ww.percentage == 0
                          ? "none"
                          : "stroke-dashoffset 0.5s ease 0s",
                      pathColor: "#FFF598",
                      trailColor: "#F5F6FA",
                      strokeLinecap: "round",
                      rotation: 0.5 + (1 - tdata.ww.percentage / 100) / 2,
                    })}
                  />
                </div>
                <div>
                  {tdata.ww.passed} out of {tdata.ww.total} - Scored{" "}
                  {tdata.ww.score_sum} out of {tdata.ww.total_item}
                </div>
              </div>
              <div>
                <div className="relative">
                  <div className="z-40 absolute inset-0 flex justify-center items-center">
                    <div className="flex flex-col justify-center items-center">
                      <h2 className="font-bold text-3xl">
                        {tdata.pt.percentage}%
                      </h2>
                      <h3 className="text-lg font-semibold">
                        Performance Tasks
                      </h3>
                    </div>
                  </div>
                  <CircularProgressbar
                    className="rounded-full z-0"
                    value={tdata.pt.percentage}
                    strokeWidth={13}
                    styles={buildStyles({
                      pathTransition:
                        tdata.pt.percentage == 0
                          ? "none"
                          : "stroke-dashoffset 0.5s ease 0s",
                      pathColor: "#63C7FF",
                      trailColor: "#F5F6FA",
                      strokeLinecap: "round",
                      rotation: 0.5 + (1 - tdata.pt.percentage / 100) / 2,
                    })}
                  />
                </div>
                <div>
                  {tdata.pt.passed} out of {tdata.pt.total} - Scored{" "}
                  {tdata.pt.score_sum} out of {tdata.pt.total_item}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[100vh]"></div>
    </>
  );
};

export default StudentInfo;
