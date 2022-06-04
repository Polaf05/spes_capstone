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
  fetchJson,
  getGradeAfter,
  getRemarks,
  getSurveyResults,
  getTask,
  getWeighted,
  uploadJson,
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
  QuestionMarkCircleIcon,
  XCircleIcon,
} from "@heroicons/react/outline";
import Intro from "../components/sections/Intro";
import { useJson } from "../hooks/useSetJson";
import Loginform from "../components/loginform";
import axios from "axios";
import jwt from "jsonwebtoken";

const INITIAL_MESSAGE =
  "An error message will appear here if there is problem with your file";

let errors: number[] = [0, 0, 0, 0, -1, -1, -1];

const gettingStarted = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("Please log in");

  async function submitForm() {
    const data = await axios
      .post("/api/login", { username: username, password: password })
      .then((res) => res.data);

    const token = data.token;

    if (token) {
      const json = jwt.decode(token);
      setMessage("Welcome bitch");
    } else {
      setMessage("SINO KA?");
    }
  }

  const [page, setPage] = useState<number>(3);

  return (
    <React.Fragment>
      <div className="bg-[url('/bg-form.jpg')] bg-cover min-h-screen px-8 pt-6 pb-8 mb-4 flex flex-col">
        {page > 2 ? (
          <div className="flex justify-center">
            <div className="space-y-4 bg-ocean-100 w-1/2 my-10 rounded-2xl p-10">
              <div className="flex justify-center">
                <Image
                  src="/logo.png"
                  alt="logo picture"
                  width={100}
                  height={100}
                />
                <h1>{message}</h1>
              </div>
              <div className="mb-10">
                <h3 className="font-semibold text-lg">Username:</h3>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                  id="username"
                  type="text"
                  placeholder="Username"
                  onChange={(value) => setUsername(value.target.value)}
                />
              </div>
              <div className="mb-6">
                <h3 className="font-semibold text-lg">Password:</h3>
                <input
                  className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
                  id="password"
                  type="password"
                  placeholder="Password"
                  onChange={(value) => setPassword(value.target.value)}
                />
              </div>
              <div className="flex justify-center">
                <button
                  className="rounded-full w-fit px-4 py-2 bg-ocean-300 text-white text-lg font-bold"
                  onClick={submitForm}
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Intro page={page} setPage={setPage} />
        )}
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
