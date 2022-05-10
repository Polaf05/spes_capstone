import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";

const handleFile = (e: any) => {
  const file = e.target.files[0];
  console.log(file);

  var workbook = XLSX.read(file);
  console.log(workbook);
};

const upload = () => {
  const [students, setStudents] = useState(null);
  useEffect(() => {
    console.log(students);
  }, [students]);

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
    </div>
  );
};

export default upload;
