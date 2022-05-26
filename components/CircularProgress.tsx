import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

const CircularProgress = ({
  value,
  pathColor,
  strokeWidth,
}: {
  value: number;
  pathColor: string;
  strokeWidth: number;
}) => {
  return (
    <div>
      <CircularProgressbar
        className="rounded-full z-0"
        value={value}
        strokeWidth={strokeWidth}
        styles={buildStyles({
          pathTransition:
            value == 0 ? "none" : "stroke-dashoffset 0.5s ease 0s",
          pathColor: pathColor,
          trailColor: "#F5F6FA",
          strokeLinecap: "round",
          rotation: 0.5 + (1 - value / 100) / 2,
        })}
      />
    </div>
  );
};

export default CircularProgress;
