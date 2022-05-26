import React from "react";
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const PeopleChart = ({ passed_tasks }: { passed_tasks: boolean[] }) => {
  return (
    <div>
      <div className="h-28 w-full flex gap-2 justify-center">
        {passed_tasks.map((passed, idx) => (
          <div className="flex flex-col justify-center items-center">
            <div
              className={classNames(
                "rounded-full w-10 h-10 mb-1",
                passed ? "bg-yellow-200" : "border-2 border-yellow-300"
              )}
            ></div>
            <div
              className={classNames(
                "rounded-xl w-12 h-14",
                passed ? "bg-yellow-200" : "border-2 border-yellow-300"
              )}
            ></div>
          </div>
        ))}
      </div>
      <div className="w-full px-12">
        <p className="text-justify italic font-medium">
          <span className="font-bold">8 out of 10</span> Paragraph (Large) Lorem
          ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
        </p>
      </div>
    </div>
  );
};

export default PeopleChart;
