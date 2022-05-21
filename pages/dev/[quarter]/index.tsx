import { SelectorIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Image from "next/image";
import { useClassroom } from "../../../hooks/useSetClassroom";
import { Tab } from "@headlessui/react";
import { Task } from "../../../components/Task";
import { useRouter } from "next/router";
import { stringify } from "querystring";
import { GetServerSideProps } from "next";

ChartJS.register(ArcElement, Tooltip, Legend);

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { quarter } = query;

  return {
    props: {
      quarter: Number(quarter),
    },
  };
};

export default function Tasks({ quarter }: { quarter: number }) {
  const { students } = useClassroom();
  const [open, setIsOpen] = useState<boolean>(false);

  const labels = ["Very Good", "Good", "Average", "Poor", "Very Poor"];
  var count = [0, 0, 0, 0, 0];
  /* students?.forEach((student) => {
    const grade_before = student.grade_before;
    const grade_after = student.grade_after;
    const diff = grade_after - grade_before;
    const remark =
      diff >= 1.2 && grade_after > 90
        ? "Very Good"
        : diff > 0.0 && grade_after > 85
        ? "Good"
        : diff >= -0.5 && grade_after > 80
        ? "Average"
        : diff > -0.8 || grade_after > 75
        ? "Poor"
        : "Very Poor";

    const index = labels.indexOf(remark);
    count[index] += 1;
  });*/

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Student's performance",
        data: count,
        backgroundColor: [
          "#CCB53B",
          "#F9E852",
          "#A2CAEB",
          "#5DB4E5",
          "#4B94BD",
        ],
      },
    ],
  };
  const [categories] = useState([
    {
      title: "Over All",
      value: "Good",
    },
    {
      title: "Written Works",
      value: "Average",
    },
    {
      title: "Performance Tasks",
      value: "Very Good",
    },
  ]);

  return (
    <>
      {students && (
        <div className="bg-white max-h-screen">
          <Tab.Group>
            <div className="grid grid-cols-3 justify-between mx-10 h-20 ">
              <div className="w-20 h-20 p-1">
                <Image
                  src="/logo.png"
                  alt="logo picture"
                  width={100}
                  height={100}
                />
              </div>
              <Tab.List className="col-span-2 flex justify-end">
                {categories.map((category) => (
                  <Tab
                    key={category.title}
                    className={({ selected }) =>
                      classNames(
                        "w-60 text-xl font-bold mx-2",
                        selected
                          ? "text-ocean-400 decoration-4 border-b-8 border-ocean-400"
                          : ""
                      )
                    }
                  >
                    {category.title}
                  </Tab>
                ))}
              </Tab.List>
            </div>

            <Tab.Panels>
              {categories.map((category, idx) => (
                <Tab.Panel key={idx} className="h-[80vh]">
                  <Task
                    open={open}
                    setIsOpen={setIsOpen}
                    category={category.title}
                    assessment={category.value}
                    quarter={quarter - 1}
                  />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      )}
    </>
  );
}
