import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";
import * as XLSX from "xlsx";
import { useClassroom } from "../../hooks/useSetClassroom";

const Upload = () => {
  const { students, setStudents } = useClassroom();
  const router = useRouter();

  const handleFile = (e: any) => {
    const [file] = e.target.files;
    console.log("My file: " + file.name);
    const reader = new FileReader();

    reader.onload = (evt: any) => {
      const bstr = evt.target.result;

      //get workbook
      const wb = XLSX.read(bstr, { type: "binary" });

      //get working sheet names
      const wsname = wb.SheetNames[0];

      //set active work sheet
      const ws = wb.Sheets[wsname];
      console.log(wb.Sheets);
      console.log(wsname);
      console.log(ws);

      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      console.log(data[0]);

      if (data) {
        let student_info = setStudents(data as any);
        router.push("/test/table");
      }
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <form action="">
        <div className="w-full">
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 w-2/6 border-gray-300 border-dashed rounded-md">
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
      <pre>{students ? JSON.stringify(students, null, 2) : "No file"}</pre>
    </div>
  );
};

export default Upload;
