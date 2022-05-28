import { Dialog, Transition } from "@headlessui/react";
import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/outline";
import React, { useContext, Fragment } from "react";
import { useSelectedStudent } from "../hooks/useSelectedStudent";
import { Line } from "react-chartjs-2";
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
import Link from "next/link";
import { classNames, studentInCategory } from "../lib/functions/concat";
import { getGrade } from "../lib/functions/grade_computation";
import { getRemarks } from "../lib/functions/formatting";

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

const StudentDialog = ({
  quarter,
  category,
  open,
  setIsOpen,
}: {
  quarter: number;
  category: string;
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { student } = useSelectedStudent();
  let diffArrow, id: number;

  if (student) {
    diffArrow =
      student.quarter![quarter].diff > 0
        ? "up"
        : student.quarter![quarter].diff === 0
        ? "neutral"
        : "down";
    id = student.id;
  }

  type DataSet = {
    label: string;
    data: number[];
    fill: true;
    backgroundColor: string;
    borderColor: string;
  };
  const ww_labels: string[] = [];
  const pt_labels: string[] = [];

  const ww_scores: number[] = [];
  const pt_scores: number[] = [];

  student?.quarter![quarter].written_works?.forEach((task) => {
    const task_label = "Task " + task.tasked_number.toString();
    const grade = getGrade(task.score);
    const score =
      (grade === -1 ? 0 : grade / task.highest_possible_score) * 100;
    ww_labels.push(task_label);
    ww_scores.push(score);
  });
  student?.quarter![quarter].performance_tasks?.forEach((task) => {
    const task_label = "Task " + task.tasked_number.toString();
    const grade = getGrade(task.score);
    const score =
      (grade === -1 ? 0 : grade / task.highest_possible_score) * 100;
    pt_labels.push(task_label);
    pt_scores.push(score);
  });

  const ww_dataToRender: DataSet = {
    label: "Written Works",
    data: ww_scores,
    fill: true,
    backgroundColor: "rgba(75,192,192,0)",
    borderColor: "#FFF598",
  };
  const pt_dataToRender: DataSet = {
    label: "Performance Tasks",
    data: pt_scores,
    fill: true,
    backgroundColor: "rgba(128,0,128, 0)",
    borderColor: "#63C7FF",
  };

  const dataToRender: DataSet[] = [ww_dataToRender, pt_dataToRender];

  const data_to_render =
    category === "Over All"
      ? dataToRender
      : "Written Works"
      ? [ww_dataToRender]
      : [pt_dataToRender];

  console.log(data_to_render);
  type Chart = {
    labels: string[];
    datasets: DataSet | DataSet[];
  };

  const this_labels =
    category === "Over All"
      ? ww_labels.length > pt_labels.length
        ? ww_labels
        : pt_labels
      : "Written Works"
      ? ww_labels
      : pt_labels;
  const dataChart: Chart = {
    labels:
      category === "Over All"
        ? ww_labels.length > pt_labels.length
          ? ww_labels
          : pt_labels
        : "Written Works"
        ? ww_labels
        : pt_labels,
    datasets: data_to_render,
  };

  const data =
    category === "Written Works"
      ? student?.quarter![quarter].written_works
      : category === "Performance Tasks"
      ? student?.quarter![quarter].performance_tasks
      : null;

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto ">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-5xl h-[65vh] transform overflow-hidden rounded-2xl bg-white p-10 text-left align-middle shadow-xl transition-all">
                <div className="">
                  <div className="grid grid-cols-2">
                    <div className="col-span-1 flex gap-4">
                      <span
                        className={classNames(
                          "border h-16 w-16 rounded-full grid place-items-center",
                          student?.quarter![quarter].remarks === "Very Poor"
                            ? "bg-red-200"
                            : "bg-yellow-200"
                        )}
                      >
                        <h1 className="font-bold text-xl">
                          {student?.quarter![quarter].grade_after}
                        </h1>
                      </span>
                      <div className="">
                        <h1 className="font-bold text-lg">
                          Suggested Grade Adjustment
                        </h1>
                        <div className="flex place-items-center">
                          <p className="">
                            Grade before:{" "}
                            {student?.quarter![quarter].grade_before}
                          </p>
                          {diffArrow === "up" ? (
                            <ArrowSmUpIcon className="w-5 h-5 text-green-400" />
                          ) : diffArrow === "down" ? (
                            <ArrowSmDownIcon className="w-5 h-5 text-red-400" />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-span-1">
                      <Dialog.Title
                        as="h1"
                        className="flex justify-end text-2xl font-semibold leading-6 text-gray-900 w-full mb-2"
                      >
                        {student?.name}
                      </Dialog.Title>
                      <div className="flex justify-end font-medium border-b">
                        {student?.gender}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 mt-2 h-72">
                    <div className="overflow-auto">
                      <h4 className="pl-6 font-semibold">{category}</h4>
                      <Line
                        data={{
                          labels: this_labels,
                          datasets: data_to_render,
                        }}
                        options={{
                          scales: {
                            y: { max: 100, min: 0, ticks: { stepSize: 20 } },
                          },
                          plugins: {
                            legend: {
                              display: false,
                            },
                          },
                        }}
                      />
                      <pre>
                        {/* {data ? JSON.stringify(data, null, 2) : "No data"} */}
                      </pre>
                    </div>
                    <div className="col-start-2 overflow-y-auto">
                      <div className="h-10 flex gap-2">
                        <span
                          className={classNames(
                            "w-fit  p-2 flex justify-center items-center rounded-full font-semibold",
                            getRemarks(
                              getGrade(
                                category === "Over All"
                                  ? student!.quarter![quarter].grade_before
                                  : category === "Written Works"
                                  ? student!.quarter![quarter]
                                      .written_percentage?.score!
                                  : student!.quarter![quarter]
                                      .performance_percentage?.score!
                              )
                            ) === "Very Poor"
                              ? "bg-red-200"
                              : "bg-ocean-100"
                          )}
                        >
                          {getRemarks(
                            getGrade(
                              category === "Over All"
                                ? student!.quarter![quarter].grade_before
                                : category === "Written Works"
                                ? student!.quarter![quarter].written_percentage
                                    ?.score!
                                : student!.quarter![quarter]
                                    .performance_percentage?.score!
                            )
                          )}
                        </span>
                        {(category === "Over All"
                          ? student!.quarter![quarter].ranking!
                          : category === "Written Works"
                          ? student?.quarter![quarter].written_percentage
                              ?.ranking!
                          : student?.quarter![quarter].performance_percentage
                              ?.ranking!) < 6 && (
                          <span
                            className={classNames(
                              "w-fit bg-yellow-100 p-2 flex justify-center items-center rounded-full font-semibold"
                            )}
                          >
                            Rank{" "}
                            {studentInCategory(
                              category,
                              student!.quarter![quarter].ranking!,
                              student?.quarter![quarter].written_percentage
                                ?.ranking!,
                              student?.quarter![quarter].performance_percentage
                                ?.ranking!
                            )}
                          </span>
                        )}
                      </div>
                      <p className="inline-block text-justify">
                        Assessment: Paragraph (Large) Lorem ipsum dolor sit
                        amet, consectetuer adipiscing elit, sed diam nonummy
                        nibh euismod tincidunt ut laoreet dolore magna. Lorem
                        ipsum dolor sit amet, consectetuer adipiscing elit, sed
                        diam nonummy nibh euismod tincidunt ut laoreet dolore
                        magna. Lorem ipsum dolor sit amet, consectetuer
                        adipiscing elit, sed diam nonummy nibh euismod tincidunt
                        ut laoreet dolore magna.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Link href={`/${quarter + 1}/${student?.id}`} passHref>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-ocean-100 px-4 py-2 text-base font-medium text-ocean-400 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        setIsOpen(false);
                      }}
                    >
                      View Full Details
                    </button>
                  </Link>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default StudentDialog;
