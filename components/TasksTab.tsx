import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import StudentDialog from "./StudentDialog";
import { Task } from "./Task";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function TasksTab() {
  const [open, setIsOpen] = useState<boolean>(false);

  const [categories] = useState([
    {
      title: "Overall",
      value: "Good",
    },
    {
      title: "Written Tasks",
      value: "Average",
    },
    {
      title: "Performance Tasks",
      value: "Very Good",
    },
  ]);

  return (
    <React.Fragment>
      <Tab.Group>
        <div className="h-full">
          <div className="flex justify-end">
            <Tab.List className="flex p-1 space-x-14 h-[10vh]">
              {categories.map((category) => (
                <Tab
                  key={category.title}
                  className={({ selected }) =>
                    classNames(
                      "w-72 py-2.5 text-xl font-bold",
                      selected
                        ? "text-ocean-400 hover:text-ocean-400 underline underline-offset-4 decoration-4"
                        : ""
                    )
                  }
                >
                  {category.title}
                </Tab>
              ))}
            </Tab.List>
          </div>

          <Tab.Panels className="mt-2">
            {/*categories.map((category, idx) => (
              <Tab.Panel key={idx} className="h-[80vh]">
                <Task
                  setIsOpen={setIsOpen}
                  category={category.title}
                  assessment={category.value}
                  classroom={}
                />
              </Tab.Panel>
            ))*/}
          </Tab.Panels>
        </div>
      </Tab.Group>
      <StudentDialog open={open} setIsOpen={setIsOpen} />
    </React.Fragment>
  );
}
