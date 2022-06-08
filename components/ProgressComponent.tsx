import React from "react";
import CircularProgress from "./CircularProgress";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const ProgressComponent = ({
  value,
  title,
  subtitle,
  pathColor,
  strokeWidth,
  size,
}: {
  value: number;
  title: string;
  subtitle: string;
  pathColor: string;
  strokeWidth: number;
  size: string;
}) => {
  return (
    <div className="relative">
      <div className="z-10 absolute inset-0 flex justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <h2
            className={classNames(
              "font-bold",
              size === "large" ? "text-3xl" : "text-xl"
            )}
          >
            {value}%
          </h2>
          <h3
            className={classNames(
              "font-semibold",
              size === "large" ? "text-lg" : ""
            )}
          >
            {title}
          </h3>
          <p
            className={classNames(
              size === "large" ? "text-base" : "text-[0.8rem]"
            )}
          >
            {subtitle}
          </p>
        </div>
      </div>
      <div className="w-full">
        <CircularProgress
          value={value}
          pathColor={pathColor}
          strokeWidth={strokeWidth}
        />
      </div>
    </div>
  );
};

export default ProgressComponent;
