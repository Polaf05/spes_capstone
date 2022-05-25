import React from "react";
import { Bar } from "react-chartjs-2";
import { DataSet } from "../types/Students";

const BarChart = ({
  indexAxis,
  labels,
  datasets,
}: {
  indexAxis: string;
  labels: string[];
  datasets: DataSet[];
}) => {
  const dataChart = { labels, datasets };
  return (
    <Bar
      className="pb-2 w-full h-full"
      data={dataChart}
      options={{
        indexAxis: indexAxis === "y" ? "y" : "x",
        scales: {
          y: {
            max: 100,
            min: 0,
            ticks: { stepSize: 20 },
            display: "auto",
          },
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
