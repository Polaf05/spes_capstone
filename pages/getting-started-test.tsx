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

const gettingStarted = () => {
  const [page, setPage] = useState<number>(0);

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
              <h3 className="text-xl font-bold">Step {page + 1}:</h3>
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
                  <button
                    onClick={() => {
                      if (page > 0) setPage(page - 1);
                    }}
                  >
                    <span className="underline decoration-2">Prev</span>
                  </button>
                </div>
                <div className="flex justify-evenly gap-2">
                  <span
                    className={classNames(
                      "rounded-full w-3 h-3",
                      page === 0 ? "bg-black" : "border border-black"
                    )}
                  ></span>
                  <span
                    className={classNames(
                      "rounded-full w-3 h-3",
                      page === 1 ? "bg-black" : "border border-black"
                    )}
                  ></span>
                  <span
                    className={classNames(
                      "rounded-full w-3 h-3",
                      page === 2 ? "bg-black" : "border border-black"
                    )}
                  ></span>
                </div>
                <div className="text-lg">
                  <button
                    onClick={() => {
                      if (page < 2) setPage(page + 1);
                    }}
                  >
                    {" "}
                    {page < 2 ? (
                      <span className="underline decoration-2">Next</span>
                    ) : (
                      <span className="underline decoration-2">Next</span>
                    )}
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
