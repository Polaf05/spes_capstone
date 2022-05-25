import React from "react";
import { Bar } from "react-chartjs-2";
import { DataSet } from "../types/Students";

const BarChart = ({
  labels,
  datasets,
}: {
  labels: string[];
  datasets: DataSet[];
}) => {
  const dataChart = { labels, datasets };
  return (
    <Bar
      className="border-b pb-2 w-full"
      data={dataChart}
      options={{
        scales: {
          y: { max: 100, min: 0, ticks: { stepSize: 20 } },
        },
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
        },
      }}
    />
  );
};

export default BarChart;
