import React, { useState } from "react";
import Table from "./Table";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const Task = ({
  category,
  assessment,
}: {
  category: string;
  assessment: string;
}) => {
  let students = [
    {
      id: 1,
      name: "Ignacio, Franz Arvae",
      grade_before: 90,
      grade_after: 92.5,
      remarks: "",
      diff: 0,
    },
    {
      id: 2,
      name: "Delos Reyes, Miss U.",
      grade_before: 70,
      grade_after: 70,
      remarks: "",
      diff: 0,
    },
    {
      id: 3,
      name: "Bato, Ogie Ralph M.",
      grade_before: 90.3,
      grade_after: 68,
      remarks: "",
      diff: 0,
    },
    {
      id: 4,
      name: "Cruz, Crishell Vange J.",
      grade_before: 89.6,
      grade_after: 89.5,
      remarks: "",
      diff: 0,
    },
    {
      id: 5,
      name: "Ong, Jhone Rick T.",
      grade_before: 89.2,
      grade_after: 89.5,
      remarks: "",
      diff: 0,
    },
    {
      id: 6,
      name: "Ranada, Mark Marc R.",
      grade_before: 80,
      grade_after: 80,
      remarks: "",
      diff: 0,
    },
    {
      id: 7,
      name: "Lee, Justine Melanie M.",
      grade_before: 88.9,
      grade_after: 99,
      remarks: "",
      diff: 0,
    },
    {
      id: 8,
      name: "Delos Reyes, Clea Bernadette P.",
      grade_before: 85,
      grade_after: 69,
      remarks: "",
      diff: 0,
    },
  ];

  const labels = ["Very Good", "Good", "Average", "Poor", "Very Poor"];
  var count = [0, 0, 0, 0, 0];
  students.forEach((student) => {
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
    student.diff = diff;
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
          <Table students={students}></Table>
        </div>
        <div className="grid grid-rows-6">
          <div className="row-span-4 border ">
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
        </div>
      </div>
    </div>
  );
};
