import React, { useState } from "react";
import { DownloadIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import * as XLSX from "xlsx";
import { useClassroom } from "../../hooks/useSetClassroom";
import { Student } from "../../types/Students";

const gettingStarted = () => {
  const { students, setStudents } = useClassroom();
  const router = useRouter();
  const [fileName, setFileName] = useState(null);
  const handleFile = (e: any) => {
    const [file] = e.target.files;
    console.log(file.name);
    setFileName(file.name);
    const reader = new FileReader();

    reader.onload = (evt: any) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      //console.log(wb.Sheets);
      //console.log(wsname);
      //console.log(ws);

      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

      if (data) {
        let i = 0;
        let classroom = [] as any;
        data.forEach((item: any) => {
          const student_info = {
            id: i,
            name: item[0],
            grade_before: item[1],
            diff: item[2],
            grade_after: item[3],
            remarks: item[4],
            written_works: [],
            performance_tasks: [],
          } as Student;
          i += 1;
          classroom.push(student_info);
          console.log(student_info);
        });

        setStudents(classroom);
      }
    };
    reader.readAsBinaryString(file);
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
    </React.Fragment>
  );
};

export default gettingStarted;
