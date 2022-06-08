import { QuestionMarkCircleIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { classNames } from "../../lib/functions/concat";

const tutorial_msg = [
  "Click on the chart label to view the task breakdown",
  "Red labels indicate there is something unacceptable with the task data (e.g below 70% class participation or average score percentage or passing rate).",
];

const TaskAssessment = () => {
  const [step, setStep] = useState<number>(0);

  return (
    <div>
      <div className="flex items-center gap-4 px-2">
        <p className="font-normal">
          {step + 1}: {tutorial_msg[step]}
        </p>
      </div>
      <div className="w-full h-80 border"></div>
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

export default TaskAssessment;
