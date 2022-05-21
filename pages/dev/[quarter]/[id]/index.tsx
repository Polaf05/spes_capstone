import Image from "next/image";
import React from "react";
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
import { Line } from "react-chartjs-2";
import { StarIcon } from "@heroicons/react/solid";
import { CheckCircleIcon, CheckIcon, XIcon } from "@heroicons/react/outline";

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
  const { student } = useSelectedStudent();

  let diffArrow, stud_id: number;

  if (student) {
    diffArrow =
      student.quarter![quarter].diff > 0
        ? "up"
        : student.quarter![quarter].diff === 0
        ? "neutral"
        : "down";
  }

  type DataSet = {
    label: string;
    data: number[];
    fill: true;
    backgroundColor: string;
    borderColor: string;
  };
  const ww_labels: string[] = [];
  const ww_scores: number[] = [];
  const pt_labels: string[] = [];
  const pt_scores: number[] = [];

  student?.quarter![quarter].written_works?.forEach((task) => {
    const task_label = "Task " + task.tasked_number.toString();
    ww_labels.push(task_label);
    ww_scores.push(task.score);
  });
  student?.quarter![quarter].performance_tasks?.forEach((task) => {
    const task_label = "Task " + task.tasked_number.toString();
    pt_labels.push(task_label);
    pt_scores.push(task.score);
  });

  const dataToRender: DataSet[] = [
    {
      label: "Written Works",
      data: ww_scores,
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
    },
    {
      label: "Performance Task",
      data: pt_scores,
      fill: true,
      backgroundColor: "rgba(128,0,128, 0.2)",
      borderColor: "rgba(139,0,139,1)",
    },
  ];
  const dataChart = {
    labels: ww_labels.length > pt_labels.length ? ww_labels : pt_labels,
    datasets: dataToRender,
  };

  const wworks = [70, 85, 80, 100, 95];
  const ptasks = [85, 95, 65];
  for (let i = wworks.length; i < 10; i++) {
    wworks.push(-1);
  }
  for (let i = ptasks.length; i < 10; i++) {
    ptasks.push(-1);
  }

  return (
    <>
      {/* Header */}
      <div className="mx-12 py-2 h-[10vh]">
        <div className="w-20 h-20 p-1">
          <Image src="/logo.png" alt="logo picture" width={100} height={100} />
        </div>
      </div>
      {/* General Section */}
      <div className="mx-12 my-10 h-[90vh]">
        <div className="mb-4 grid grid-cols-3">
          <div className="col-span-2">
            <h1 className=" text-xl">Student Evaluation</h1>
            <h1 className="font-bold font-poppins text-3xl">{student?.name}</h1>
            <h6>{student?.gender}</h6>
          </div>
          <div className="col-span-1 flex justify-end gap-4">
            <div className="flex flex-col place-content-center">
              <h1 className="text-lg font-semibold">Suggested Grade:</h1>
              <h3 className="text-base">
                Grade Before:{" "}
                <span className="font-bold">
                  {student?.quarter![quarter].grade_before}
                </span>
              </h3>
              <div className="flex justify-between">
                <h3>
                  Class Ranking: <span className="font-bold">1</span>
                </h3>
                <StarIcon className="h-5" />
              </div>
            </div>
            <div className="grid place-content-center">
              <div className="grid place-content-center w-28 h-28 rounded-full bg-ocean-100">
                <h1 className="font-bold text-3xl">
                  {student?.quarter![quarter].grade_after}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-9 h-fit gap-4">
          <div className="col-span-6">
            <Line
              className="border-b pb-2"
              data={dataChart}
              options={{
                scales: {
                  y: { max: 10, min: 0, ticks: { stepSize: 2 } },
                },
                plugins: {
                  legend: {
                    display: true,
                    position: "top",
                  },
                },
              }}
            />
            <p className="text-sm text-neutral-500">Fluctuation:</p>
          </div>
          <div className="col-span-3 h-[60vh] overflow-x-auto px-3">
            <h5 className="text-justify text-lg">
              Assessment: Paragraph (Large) Lorem ipsum dolor sit amet,
              consectetuer adipiscing elit, sed diam nonummy nibh euismod
              tincidunt ut laoreet dolore magna. Lorem ipsum dolor sit amet,
              consectetuer adipiscing elit, sed diam nonummy nibh euismod
              tincidunt ut laoreet dolore magna. Lorem ipsum dolor sit amet,
              consectetuer adipiscing elit, sed diam nonummy nibh euismod
              tincidunt ut laoreet dolore magna.Assessment: Paragraph (Large)
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna. Lorem
              ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna. Lorem
              ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna.Assessment:
              Paragraph (Large) Lorem ipsum dolor sit amet, consectetuer
              adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
              laoreet dolore magna. Lorem ipsum dolor sit amet, consectetuer
              adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
              laoreet dolore magna. Lorem ipsum dolor sit amet, consectetuer
              adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
              laoreet dolore magna.Assessment: Paragraph (Large) Lorem ipsum
              dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
              nibh euismod tincidunt ut laoreet dolore magna. Lorem ipsum dolor
              sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
              euismod tincidunt ut laoreet dolore magna. Lorem ipsum dolor sit
              amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
              tincidunt ut laoreet dolore magna.
            </h5>
          </div>
        </div>
      </div>
      <div className=" h-[100vh]">
        <div className="mx-12 py-12 h-full">
          <h1 className="font-bold text-2xl">Performance Analysis</h1>
          <div className="grid grid-cols-2 gap-4 mx-4 py-6 h-full">
            <div className="flex flex-col gap-4">
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
                      task === 100 ? (
                        <div className="rounded-full border-4 w-14 h-14 border-yellow-300">
                          <StarIcon className="text-tallano_gold-300" />
                        </div>
                      ) : task === -1 ? (
                        <div className="w-14 h-14 bg-neutral-50 border-dashed border-2 rounded-full"></div>
                      ) : task >= 75 ? (
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
                      task === 100 ? (
                        <div className="rounded-full border-4 w-14 h-14 border-yellow-300">
                          <StarIcon className="text-tallano_gold-300" />
                        </div>
                      ) : task === -1 ? (
                        <div className="w-14 h-14 bg-neutral-50 border-dashed border-2 rounded-full"></div>
                      ) : task >= 75 ? (
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
            <div className="border"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentInfo;
