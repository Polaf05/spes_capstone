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
  const data = {
    labels: ["Very Good", "Good", "Average", "Poor", "Very Poor"],
    datasets: [
      {
        label: "Student's performance",
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  let test = [
    {
      id: 1,
      name: "Ignacio, Franz Arvae",
      grade_before: 93.3,
      grade_after: 92.5,
      remarks: "",
    },
    {
      id: 2,
      name: "Delos Reyes, Miss U.",
      grade_before: 91.3,
      grade_after: 92.0,
      remarks: "",
    },
    {
      id: 3,
      name: "Bato, Ogie Ralph M.",
      grade_before: 90.3,
      grade_after: 91.5,
      remarks: "",
    },
    {
      id: 4,
      name: "Cruz, Crishell Vange J.",
      grade_before: 89.6,
      grade_after: 89.5,
      remarks: "",
    },
    {
      id: 5,
      name: "Ong, Jhone Rick T.",
      grade_before: 89.2,
      grade_after: 89.5,
      remarks: "",
    },
    {
      id: 6,
      name: "Ranada, Mark Marc R.",
      grade_before: 88.9,
      grade_after: 89.2,
      remarks: "",
    },
    {
      id: 7,
      name: "Lee, Justine Melanie M.",
      grade_before: 88.9,
      grade_after: 89.0,
      remarks: "",
    },
    {
      id: 8,
      name: "Delos Reyes, Clea Bernadette P.",
      grade_before: 90,
      grade_after: 88.9,
      remarks: "",
    },
  ];
  test.forEach((student) => {
    if (student.grade_after > student.grade_before)
      student.remarks = "Very Good";
  });

  return (
    <div className="text-black bg-ocean-100 rounded-xl h-full px-10 pt-4">
      <div className="text-4xl font-bold ">
        Class Assessment: <span className="text-ocean-400">{assessment}</span>
      </div>

      <div className="grid grid-cols-8 grid-flow-col gap-4 max-h-max">
        <div className="col-start-1 col-end-6 py-6 bg-gray-50 rounded-2xl shadow-md">
          <Table students={test}></Table>
        </div>
        <div className="">
          <Doughnut data={data} />
        </div>
      </div>
    </div>
  );
};
