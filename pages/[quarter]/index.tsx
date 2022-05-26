import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Image from "next/image";
import { useClassroom } from "../../hooks/useSetClassroom";
import { Tab } from "@headlessui/react";
import { Task } from "../../components/Task";
import { GetServerSideProps } from "next";
import BarChart from "../../components/BarChart";
import { DataSet } from "../../types/Students";
import CircularProgress from "../../components/CircularProgress";
import PeopleChart from "../../components/PeopleChart";
import { useRouter } from "next/router";
import ProgressComponent from "../../components/ProgressComponent";
import CardInfo from "../../components/CardInfo";
import StruggledSections from "../../components/sections/StruggledSections";

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
  const router = useRouter();
  var count = [0, 0, 0, 0, 0];

  if (!students) router.back();
  const myStudent = students![0].quarter![0];
  // get weighted omsim of a written works and performance task
  const wgh_ww = myStudent.written_weighted_score?.highest_possible_score;
  const wgh_pt = myStudent.performance_weighted_score?.highest_possible_score;

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

  const quarter_dataset: DataSet[] = [
    {
      label: "Students Passed",
      data: [99, 80, 88, 87],
      fill: true,
      backgroundColor: "#FFF598",
      borderColor: "#FFF598",
    },
  ];

  const passed_tasks = [
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    false,
    false,
  ];

  const dummy = [50, 12, 3, 66, 99, 10];

  return (
    <>
      {students && (
        <div className="bg-white h-full w-[100vw]]">
          <div className="">
            <Tab.Group>
              <div className="grid grid-cols-3 justify-between mx-10 mt-4 h-20">
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
                  <Tab.Panel key={idx} className="h-[90vh] bg-ocean-100 pt-10">
                    {/* Content Section */}
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
            <div className="bg-white h-fit px-12 py-10">
              {/* Omsim Chart */}
              {/* Student Cards */}
              <div className="m-8 pb-24">
                <StruggledSections />
                <h2 className="text-xl font-bold">
                  Students had a hard time with:
                </h2>
                <div className="grid grid-cols-2 grid-flow-row gap-2">
                  <div className="col-span-1 my-2 h-fit px-4 py-2 border-2 border-red-300 rounded-xl">
                    <div className="flex justify-between">
                      <h4>Performance Tasks</h4>
                      <h4>Task No.</h4>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between">
                        <h4 className="text-lg font-bold">Omskim Ignacio</h4>
                        <h4 className="text-lg font-bold">4,5,6</h4>
                      </div>
                      <div className="flex justify-between">
                        <h4 className="text-lg font-bold">Omskim Ignacio</h4>
                        <h4 className="text-lg font-bold">4,5,6</h4>
                      </div>
                      <div className="flex justify-between">
                        <h4 className="text-lg font-bold">Omskim Ignacio</h4>
                        <h4 className="text-lg font-bold">4,5,6</h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1 my-2 h-fit px-4 py-2 border-2 border-red-300 rounded-xl">
                    <div className="flex justify-between">
                      <h4>Performance Tasks</h4>
                      <h4>Task No.</h4>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between">
                        <h4 className="text-lg font-bold">Omskim Ignacio</h4>
                        <h4 className="text-lg font-bold">4,5,6</h4>
                      </div>
                      <div className="flex justify-between">
                        <h4 className="text-lg font-bold">Omskim Ignacio</h4>
                        <h4 className="text-lg font-bold">4,5,6</h4>
                      </div>
                      <div className="flex justify-between">
                        <h4 className="text-lg font-bold">Omskim Ignacio</h4>
                        <h4 className="text-lg font-bold">4,5,6</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Bar Chart */}
              <div className="h-fit m-8 px-24 pb-24 border-b-2 border-ocean-400">
                <h1 className="text-3xl font-bold">Quarter Grade</h1>
                <BarChart
                  indexAxis="y"
                  labels={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
                  datasets={quarter_dataset}
                />
                <p className="italic text-justify mt-8">
                  Paragraph (Large) Lorem ipsum dolor sit amet, consectetuer
                  adipiscing elit, sedlor sit amet, consectetuer adipiscing
                  elit, sedParagraph (Large) Lorem ipsum dolor sit amet,
                  consectetuer adipiscing elit, sedlor sit amet, consectetuer
                  adipiscing elit, sedParagraph (Large) Lorem ipsum dolor sit
                  amet, consectetuer adipiscing elit, sedlor sit amet,
                  consectetuer adipiscing elit, sedParagraph (Large) Lorem ipsum
                  dolor sit amet, consectetuer adipiscing elit, sedlor sit amet,
                  consectetuer adipiscing elit, sedParagraph (Large) Lorem ipsum
                  dolor sit amet, consectetuer adipiscing elit, sedlor sit amet,
                  consectetuer adipiscing elit, sedParagraph (Large) Lorem ipsum
                  dolor sit amet, consectetuer adipiscing elit, sedlor sit amet,
                  consectetuer adipiscing elit, sed
                </p>
              </div>
              {/* Circular Progress Chart */}
              <div className="my-12 grid grid-cols-2 gap-4 h-fit py-24 border-b-2 border-ocean-400">
                {/* Circular Progress */}
                <div className="col-span-5 grid grid-cols-12 gap-3">
                  {/* WW Data */}
                  <div className="col-span-6">
                    {/* Written Works Circular Progress */}
                    <div className="flex justify-end">
                      <div
                        className={classNames(
                          wgh_ww! > wgh_pt!
                            ? "w-4/5"
                            : wgh_pt! > wgh_ww!
                            ? "w-3/5"
                            : "w-3/4"
                        )}
                      >
                        <ProgressComponent
                          value={69}
                          title="Written Works"
                          subtitle="Students Passed"
                          pathColor="#FFF598"
                          strokeWidth={8}
                          size="large"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-12 gap-8 mt-4">
                      <div className="col-span-8 flex justify-center items-center">
                        <p className="text-right italic">
                          Paragraph (Large) Lorem ipsum dolor sit amet,
                          consectetuer adipiscing elit, sedlor sit amet,
                          consectetuer adipiscing elit, sed
                        </p>
                      </div>
                      <div className="col-span-4 ">
                        <ProgressComponent
                          value={22}
                          title="Average"
                          subtitle="Score PCT"
                          pathColor="#FFF598"
                          strokeWidth={10}
                          size="small"
                        />
                      </div>
                    </div>
                  </div>
                  {/* PT Data */}
                  <div className="col-span-6">
                    {/* Performance Tasks Circular Progress */}
                    <div className="grid grid-cols-12 gap-8 mb-4">
                      <div className="col-span-4">
                        <ProgressComponent
                          value={22}
                          title="Average"
                          subtitle="Score PCT"
                          pathColor="#63C7FF"
                          strokeWidth={10}
                          size="small"
                        />
                      </div>
                      <div className="col-span-8 flex justify-center items-center">
                        <p className="italic">
                          Paragraph (Large) Lorem ipsum dolor sit amet,
                          consectetuer adipiscing elit, sedlor sit amet,
                          consectetuer adipiscing elit, sed
                        </p>
                      </div>
                    </div>
                    <div className="">
                      <div
                        className={classNames(
                          wgh_ww! < wgh_pt!
                            ? "w-4/5"
                            : wgh_pt! < wgh_ww!
                            ? "w-3/5"
                            : "w-3/4"
                        )}
                      >
                        <ProgressComponent
                          value={69}
                          title="Performance Tasks"
                          subtitle="Students Passed"
                          pathColor="#63C7FF"
                          strokeWidth={8}
                          size="large"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
