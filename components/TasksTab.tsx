import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import { Task } from "./Task";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  let [categories] = useState({
    Overall: ["Good"],
    WrittenTasks: ["Average"],
    PerformanceTasks: ["Very Good"],
  });

  let assessment = ["Good", "Very Good", "Average"];

  return (
    <React.Fragment>
      <Tab.Group>
        <div className="h-full">
          <div className="flex justify-end">
            <Tab.List className="flex p-1 space-x-14 h-[10vh]">
              {Object.keys(categories).map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    classNames(
                      "w-72 py-2.5 text-xl font-bold",
                      selected
                        ? "text-ocean-400 hover:text-ocean-400 underline underline-offset-4 decoration-4"
                        : ""
                    )
                  }
                >
                  {category === "WrittenTasks"
                    ? "Written Tasks"
                    : category === "PerformanceTasks"
                    ? "Performance Tasks"
                    : "Over All"}
                </Tab>
              ))}
            </Tab.List>
          </div>

          <Tab.Panels className="mt-2">
            {Object.keys(categories).map((category, idx) => (
              <Tab.Panel key={category} className="h-[80vh]">
                <Task
                  category={category}
                  assessment={
                    category === "Overall"
                      ? assessment[0]
                      : category === "WrittenTasks"
                      ? assessment[1]
                      : assessment[2]
                  }
                ></Task>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </div>
      </Tab.Group>
    </React.Fragment>
  );
}
