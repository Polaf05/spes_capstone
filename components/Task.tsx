import React, { useState, useContext } from "react";
import Table from "./Table";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import MyModal from "./PopUp";
import { useClassroom } from "../hooks/useSetClassroom";

ChartJS.register(ArcElement, Tooltip, Legend);

export const Task = ({
  category,
  assessment,
  setIsOpen,
}: {
  category: string;
  assessment: string;
  setIsOpen: any;
}) => {
  const { students } = useClassroom();
  let test_students = [
    {
      id: 1,
      name: "Ignacio, Franz Arvae",
      grade_before: 90,
      grade_after: 92.5,
      remarks: "",
      diff: 0,
      written_works: [],
      performance_tasks: [],
    },
    {
      id: 2,
      name: "Delos Reyes, Miss U.",
      grade_before: 70,
      grade_after: 70,
      remarks: "",
      diff: 0,
      written_works: [],
      performance_tasks: [],
    },
    {
      id: 3,
      name: "Bato, Ogie Ralph M.",
      grade_before: 90.3,
      grade_after: 68,
      remarks: "",
      diff: 0,
      written_works: [],
      performance_tasks: [],
    },
    {
      id: 4,
      name: "Cruz, Crishell Vange J.",
      grade_before: 89.6,
      grade_after: 89.5,
      remarks: "",
      diff: 0,
      written_works: [],
      performance_tasks: [],
    },
    {
      id: 5,
      name: "Ong, Jhone Rick T.",
      grade_before: 89.2,
      grade_after: 89.5,
      remarks: "",
      diff: 0,
      written_works: [],
      performance_tasks: [],
    },
    {
      id: 6,
      name: "Ranada, Mark Marc R.",
      grade_before: 80,
      grade_after: 80,
      remarks: "",
      diff: 0,
      written_works: [],
      performance_tasks: [],
    },
    {
      id: 7,
      name: "Lee, Justine Melanie M.",
      grade_before: 88.9,
      grade_after: 99,
      remarks: "",
      diff: 0,
      written_works: [],
      performance_tasks: [],
    },
    {
      id: 8,
      name: "Delos Reyes, Clea Bernadette P.",
      grade_before: 85,
      grade_after: 69,
      remarks: "",
      diff: 0,
      written_works: [],
      performance_tasks: [],
    },
  ];

  let myStudents = students;

  const labels = ["Very Good", "Good", "Average", "Poor", "Very Poor"];
  var count = [0, 0, 0, 0, 0];
  test_students.forEach((student) => {
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
    student.remarks = remark;
  });

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

  return (
    <div className="text-black bg-ocean-100 rounded-xl h-full px-10 pt-4">
      <div className="text-4xl font-bold ">
        Class Assessment:{" "}
        <span
          className={
            assessment.match("Very Good|Good")
              ? "text-tallano_gold-disp"
              : "text-ocean-400"
          }
        >
          {assessment}
        </span>
      </div>

      <div className="grid grid-cols-8 grid-flow-col gap-6">
        <div className="col-span-5 py-6 bg-gray-50 rounded-2xl shadow-md max-h-fit">
          <Table setIsOpen={setIsOpen}></Table>
        </div>
        <div className="col-span-3 grid grid-rows-6">
          <div className="row-span-4 grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <Doughnut
                data={data}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            </div>
            <div className="col-span-4">
              <h6 className="text-lg font-semibold pt-3 border-b-2 border-black">
                Legend
              </h6>
              <section className="mt-4">
                <div className="flex justify-between">
                  <p>Very Good</p>
                  <div className="bg-legend-vgood border w-9 h-4"></div>
                </div>
                <div className="flex justify-between">
                  <p>Good</p>
                  <div className="bg-legend-good border w-9 h-4"></div>
                </div>
                <div className="flex justify-between">
                  <p>Average</p>
                  <div className="bg-legend-ave border w-9 h-4"></div>
                </div>
                <div className="flex justify-between">
                  <p>Poor</p>
                  <div className="bg-legend-poor border w-9 h-4"></div>
                </div>
                <div className="flex justify-between">
                  <p>Very Poor</p>
                  <div className="bg-legend-vpoor border w-9 h-4"></div>
                </div>
              </section>
            </div>
          </div>
          <div className="row-span-2 mx-6 overflow-auto max-h-52 md:overflow-auto">
            <p className="inline-block">
              Chart Description: Paragraph (Large) Lorem ipsum dolor sit amet,
              consectetuer adipiscing elit, sed diam nonummy nibh euismod
              tincidunt ut laoreet dolore magna. Lorem ipsum dolor sit amet,
              consectetuer adipiscing elit, sed diam nonummy nibh euismod
              tincidunt ut laoreet dolore magna. Lorem ipsum dolor sit amet,
              consectetuer adipiscing elit, sed diam nonummy nibh euismod
              tincidunt ut laoreet dolore magna. Chart Description: Paragraph
              (Large) Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
