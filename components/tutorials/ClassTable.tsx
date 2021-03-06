import { XIcon } from "@heroicons/react/outline";
import Link from "next/link";
import React, { useState } from "react";
import { classNames } from "../../lib/functions/concat";
import Msg from "./messages/Msg";

const tutorial_msg = [
  "",
  "Click on a student on the table to view student's information",
  "Click on the button to sort accordingly",
];

const ClassTable = () => {
  const [step, setStep] = useState<number>(0);

  return (
    <div>
      <div className="mb-4">
        <p>{step === 0 ? <Msg></Msg> : `${step + 1}: ${tutorial_msg[step]}`}</p>
      </div>
      <div
        className={classNames(
          "w-full h-96 border",
          step === 0
            ? "bg-[url('/suggestedGrade.jpg')] bg-cover"
            : step === 1
            ? "bg-[url('/selectstudent.jpg')] bg-cover"
            : step === 2
            ? "bg-[url('/sort.jpg')] bg-cover"
            : ""
        )}
      ></div>
      <div className="grid grid-cols-3 mt-2">
        <p
          onClick={() => {
            setStep(step > 0 ? step - 1 : step);
          }}
          className="col-span-1 hover:underline font-semibold hover:cursor-pointer"
        >
          Prev
        </p>
        <div className="col-span-1 flex justify-center items-center gap-2">
          {tutorial_msg.map((msg, idx) => (
            <span
              className={classNames(
                "w-3 h-3 rounded-full border border-ocean-400",
                idx === step ? "bg-ocean-400" : "bg-white"
              )}
            ></span>
          ))}
        </div>
        <p
          onClick={() => {
            setStep(step < tutorial_msg.length - 1 ? step + 1 : step);
          }}
          className="col-span-1 hover:underline font-semibold hover:cursor-pointer text-right"
        >
          Next
        </p>
      </div>
    </div>
  );
};

export default ClassTable;
