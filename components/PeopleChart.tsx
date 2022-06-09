import React from "react";
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const PeopleChart = ({
  passed_tasks,
  length,
  color,
}: {
  passed_tasks: number;
  length: number;
  color: string;
}) => {
  const people: boolean[] = [];
  for (let i = 0; i < length; i++) people.push(i < passed_tasks ? true : false);

  return (
    <div className="h-28 w-full grid grid-cols-10 gap-2">
      {people.map((person, idx) => (
        <div className="col-span-1 flex flex-col justify-center items-center">
          <div
            className={classNames(
              "rounded-full lg:w-4 lg:h-4  mb-1",
              color === "yellow"
                ? person
                  ? "bg-yellow-200"
                  : "border-2 border-yellow-200"
                : person
                ? "bg-ocean-200"
                : "border-2 border-ocean-200"
            )}
          ></div>
          <div
            className={classNames(
              "rounded-xl lg:w-7 lg:h-9",
              color === "yellow"
                ? person
                  ? "bg-yellow-200"
                  : "border-2 border-yellow-200"
                : person
                ? "bg-ocean-200"
                : "border-2 border-ocean-200"
            )}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default PeopleChart;
