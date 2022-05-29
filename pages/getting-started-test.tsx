import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as XLSX from "xlsx";
import { useClassroom } from "../hooks/useSetClassroom";
import {
  Student,
  TaskData,
  ScoreTotal,
  Quarter,
  SurveyResult,
  DataInference,
} from "../types/Students";
import {
  getGradeAfter,
  getRemarks,
  getSurveyResults,
  getTask,
  getWeighted,
} from "../lib/functions/formatting";
import {
  fluctuation,
  getRanking,
  quarterAnalysis,
} from "../lib/functions/analysis";
import { afterGradeInference, inferenceData } from "../lib/functions/fuzzyis";
import { getSurveyList } from "../lib/functions/sheets";
import LoadingSpinner from "../components/Loader";
import { classNames } from "../lib/functions/concat";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/outline";

const INITIAL_MESSAGE =
  "An error message will appear here if there is problem with your file";

let errors: boolean[] = [];

const gettingStarted = () => {
  const { students, setStudents } = useClassroom();
  const [fileName, setFileName] = useState(null);
  const [forms, setForms] = useState<SurveyResult[] | null>(null);
  const [text_value, setText_value] = useState("");
  const [message, setMessage] = useState<string | null>(INITIAL_MESSAGE);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  // let handleForms = async (text: string) => {
  //   setLoading(true);
  //   let gsheet = await getSurveyList(text);

  //   if (gsheet !== null) {
  //     errors[0] = true;
  //     console.log(errors[0]);
  //     if (gsheet) {
  //       errors[1] = true;
  //       setForms(gsheet);
  //       setMessage("FORMS CONNECTED");
  //     } else {
  //       errors[1] = false;
  //     }
  //   } else {
  //     setMessage("ERROR, INCORRECT TEMPLATE OR THE FORMS IS RESTRICTED");
  //     errors[0] = false;
  //     setForms(null);
  //     setStudents(null);
  //     setFileName(null);
  //   }
  //   setError(errors);
  //   setLoading(false);
  // };

  // const handleFile = async (e: any) => {
  //   const [file] = e.target.files;

  //   if (file != null) {
  //     const file_name = file.name;
  //     if (file_name.match(".xlsx")) {
  //       setFileName(file_name);
  //       errors[2] = true;
  //       setMessage("File uploaded successfully");
  //       const reader = new FileReader();

  //       reader.onload = (evt: any) => {
  //         const bstr = evt.target.result;
  //         const wb = XLSX.read(bstr, { type: "binary" });
  //         const wsname = wb.SheetNames;

  //         let classroom: Student[] = [];

  //         let students = [] as any;

  //         let quarter = [] as any;

  //         let finals = [] as any;

  //         let task_length = [] as any;

  //         if (wsname[6] === "DO NOT DELETE") {
  //           errors[3] = true;
  //           wsname.map((value, index) => {
  //             if (index != wsname.length - 1) {
  //               const ws = wb.Sheets[value];
  //               const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

  //               if (index == 0) {
  //                 if (data) {
  //                   //id purpose
  //                   let i = 0;

  //                   //Gender Flag
  //                   let male = true;

  //                   data.forEach((item: any) => {
  //                     if (item[1] == "MALE ") {
  //                       male = true;
  //                     }
  //                     if (item[1] == "FEMALE ") {
  //                       male = false;
  //                     }

  //                     if (item[1] != null && !isNaN(item[0])) {
  //                       const student_info = {
  //                         id: i,
  //                         name: item[1],
  //                         gender: male ? "MALE" : "FEMALE",
  //                       };

  //                       students.push(student_info);
  //                       i++;
  //                     }
  //                   });
  //                 }
  //               } else if (index > 0 && index < 5) {
  //                 if (data) {
  //                   let highest_score: ScoreTotal;

  //                   let quarters = [] as any;
  //                   let i = 0;

  //                   data.forEach((item: any, counter: number) => {
  //                     if (counter == 9) {
  //                       //formats the task
  //                       let total_written_work = getTask(
  //                         item as [],
  //                         5,
  //                         9,
  //                         true,
  //                         data[9] as []
  //                       );

  //                       let total_performance_work = getTask(
  //                         item as [],
  //                         18,
  //                         9,
  //                         true,
  //                         data[9] as []
  //                       );

  //                       //assignmenets of scoretotal type
  //                       const score_total: ScoreTotal = {
  //                         written_works: total_written_work,
  //                         performance_work: total_performance_work,
  //                         written_percentage: item[16],
  //                         written_weighted_score: item[17],
  //                         performance_percentage: item[29],
  //                         performance_weighted_score: item[30],
  //                       };
  //                       highest_score = score_total;
  //                       task_length.push(highest_score);
  //                     }
  //                     if (item[1] !== 0 && !isNaN(item[0])) {
  //                       //fomatting task per students
  //                       let written_works = getTask(
  //                         item as [],
  //                         5,
  //                         highest_score.written_works?.length! - 1,
  //                         false,
  //                         data[9] as []
  //                       );

  //                       let performace_works = getTask(
  //                         item as [],
  //                         18,
  //                         highest_score.performance_work?.length! - 1,
  //                         false,
  //                         data[9] as []
  //                       );

  //                       //gets the data analysis
  //                       let written_task_details = fluctuation(
  //                         written_works as TaskData[],
  //                         highest_score.written_works!
  //                       );
  //                       let performace_task_details = fluctuation(
  //                         performace_works as TaskData[],
  //                         highest_score.performance_work!
  //                       );

  //                       let remarks = getRemarks(item[35]);

  //                       let survey = getSurveyResults(forms!, students[i].name);
  //                       let infer: DataInference =
  //                         survey == undefined
  //                           ? ([] as any)
  //                           : inferenceData(survey);

  //                       let grade_after =
  //                         survey == undefined
  //                           ? 0
  //                           : item[35] +
  //                             afterGradeInference(
  //                               item[35],
  //                               infer.external_elements.value
  //                             );

  //                       grade_after = parseFloat(
  //                         getGradeAfter(grade_after).toFixed(1)
  //                       );

  //                       const quarter_grade: Quarter = {
  //                         id: i,
  //                         grade_before: item[35],
  //                         diff: parseFloat((grade_after - item[35]).toFixed(1)),
  //                         grade_after: grade_after,
  //                         remarks: remarks as string,
  //                         written_works: written_works,
  //                         performance_tasks: performace_works,
  //                         written_percentage: getWeighted(
  //                           item[16],
  //                           highest_score.written_percentage
  //                         ),
  //                         written_weighted_score: getWeighted(
  //                           item[17],
  //                           highest_score.written_weighted_score
  //                         ), // 17
  //                         performance_percentage: getWeighted(
  //                           item[29],
  //                           highest_score.performance_percentage
  //                         ), // 29
  //                         performance_weighted_score: getWeighted(
  //                           item[30],
  //                           highest_score.performance_weighted_score
  //                         ), // 30
  //                         written_tasks_analysis: written_task_details,
  //                         performace_tasks_analysis: performace_task_details,
  //                         ranking: 0,
  //                       };
  //                       i++;
  //                       quarters.push(quarter_grade);
  //                     }
  //                   });
  //                   quarter.push(quarters);
  //                 }
  //               } else if (index == 5) {
  //                 let i = 0;
  //                 data.forEach((item: any, counter: number) => {
  //                   if (item[1] !== 0 && !isNaN(item[0])) {
  //                     const finalRating = {
  //                       id: i,
  //                       final_grade: item[21],
  //                       remarks: item[25],
  //                     };
  //                     i++;
  //                     finals.push(finalRating);
  //                   }
  //                 });
  //               }
  //             }
  //           });

  //           students.map((item: any, index: number) => {
  //             let quarter_grade: Quarter[] = [];
  //             quarter.map((quart: any) => {
  //               quarter_grade.push(quart[index]);
  //             });

  //             let quarter_analysis = quarterAnalysis(quarter_grade);

  //             let survey = getSurveyResults(forms!, item.name);

  //             let infer: DataInference =
  //               survey == undefined ? ([] as any) : inferenceData(survey);

  //             let grade_after =
  //               survey == undefined
  //                 ? 0
  //                 : finals[index].final_grade +
  //                   afterGradeInference(
  //                     finals[index].final_grade,
  //                     infer.external_elements.value
  //                   );

  //             grade_after = parseFloat(getGradeAfter(grade_after).toFixed(1));

  //             const student_info: Student = {
  //               id: item.id,
  //               name: item.name,
  //               gender: item.gender,
  //               quarter: quarter_grade,
  //               quarter_analysis: quarter_analysis,
  //               final_grade_before: finals[index].final_grade,
  //               final_grade_after: grade_after,
  //               final_remarks: finals[index].remarks,
  //               remarks: getRemarks(finals[index].final_grade) as string,
  //               survey_result: survey == undefined ? ([] as any) : survey,
  //               //inference_result: inference_data,
  //               inference_result:
  //                 survey == undefined ? ([] as any) : inferenceData(survey),
  //               ranking: null,
  //             };
  //             console.log(student_info);
  //             classroom.push(student_info);
  //           });
  //           let class_list = getRanking(classroom, task_length);
  //           console.log(class_list);
  //           setStudents(class_list);
  //           setError(errors);
  //           console.log(error);
  //         } else {
  //           console.log(
  //             "excel file did not match the template, please upload another file"
  //           );

  //           setMessage("File is incompatible, file did not match the template");

  //           setFileName(null);
  //           if (students) {
  //             setStudents(null);
  //             localStorage.removeItem("students");
  //           }

  //           errors[3] = false;
  //         }
  //       };
  //       reader.readAsBinaryString(file);

  //       console.log("file permitted");
  //     } else {
  //       setFileName(null);
  //       if (students) {
  //         setStudents(null);
  //         localStorage.removeItem("students");
  //       }

  //       setMessage(
  //         "File is incompatible, system only accepts excel files with proper format"
  //       );
  //       errors[2] = false;
  //       errors[3] = false;
  //       console.log("file denied");
  //     }
  //   }
  // };
  // const checker_msg = [
  //   "Link is correct and not restricted",
  //   "Sheet template format is correct",
  //   "Uploaded file format is korik (.xlsx)",
  //   "DepEd Grading Sheet Template is met",
  //   "Names of the students are correct",
  //   "Grading Sheet is in Alphabetical Order",
  //   "Complete data",
  // ];
  // console.log(errors);

  return (
    <React.Fragment>
      <div className="bg-[url('/bg-form.jpg')] bg-cover min-h-screen">
        <div className="flex justify-center">
          <div className="space-y-2 bg-ocean-100 w-10/12 my-10 rounded-2xl p-10 xl:w-4/5">
            <div className="flex justify-between">
              <div>
                <h1 className="text-2xl font-bold">Getting Started</h1>
                <div className="my-4 w-5/6">
                  <p className="inline-block text-justify">
                    Paragraph (Large) Lorem ipsum dolor sit amet, consectetuer
                    adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                    laoreet dolore magna. Lorem ipsum dolor sit amet,
                    consectetuer adipiscing elit, sed diam nonummy nibh euismod
                    tincidunt ut laoreet dolore magna.
                  </p>
                </div>
              </div>
              <div className="">
                <Image
                  src="/logo.png"
                  alt="logo picture"
                  width={250}
                  height={230}
                />
              </div>
            </div>
            <div className="px-28 space-y-2">
              <h3 className="text-xl font-bold">Step 1:</h3>
              <div className="border-2 border-black h-56 rounded-lg"></div>
              <p className="text-justify">
                Paragraph (Large) Lorem ipsum dolor sit amet, consectetuer
                adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna. Lorem ipsum dolor sit amet, consectetuer
                adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna.
              </p>
              <div className="flex justify-between">
                <div className="text-lg">
                  <button>
                    <span className="underline decoration-2">Prev</span>
                  </button>
                </div>
                <div className="flex justify-evenly gap-2">
                  <span className="rounded-full w-3 h-3 bg-black"></span>
                  <span className="rounded-full w-3 h-3 border border-black"></span>
                  <span className="rounded-full w-3 h-3 border border-black"></span>
                </div>
                <div className="text-lg">
                  <button>
                    {" "}
                    <span className="underline decoration-2">Next</span>{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default gettingStarted;

//legends lang nakakaalam

//TOTAL SCORES index [9]

//index 15 -> total scores written

//index index

//written task 5 -> 14

//writter percentage ->16
// written weighted score -> 17

// performace task -> 18 -> 27

//performance total -> 28

//performace percentage -> 29
