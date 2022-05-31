import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import BarChart from "../components/BarChart";
import { useClassroom } from "../hooks/useSetClassroom";
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
import PeopleChart from "../components/PeopleChart";
import { Student } from "../types/Students";
import {
  getAverageGrade,
  getGrade,
  getGradeArray,
} from "../lib/functions/grade_computation";
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

const Dashboard = () => {
  const { students } = useClassroom();
  const [quarters, setQuarters] = useState<number[]>([]);
  const router = useRouter();
  const [ww_ave_grade, setWWAveGrade] = useState<number | null>(null);
  const [pt_ave_grade, setPTAveGrade] = useState<number | null>(null);

  useEffect(() => {
    if (!students) {
      router.back();
    } else {
      let qSum: any = 0;
      students[0].quarter?.map((quarter) => {
        qSum +=
          quarter.written_works?.length! > 0 ||
          quarter.performance_tasks?.length! > 0
            ? 1
            : 0;
      });

      // grade list
      const ww_grades: number[][] = getGradeArray("wworks", students, qSum);
      // ave grade per quarter list
      const ww_ave_grades: number[] = getAverageGrade(ww_grades);
      // ave grade for available quarters
      setWWAveGrade(getAverageGrade([ww_ave_grades])[0]);

      // grade list
      const pt_grades: number[][] = getGradeArray("ptasks", students, qSum);
      // ave grade per quarter list
      const pt_ave_grades: number[] = getAverageGrade(pt_grades);
      // ave grade for available quarters
      setPTAveGrade(getAverageGrade([pt_ave_grades])[0]);

      var buttons: number[] = [];
      for (var i = 1; i <= qSum; i++) {
        buttons.push(i);
      }
      setQuarters(buttons);
    }
  }, []);

  return (
    <>
      {students && (
        <div className="m-4">
          <div className="w-40 h-40 p-2">
            <Image
              src="/logo.png"
              alt="logo picture"
              width={100}
              height={100}
            />
          </div>
          <div className="grid place-content-center">
            <div>
              <h1 className="text-2xl font-bold">
                Classroom Evaluation:{" "}
                <span className="font-bold underline decoration-2">Good</span>
              </h1>
            </div>
            <div className="flex gap-4">
              {quarters.map((button, idx) => (
                <div key={idx}>
                  <Link href={`/${button}`} passHref>
                    <button className="rounded-3xl w-60 h-40 bg-ocean-100 grid place-items-center">
                      <h3 className="font-semibold text-lg">
                        Quarter {button}
                      </h3>
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-16 mx-24 h-[80vh]">
            <h2 className="text-2xl font-semibold">Quarter Summary</h2>
            {quarters.length === 4 ? (
              <div className="flex gap-1 items-center">
                <CheckCircleIcon className="w-5 h-5 text-green-500" />
                <p className="font-light">Complete Quarter Summary</p>
              </div>
            ) : (
              <div className="flex gap-1 items-center">
                <ExclamationCircleIcon className="w-5 h-5 text-orange-500" />
                <p className="font-light">
                  Grading Sheet is still incomplete. Displaying{" "}
                  {quarters.length} of 4 quarters only
                </p>
              </div>
            )}
            <div className="grid grid-cols-9 h-fit gap-8">
              <div className="col-span-5 bg-neutral-50 p-4 rounded-xl">
                <BarChart
                  display={true}
                  indexAxis="x"
                  labels={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
                  datasets={[
                    {
                      label: "Very Good, Good, & Average",
                      data: [93, 80, 77, 92],
                      fill: true,
                      backgroundColor: "#FFF598",
                      borderColor: "#FFF598",
                    },
                    {
                      label: "Poor & Very Poor",
                      data: [7, 20, 23, 8],
                      fill: true,
                      backgroundColor: "#63C7FF",
                      borderColor: "#63C7FF",
                    },
                  ]}
                />
              </div>
              <div className="col-span-4">
                <div className="pb-4">
                  <h4 className="font-semibold text-lg">Passing Rate:</h4>
                  <PeopleChart passed_tasks={7} length={10} color="yellow" />
                  <div className="flex justify-center">
                    <p className="font-light">
                      Not too bad, <span className="font-semibold">73.2%</span>{" "}
                      of the classroom or{" "}
                      <span className="font-semibold">7</span> out of{" "}
                      <span className="font-semibold">10</span> passed the
                      school year
                    </p>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <h4 className="font-semibold text-lg">
                    Average performance of a student:{" "}
                    <span className="underline font-bold">Good</span>
                  </h4>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="bg-green-100 py-3 px-5 rounded-2xl">
                      <h6 className="">Written Works</h6>
                      <div className="flex justify-between">
                        <div className="flex flex-col justify-center">
                          <p className="font-semibold">72%</p>
                          <p className="italic text-sm">Score PCT</p>
                        </div>
                        <div className="flex flex-col justify-center">
                          <p className="font-bold text-xl">{ww_ave_grade}%</p>
                          <p className="italic text-sm">Grade</p>
                        </div>
                      </div>{" "}
                    </div>
                    <div className="bg-green-100 py-3 px-5 rounded-2xl">
                      <h6 className="">Performance Tasks</h6>
                      <div className="flex justify-between">
                        <div className="flex flex-col justify-center">
                          <p className="font-semibold">72%</p>
                          <p className="italic text-sm">Score PCT</p>
                        </div>
                        <div className="flex flex-col justify-center">
                          <p className="font-bold text-xl">{pt_ave_grade}%</p>
                          <p className="italic text-sm">Grade</p>
                        </div>
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
};

export default Dashboard;
