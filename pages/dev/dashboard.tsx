import React, { useState } from "react";
import { DownloadIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import * as XLSX from "xlsx";
import { useClassroom } from "../../hooks/useSetClassroom";
import { Student, TaskData, ScoreTotal, Quarter } from "../../types/Students";
import { getEmojiList } from "../api/sheets";
import {
  getRemarks,
  getSurveyResults,
  getTask,
  getWeighted,
} from "../../lib/functions/formatting";
import { fluctuation, getRanking } from "../../lib/functions/analysis";
import { inferenceData } from "../../lib/functions/fuzzyis";

const INITIAL_MESSAGE =
  "An error message will appear here if there is problem with your file";

const gettingStarted = (emojis: any) => {
  const { students, setStudents } = useClassroom();
  const [fileName, setFileName] = useState(null);
  const [message, setMessage] = useState<string | null>(INITIAL_MESSAGE);
  const { emojis: surveyResults } = emojis;

  const handleFile = (e: any) => {
    const [file] = e.target.files;

    if (file != null) {
      const file_name = file.name;
      if (file_name.match(".xlsx")) {
        setFileName(file_name);
        setMessage("File uploaded successfully");
        const reader = new FileReader();

        reader.onload = (evt: any) => {
          const bstr = evt.target.result;
          const wb = XLSX.read(bstr, { type: "binary" });
          const wsname = wb.SheetNames;

          let classroom: Student[] = [];

          let students = [] as any;

          let quarter = [] as any;

          let finals = [] as any;

          wsname.map((value, index) => {
            if (index != wsname.length - 1) {
              const ws = wb.Sheets[value];
              const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

              if (index == 0) {
                if (data) {
                  //id purpose
                  let i = 0;

                  //Gender Flag
                  let male = true;

                  data.forEach((item: any) => {
                    if (item[1] == "MALE ") {
                      male = true;
                    }
                    if (item[1] == "FEMALE ") {
                      male = false;
                    }

                    if (item[1] != null && !isNaN(item[0])) {
                      const student_info = {
                        id: i,
                        name: item[1],
                        gender: male ? "MALE" : "FEMALE",
                      };

                      students.push(student_info);
                      i++;
                    }
                  });
                }
              } else if (index > 0 && index < 5) {
                if (data) {
                  let highest_score: ScoreTotal;

                  let quarters = [] as any;
                  let i = 0;

                  data.forEach((item: any, counter: number) => {
                    if (counter == 9) {
                      //formats the task
                      let total_written_work = getTask(
                        item as [],
                        5,
                        9,
                        true,
                        data[9] as []
                      );

                      let total_performance_work = getTask(
                        item as [],
                        18,
                        9,
                        true,
                        data[9] as []
                      );

                      //assignmenets of scoretotal type
                      const score_total: ScoreTotal = {
                        written_works: total_written_work,
                        performance_work: total_performance_work,
                        written_percentage: item[16],
                        written_weighted_score: item[17],
                        performance_percentage: item[29],
                        performance_weighted_score: item[30],
                      };
                      highest_score = score_total;
                    }
                    if (item[1] !== 0 && !isNaN(item[0])) {
                      //fomatting task per students
                      let written_works = getTask(
                        item as [],
                        5,
                        highest_score.written_works?.length! - 1,
                        false,
                        data[9] as []
                      );

                      let performace_works = getTask(
                        item as [],
                        18,
                        highest_score.performance_work?.length! - 1,
                        false,
                        data[9] as []
                      );

                      //gets the data analysis
                      let written_task_details = fluctuation(
                        written_works as TaskData[],
                        highest_score.written_works!
                      );
                      let performace_task_details = fluctuation(
                        performace_works as TaskData[],
                        highest_score.performance_work!
                      );

                      let remarks = getRemarks(item[35]);

                      const quarter_grade: Quarter = {
                        id: i,
                        grade_before: item[35],
                        diff: 90 - item[35],
                        grade_after: 90,
                        remarks: remarks as string,
                        written_works: written_works,
                        performance_tasks: performace_works,
                        written_percentage: getWeighted(
                          item[16],
                          highest_score.written_percentage
                        ),
                        written_weighted_score: getWeighted(
                          item[17],
                          highest_score.performance_weighted_score
                        ), // 17
                        performance_percentage: getWeighted(
                          item[29],
                          highest_score.performance_percentage
                        ), // 29
                        performance_weighted_score: getWeighted(
                          item[30],
                          highest_score.performance_weighted_score
                        ), // 30
                        written_tasks_analysis: written_task_details,
                        performace_tasks_analysis: performace_task_details,
                        ranking: 0,
                      };
                      i++;
                      quarters.push(quarter_grade);
                    }
                  });
                  quarter.push(quarters);
                }
              } else if (index == 5) {
                let i = 0;
                data.forEach((item: any, counter: number) => {
                  if (item[1] !== 0 && !isNaN(item[0])) {
                    const finalRating = {
                      id: i,
                      final_grade: item[21],
                      remarks: item[25],
                    };
                    i++;
                    finals.push(finalRating);
                  }
                });
              }
            }
          });

          students.map((item: any, index: number) => {
            let quarter_grade: Quarter[] = [];
            quarter.map((quart: any) => {
              quarter_grade.push(quart[index]);
            });

            let survey = getSurveyResults(surveyResults, item.name);

            const student_info: Student = {
              id: item.id,
              name: item.name,
              gender: item.gender,
              quarter: quarter_grade,
              final_grade: finals[index].final_grade,
              remarks: finals[index].remarks,
              survey_result: survey == undefined ? ([] as any) : survey,
              //inference_result: inference_data,
              inference_result:
                survey == undefined ? ([] as any) : inferenceData(survey),
              ranking: null,
            };
            console.log(student_info);
            classroom.push(student_info);
          });

          let class_list = getRanking(classroom);
          setStudents(class_list);
        };
        reader.readAsBinaryString(file);
        console.log("file permitted");
      } else {
        setFileName(null);
        if (students) {
          setStudents(null);
          localStorage.removeItem("students");
        }

        setMessage(
          "File is incompatible, system only accepts excel files with proper format"
        );
        console.log("file denied");
      }
    }
  };
  return (
    <React.Fragment>
      <div className="bg-[url('/bg-form.jpg')] bg-cover min-h-screen">
        <div className="flex justify-center">
          <div className="flex flex-row justify-between bg-ocean-100 w-10/12 border border-black  my-32 rounded-xl p-20 xl:w-3/5">
            <section className="grid justify-items-start w-2/3">
              <h1 className="text-2xl font-bold">Getting Started</h1>
              <section className="m-4">
                <h6 className="text-lg font-bold">Instructions</h6>
                <p className="inline-block text-justify">
                  Paragraph (Large) Lorem ipsum dolor sit amet, consectetuer
                  adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                  laoreet dolore magna. Lorem ipsum dolor sit amet, consectetuer
                  adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                  laoreet dolore magna.
                </p>
              </section>
              <section className="m-4 space-y-4">
                {students ? (
                  <h6 className="text-lg font-bold">
                    Uploaded File: {fileName}
                  </h6>
                ) : (
                  <h6 className="text-lg font-bold">
                    Please upload your file here:
                  </h6>
                )}

                <form action="">
                  <div>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 w-full border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <div className="flex text-lg text-gray-600">
                          <label className="relative cursor-pointer  font-bold text-ocean-400 hover:text-ocean-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-ocean-400">
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              onChange={handleFile}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>

                <h6 className="text-md font-bold">
                  If you don't have a template file yet, please download here:
                </h6>
                <button className="flex justify-center rounded-xl w-52 h-10 bg-ocean-400">
                  <DownloadIcon className="text-white w-7 h-9"></DownloadIcon>
                </button>
              </section>
            </section>
            <section className="relative space-y-24 w-1/3">
              <div className="grid justify-end">
                <Image
                  src="/logo.png"
                  alt="logo picture"
                  width={150}
                  height={130}
                />
              </div>
              <div className="w-full m-8 space-y-12">
                <h6 className="text-base font-bold whitespace-normal">
                  {message}
                </h6>
                {fileName && (
                  <Link href={"/dev/dashboard"} passHref>
                    <button className="rounded-full w-56 h-14 bg-ocean-300 text-white text-lg font-bold">
                      Continue
                    </button>
                  </Link>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export async function getStaticProps(context: any) {
  const emojis = await getEmojiList();
  return {
    props: {
      emojis: emojis, // remove sheet header
    },
  };
}

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
