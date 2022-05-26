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
    <div>
      <div className="h-28 w-full flex gap-2 justify-center">
        {people.map((person, idx) => (
          <div className="flex flex-col justify-center items-center">
            <div
              className={classNames(
                "rounded-full w-5 h-5 mb-1",
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
                "rounded-xl w-8 h-10",
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
    </div>
  );
};

export default PeopleChart;
