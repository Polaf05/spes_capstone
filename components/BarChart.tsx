import React, { useRef } from "react";
import { Bar } from "react-chartjs-2";
import { DataSet } from "../types/Students";
import { Chart } from "chart.js";

const BarChart = ({
  display,
  indexAxis,
  labels,
  datasets,
}: {
  display: boolean;
  indexAxis: string;
  labels: string[];
  datasets: DataSet[];
}) => {
  const dataChart = { labels, datasets };
  type refAttr = {
    type: string;
    arr: any[];
    str: string;
  };
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
        onClick: function (evt, element) {
          // onClickNot working element null
          console.log(evt, element);
          if (element.length > 0) {
          }
        },
      }}
    />
  );
};

export default BarChart;
