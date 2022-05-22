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
import { Bar, Line } from "react-chartjs-2";
import { StarIcon } from "@heroicons/react/solid";
import { CheckCircleIcon, CheckIcon, XIcon } from "@heroicons/react/outline";
import BarChart from "../../../../components/BarChart";
import { DataSet, Student } from "../../../../types/Students";
import CardInfo from "../../../../components/CardInfo";
import { useClassroom } from "../../../../hooks/useSetClassroom";

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
  const my_student = student?.quarter![quarter - 1]!;

  //get all quarter grades
  const quarter_data: number[] = [];
  for (let i = 0; i < 4; i++)
    quarter_data.push(student?.quarter![i].grade_before!);
  const quarter_dataset: DataSet[] = [
    {
      label: "Quarter Grade",
      data: quarter_data,
      fill: true,
      backgroundColor: "rgba(75,192,192,0.8)",
      borderColor: "rgba(75,192,192,1)",
    },
    {
      label: "Average Grade",
      data: [80, 85, 82, 80],
      fill: true,
      backgroundColor: "rgba(128,0,128, 0.2)",
      borderColor: "rgba(139,0,139,1)",
    },
  ];

  let diffArrow, stud_id: number;
  if (student) {
    diffArrow =
      my_student.diff > 0 ? "up" : my_student.diff === 0 ? "neutral" : "down";
  }

  const ww_labels: string[] = [];
  const ww_scores: number[] = [];
  const pt_labels: string[] = [];
  const pt_scores: number[] = [];

  my_student.written_works?.forEach((task) => {
    const task_label = "Task " + task.tasked_number.toString();
    const score = (task.score / task.highest_posible_score) * 100;
    ww_labels.push(task_label);
    ww_scores.push(score);
  });
  my_student.performance_tasks?.forEach((task) => {
    const task_label = "Task " + task.tasked_number.toString();
    const score = (task.score / task.highest_posible_score) * 100;
    pt_labels.push(task_label);
    pt_scores.push(score);
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

  const wworks: number[] = ww_scores;
  const ptasks: number[] = pt_scores;
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
      <div className="bg-ocean-100 h-[110vh]">
        <div className="mx-12 py-10">
          <h3 className="text-justify mb-4">
            Assessment: Paragraph (Large) Lorem ipsum dolor sit amet,
            consectetuer adipiscing elit, sed diam nonummy nibh euismod
            tincidunt ut laoreet dolore magna. Lorem ipsum dolor sit amet,
            consectetuer adipiscing elit, sed diam nonummy nibh euismod
            tincidunt ut laoreet dolore magna. Lorem ipsum dolor sit amet,
            consectetuer adipiscing elit, sed diam nonummy nibh euismod
            tincidunt ut laoreet dolore magna.
          </h3>
          <h2 className="font-bold text-2xl">Grades:</h2>
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
                  value={96}
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
                      Surpassed students in percentage:
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
                  value={88}
                >
                  <div className="text-[0.8rem]">
                    <h5 className="font-semibold">1st</h5>
                    <h5 className="font-semibold">2nd</h5>
                    <h5 className="font-semibold">91%</h5>
                    <h5 className="font-semibold">2</h5>
                  </div>
                </CardInfo>
              </div>
              <div className="flex h-40 gap-2">
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
                      <h2 className="font-bold text-xl">1</h2>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2">
                <h6>
                  Average Grade: <span className="font-bold">89.5</span> ,
                  Average Rank: <span className="font-bold">2</span>
                </h6>
                <h6>
                  Performs better in{" "}
                  <span className="font-bold">written works</span> with a margin
                  of +8
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-12"></div>
      </div>
      {/* Quarter Section */}
      <div className="mx-12 my-10 h-[90vh]">
        <div className="mb-4 grid grid-cols-3">
          {/* Grade Component 
          <div className="col-span-1 flex justify-end gap-4">
            <div className="flex flex-col place-content-center">
              <h1 className="text-lg font-semibold">Suggested Grade:</h1>
              <h3 className="text-base">
                Grade Before:{" "}
                <span className="font-bold">{my_student.grade_before}</span>
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
                <h1 className="font-bold text-3xl">{my_student.grade_after}</h1>
              </div>
            </div>
          </div> */}
        </div>
        {/* <div className="grid grid-cols-9 h-fit gap-4">
          <div className="col-span-6">
            <BarChart
              labels={
                ww_labels.length >= pt_labels.length ? ww_labels : pt_labels
              }
              datasets={dataToRender}
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
        </div> */}
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
