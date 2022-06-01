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
  getScorePCT,
  getTaskScores,
  transmuteGrade,
} from "../lib/functions/grade_computation";
import { getRemarks, getTask } from "../lib/functions/formatting";
import { Dataset, Remarks, Score, TaskScores } from "../types/Task";
import { classNames } from "../lib/functions/concat";
import { setDatasets } from "react-chartjs-2/dist/utils";
import { getLabels } from "../lib/functions/chart";
import { generateFeedback } from "../lib/functions/feedback";
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
  const [q_ave_grade, setQAveGrade] = useState<number | null>(null);
  const [ave_remarks, setAveRemarks] = useState<string | undefined>("");
  const [ww_ave_pct, setWWAvePCT] = useState<number | null>(null);
  const [pt_ave_pct, setPTAvePCT] = useState<number | null>(null);
  const [remarks, setRemarks] = useState<Remarks[]>([]);
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [failedStudents, setFailedStudents] = useState<number>(0);

  useEffect(() => {
    if (!students) {
      //router.back();
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

      // get passing rate
      const quarter_grades: number[][] = getGradeArray(
        "quarter",
        students,
        qSum
      );

      //get average of quarter grades
      const ave_quarter_grades: number[] = getAverageGrade(quarter_grades);

      //ave quarter grades list
      const q_ave_grade = getAverageGrade([ave_quarter_grades])[0];
      //ave quarter grade
      setQAveGrade(q_ave_grade);
      //ave remarks
      setAveRemarks(getRemarks(q_ave_grade));

      let arr_remarks: Remarks[] = [];
      quarter_grades.map((quarter) => {
        let remarks: Remarks = {
          very_good: [],
          good: [],
          average: [],
          poor: [],
          very_poor: [],
        };
        quarter.map((grade, idx) => {
          if (grade < 75) remarks.very_poor.push(students[idx]);
          else if (grade < 83) remarks.poor.push(students[idx]);
          else if (grade < 90) remarks.average.push(students[idx]);
          else if (grade < 97) remarks.good.push(students[idx]);
          else remarks.very_good.push(students[idx]);
        });
        arr_remarks.push(remarks);
      });

      let chart_dataset: Dataset = {
        set_a: [],
        set_b: [],
      };
      for (let i = 0; i < qSum; i++) {
        chart_dataset.set_a.push(
          getScorePCT(
            arr_remarks[i].very_good.length +
              arr_remarks[i].good.length +
              arr_remarks[i].average.length,
            students.length
          )
        );
        chart_dataset.set_b.push(
          getScorePCT(
            arr_remarks[i].very_poor.length + arr_remarks[i].poor.length,
            students.length
          )
        );
      }
      setDataset(chart_dataset);
      setRemarks(arr_remarks);

      //get average task score pct
      const task_scores: TaskScores[][] = getTaskScores(students, qSum);
      const arr_ww_ave_pct: number[] = [];
      const arr_pt_ave_pct: number[] = [];
      task_scores.map((quarters) => {
        const arr_ww_ave: number[] = [];
        const arr_pt_ave: number[] = [];
        quarters.map((student) => {
          arr_ww_ave.push(student.written_works.ave_score_pct);
          arr_pt_ave.push(student.performance_tasks.ave_score_pct);
        });
        arr_ww_ave_pct.push(getAverageGrade([arr_ww_ave])[0]);
        arr_pt_ave_pct.push(getAverageGrade([arr_pt_ave])[0]);
      });

      const ww_ave_pct: number = getAverageGrade([arr_ww_ave_pct])[0];
      const pt_ave_pct: number = getAverageGrade([arr_pt_ave_pct])[0];

      setWWAvePCT(ww_ave_pct);
      setPTAvePCT(pt_ave_pct);

      // get final grades
      const final_grades: number[] = getGradeArray("final", students, qSum)[0];
      let remarks: Remarks = {
        very_good: [],
        good: [],
        average: [],
        poor: [],
        very_poor: [],
      };
      final_grades.map((grade, idx) => {
        if (grade < 75) remarks.very_poor.push(students[idx]);
        else if (grade < 83) remarks.poor.push(students[idx]);
        else if (grade < 90) remarks.average.push(students[idx]);
        else if (grade < 97) remarks.good.push(students[idx]);
        else remarks.very_good.push(students[idx]);
      });

      setFailedStudents(getScorePCT(remarks.very_poor.length, students.length));
      const message = generateFeedback(100 - failedStudents);
      console.log("Transmuted Grade: ", transmuteGrade(89) - 1);

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
                <ExclamationCircleIcon className="w-5 h-5 text-yellow-500" />
                <p className="font-light">
                  Grading Sheet is still incomplete. Displaying{" "}
                  {quarters.length} of 4 quarters only
                </p>
              </div>
            )}
            <div className="grid grid-cols-9 h-fit gap-8 mt-4">
              <div className="col-span-5 bg-neutral-50 p-4 rounded-xl">
                <BarChart
                  display={true}
                  indexAxis="x"
                  labels={getLabels("Quarter ", dataset?.set_a.length!)}
                  datasets={[
                    {
                      label: "Very Good, Good, & Average",
                      data: dataset?.set_a!,
                      fill: true,
                      backgroundColor: "#FFF598",
                      borderColor: "#FFF598",
                    },
                    {
                      label: "Poor & Very Poor",
                      data: dataset?.set_b!,
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
                  <PeopleChart
                    passed_tasks={10 - Number((failedStudents / 10).toFixed())}
                    length={10}
                    color="yellow"
                  />
                  <div className="flex justify-center">
                    <p className="font-light">
                      Not too bad,{" "}
                      <span className="font-semibold">
                        {100 - failedStudents}%
                      </span>{" "}
                      of the classroom or{" "}
                      <span className="font-semibold">
                        {10 - Number((failedStudents / 10).toFixed())}
                      </span>{" "}
                      out of <span className="font-semibold">10</span> passed
                      the school year
                    </p>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <h4 className="font-semibold text-lg">
                    Average performance of a student:{" "}
                    <span className="underline font-bold">
                      {ave_remarks} ({q_ave_grade})
                    </span>
                  </h4>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div
                      className={classNames(
                        "py-3 px-5 rounded-2xl",
                        ww_ave_grade! < 75 ? "bg-red-100" : "bg-green-100"
                      )}
                    >
                      <h6 className="">Written Works</h6>
                      <div className="flex justify-between">
                        <div className="flex flex-col justify-center">
                          <p className="font-semibold">{ww_ave_pct}%</p>
                          <p className="italic text-sm">Score PCT</p>
                        </div>
                        <div className="flex flex-col justify-center">
                          <p className="font-bold text-xl">{ww_ave_grade}%</p>
                          <p className="italic text-sm">Grade</p>
                        </div>
                      </div>{" "}
                    </div>
                    <div
                      className={classNames(
                        "py-3 px-5 rounded-2xl",
                        pt_ave_grade! < 75 ? "bg-red-100" : "bg-green-100"
                      )}
                    >
                      <h6 className="">Performance Tasks</h6>
                      <div className="flex justify-between">
                        <div className="flex flex-col justify-center">
                          <p className="font-semibold">{pt_ave_pct}%</p>
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
