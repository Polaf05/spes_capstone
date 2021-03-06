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
import {
  getAverageGrade,
  getGrade,
  getGradeArray,
  getScorePCT,
  getStudentAverage,
  getTaskScores,
  transmuteGrade,
} from "../lib/functions/grade_computation";
import { getRemarks, getTask } from "../lib/functions/formatting";
import { Dataset, Remarks, Score, TaskInfo, TaskScores } from "../types/Task";
import { classNames } from "../lib/functions/concat";
import { getLabels } from "../lib/functions/chart";
import {
  getClassPerformanceAssessment,
  getMarginResults,
  getPassingRemarks,
} from "../lib/functions/feedback";
import { useSelectedQuarter } from "../hooks/useSelectedQuarter";
import Footer from "../components/sections/Footer";
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
import { getTasksInfo } from "../lib/functions/tasks";
import { Student } from "../types/Students";

const Dashboard = () => {
  const { students } = useClassroom();
  const { quarter, setQuarter } = useSelectedQuarter();
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
  const [message_remarks, setMsgRemarks] = useState<string[]>([]);
  const [ww_ave_class_participation, setWWAveCPar] = useState<number | null>(
    null
  );
  const [pt_ave_class_participation, setPTAveCPar] = useState<number | null>(
    null
  );
  const [ww_ave_participants_arr, setWWAveParArr] = useState<number[]>([]);
  const [pt_ave_participants_arr, setPTAveParArr] = useState<number[]>([]);
  const [failedStudentsPCT, setFailedStudentsPCT] = useState<number>(0);
  useEffect(() => {
    // if (!user.user) {
    //   router.push("/login");
    // } else {
    if (!students) {
      router.push("/getting-started");
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
      quarter_grades.map((quarter, i) => {
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

      let failedStudentsCount = 0;
      students.map((student) => {
        const student_ave_remarks = getRemarks(
          getStudentAverage(student, qSum)
        );

        ////console.log(student.name, ": ", student_ave_remarks);
        if (student_ave_remarks.match(/Very Poor/g)) failedStudentsCount += 1;
      });
      ////console.log(failedStudentsCount);

      setFailedStudentsPCT(getScorePCT(failedStudentsCount, students.length));

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

      setFailedStudents(
        quarters.length === 4
          ? getScorePCT(remarks.very_poor.length, students.length)
          : 0
      );

      var buttons: number[] = [];
      for (var i = 1; i <= qSum; i++) {
        buttons.push(i);
      }
      setQuarters(buttons);
      setMsgRemarks(getPassingRemarks(100 - failedStudents, quarters.length));

      const ww_task_array: TaskInfo[][] = [];
      const pt_task_array: TaskInfo[][] = [];

      for (let i = 0; i < qSum; i++) {
        ww_task_array.push(getTasksInfo(students, i, "written works"));
        pt_task_array.push(getTasksInfo(students, i, "performance tasks"));
      }

      let ww_ave_participants_arr: number[] = [];
      let pt_ave_participants_arr: number[] = [];

      ww_task_array.forEach((quarter) => {
        quarter.forEach((task) => {
          ww_ave_participants_arr.push(
            getScorePCT(task.participated, students.length)
          );
        });
      });
      pt_task_array.forEach((quarter) => {
        quarter.forEach((task) => {
          pt_ave_participants_arr.push(
            getScorePCT(task.participated, students.length)
          );
        });
      });

      setWWAveParArr(ww_ave_participants_arr);
      setPTAveParArr(pt_ave_participants_arr);

      const ww_ave_participant = getAverageGrade([ww_ave_participants_arr])[0];
      const pt_ave_participant = getAverageGrade([pt_ave_participants_arr])[0];
      setWWAveCPar(ww_ave_participant);
      setPTAveCPar(pt_ave_participant);
    }
    //}
  }, []);

  const barchart_remarks: string[] = getMarginResults(dataset!, "");

  return (
    <>
      {students && (
        <>
          <div className="m-4">
            <div className="w-full flex justify-between px-12">
              <div className="flex flex-col justify-center">
                {" "}
                <h2 className="text-xl xl:text-2xl font-bold">
                  Student Performance Evaluation System
                </h2>
              </div>
              <div className="w-20 h-20 xl:w-40 xl:h-40 p-2">
                <Link href={`/`} passHref>
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
            <div className="grid grid-cols-5">
              <div className="col-span-3 col-start-2">
                <h1 className="text-xl xl:text-2xl font-semibold">
                  Classroom Evaluation:{" "}
                  <span className="font-bold underline decoration-2"></span>
                </h1>
                <div className="flex gap-4 justify-center">
                  {quarters.map((button, idx) => (
                    <div key={idx}>
                      <Link href={`/classroom`} passHref>
                        <button
                          onClick={() => {
                            setQuarter(idx);
                          }}
                          className="rounded-3xl w-36 h-24 lg:w-36 lg:h-24 xl:w-48 xl:h-36 bg-ocean-100 hover:bg-ocean-400 hover:text-white grid place-items-center"
                        >
                          <h3 className="font-semibold text-lg">
                            Quarter {button}
                          </h3>
                        </button>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-16 mx-12 lg:mx-20 xl:mx-24 h-[100vh]">
              <div className="flex justify-between">
                <h2 className="text-lg xl:text-2xl font-semibold">
                  Quarter Summary
                </h2>
                <Link href="/getting-started" passHref>
                  <button className="border-2 border-ocean-400 w-60 py-3 px-2 text-semibold bg-white hover:bg-ocean-100 hover:border-ocean-100 ">
                    Generate new evaluation
                  </button>
                </Link>
              </div>
              <div className="flex gap-1 text-sm xl:text-lg items-center">
                {quarters.length === 4 ? (
                  <>
                    <CheckCircleIcon className="w-3 h-3 xl:w-5 xl:h-5 text-green-500" />
                    <p className="font-light">Complete Quarter Summary</p>
                  </>
                ) : (
                  <>
                    <ExclamationCircleIcon className="w-3 h-3 xl:w-5 xl:h-5 text-yellow-500" />
                    <p className="font-light">
                      Grading Sheet is still incomplete. Displaying{" "}
                      {quarters.length} of 4 quarters only
                    </p>
                  </>
                )}
              </div>
              <div className="grid grid-flow-row grid-cols-9 h-fit gap-8 mt-4 mb-20">
                <div className="col-span-9 xl:col-span-5">
                  <div className="px-16 xl:p-4">
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

                    <div>
                      {barchart_remarks.map((remarks, idx) => (
                        <p key={idx} className="text-sm font-light">
                          {remarks}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-span-9 md:px-16 xl:col-span-4 xl:px-2">
                  <div className="pb-4 w-full">
                    <h4 className="font-semibold text-lg">Passing Rate:</h4>
                    <div className="flex justify-center">
                      <div className="">
                        <PeopleChart
                          passed_tasks={
                            10 - Number((failedStudentsPCT / 10).toFixed())
                          }
                          length={10}
                          color="yellow"
                        />
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <p className="font-light text-center">
                        {getPassingRemarks(
                          100 - failedStudentsPCT,
                          quarters.length
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <h4 className="font-semibold text-lg">
                      Average performance of a student:{" "}
                      <span
                        className={classNames(
                          "underline font-bold",
                          ave_remarks?.match(/Poor/g) ? "text-red-400" : ""
                        )}
                      >
                        {ave_remarks} ({q_ave_grade})
                      </span>
                    </h4>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div
                        className={classNames(
                          "py-3 px-5 rounded-2xl",
                          ww_ave_grade! < 60 ? "bg-red-100" : "bg-green-100"
                        )}
                      >
                        <h6 className="">Written Works</h6>
                        <div className="flex justify-between">
                          <div className="flex flex-col justify-center">
                            <p className="font-semibold">
                              {ww_ave_class_participation}%
                            </p>
                            <p className="italic text-sm">
                              Ave Class Participation
                            </p>
                            <p className="font-semibold">{ww_ave_pct}%</p>
                            <p className="italic text-sm">Ave Score PCT</p>
                          </div>
                          <div className="flex flex-col justify-center">
                            <p className="font-bold text-xl text-right">
                              {transmuteGrade(ww_ave_grade!)}%
                            </p>
                            <p className="italic text-sm">
                              Ave Transmuted Grade
                            </p>
                          </div>
                        </div>{" "}
                      </div>
                      <div
                        className={classNames(
                          "py-3 px-5 rounded-2xl",
                          pt_ave_grade! < 60 ? "bg-red-100" : "bg-green-100"
                        )}
                      >
                        <h6 className="">Performance Tasks</h6>
                        <div className="flex justify-between">
                          <div className="flex flex-col justify-center">
                            <p className="font-semibold">
                              {pt_ave_class_participation}%
                            </p>
                            <p className="italic text-sm">
                              Ave Class Participation
                            </p>
                            <p className="font-semibold">{pt_ave_pct}%</p>
                            <p className="italic text-sm">Ave Score PCT</p>
                          </div>
                          <div className="flex flex-col justify-center">
                            <p className="font-bold text-xl text-right">
                              {transmuteGrade(pt_ave_grade!)}%
                            </p>
                            <p className="italic text-sm">
                              Ave Transmuted Grade
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-justify font-light">
                      {getClassPerformanceAssessment(
                        quarters.length,
                        dataset!,
                        ave_remarks!,
                        q_ave_grade!,
                        ww_ave_grade!,
                        ww_ave_pct!,
                        ww_ave_class_participation!,
                        pt_ave_grade!,
                        pt_ave_pct!,
                        pt_ave_class_participation!
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default Dashboard;

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
