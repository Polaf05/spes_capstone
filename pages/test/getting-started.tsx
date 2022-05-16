import React from "react";
import { UploadIcon, DownloadIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useClassroom } from "../../hooks/useSetClassroom";
import * as XLSX from "xlsx";
import { Classroom, Student,  PerformanceTask, WrittenTask, ScoreTotal } from "../../types/Students";
import { getEmojiList } from "../api/sheets";
import { classroom } from "googleapis/build/src/apis/classroom";
import { getTask } from "../../lib/functions/formatting";

const gettingStarted = (emojis:any) => {
  const { students, setStudents } = useClassroom();
  const router = useRouter();

  const handleFile = async (e: any) => {
    const [file] = e.target.files;
    //console.log(file);
    const reader = new FileReader();

    reader.onload = (evt: any) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[1];
      const ws = wb.Sheets[wsname];

      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

      //TOTAL SCORES index [9] 
      
      //index 15 -> total scores written

      //index index 

      //written task 5 -> 14

      //writter percentage ->16
      // written weighted score -> 17

      // performace task -> 18 -> 27

      //performance total -> 28

      //performace percentage -> 29

      if(data){
        
        let highest_score = [] as any;
        let i = 0;

        let male = true;

        let classroom: Student[] = [];
        
        data.forEach((item:any, index:number) => {

          if(item[1] == "MALE "){
            male = true;
          }
          if(item[1] == "FEMALE "){
            male = false;
          }
          
          if(index == 9)
          {
              
            let total_written_work = getTask(item as [], 5);
            
            let total_performance_work = getTask(item as [], 18);

            const score_total :ScoreTotal = {
              written_works: total_written_work,
              performance_work: total_performance_work,
              written_percentage: item[16],
              written_weighted_score: item[17],
              performance_percentage: item[29],
              performance_weighted_score: item[30],
            }
            highest_score = score_total;
          }

          if(item[1] !== 0 && !isNaN(item[0])){
            
            let written_works = getTask(item as [], 5);
           

            let performace_works = getTask(item as [], 18);
            

            const student_info: Student = {
                    id: i,
                    name: item[1],
                    gender: male ? "MALE" : "FEMALE",
                    grade_before: item[35],
                    diff: 0,
                    grade_after: item[3],
                    remarks: item[4],
                    written_works: written_works,
                    performance_tasks: performace_works,
                    written_percentage: item[16],
                    written_weighted_score: item[17],
                    performance_percentage: item[29],
                    performance_weighted_score: item[30],
              };

            classroom.push(student_info);
          }
        })

        console.log(highest_score);
        console.log(classroom);
      }
    };
    reader.readAsBinaryString(file);
  };
  return (
    <React.Fragment>
      <div className="bg-[url('/bg-form.jpg')] bg-cover min-h-screen">
        <div className="flex justify-center">
          <div className="flex flex-row justify-between bg-ocean-100 w-3/5  h-full my-32 rounded-xl p-20">
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
                <h6 className="text-lg font-bold">
                  Please upload your file here:
                </h6>

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
              <div className="w-3/4 m-8 space-y-12">
                <h6 className="text-lg font-bold inline-block">
                  An error message will appear here if there's a problem with
                  your file
                </h6>
                {students && (
                  <Link href={"/tasks"} passHref>
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
      {JSON.stringify(emojis)}
    </React.Fragment>
  );
};

export async function getStaticProps(context : any) {
  const emojis = await getEmojiList();
  return {
    props: {
      emojis: emojis, // remove sheet header
    },
  };
}

export default gettingStarted;
