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

const StudentDialog = ({
  category,
  open,
  setIsOpen,
  topStudents,
}: {
  category: string;
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  topStudents: number[];
}) => {
  const { student } = useSelectedStudent();
  let diffArrow, id: number;
  if (student) {
    diffArrow =
      student.diff > 0 ? "up" : student.diff === 0 ? "neutral" : "down";
    id = student.id;
  }

  type DataSet = {
    label: string;
    data: number[];
    fill: true;
    backgroundColor: string;
    borderColor: string;
  };

  const labels: string[] = [];
  const scores: number[] = [];
  if (category === "Written Works") {
    student?.written_works?.forEach((task) => {
      const task_label = "Task " + task.tasked_number.toString();
      labels.push(task_label);
      scores.push(task.score);
    });
  } else if (category === "Performance Task") {
    student?.performance_tasks?.forEach((task) => {
      labels.push("Task " + task.tasked_number.toString());
    });
  }
  const dataToRender: DataSet = {
    label: category,
    data: scores,
    fill: true,
    backgroundColor: "rgba(75,192,192,0.2)",
    borderColor: "rgba(75,192,192,1)",
  };
  const dataChart = {
    labels: labels,
    datasets: [dataToRender],
  };

  const data =
    category === "Written Works"
      ? student?.written_works
      : category === "Performance Tasks"
      ? student?.performance_tasks
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
                          student?.remarks === "Very Good"
                            ? "bg-yellow-200"
                            : "bg-slate-300"
                        )}
                      >
                        <h1 className="font-bold text-xl">
                          {student?.grade_after}
                        </h1>
                      </span>
                      <div className="">
                        <h1 className="font-bold text-lg">
                          Suggested Grade Adjustment
                        </h1>
                        <div className="flex place-items-center">
                          <p className="">
                            Grade before: {student?.grade_before}
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
                        Male
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 mt-2 h-72">
                    <div className="overflow-auto">
                      {/* {topStudents.includes(id)
                        ? `Top ${topStudents.indexOf(id) + 1}`
                        : ""} */}
                      <h4 className="pl-6 font-semibold">Written Works</h4>
                      <Line
                        data={dataChart}
                        options={{
                          scales: {
                            y: { max: 10, min: 0, ticks: { stepSize: 2 } },
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
                  <Link href={"/dev/test"} passHref>
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
