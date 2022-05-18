import Image from "next/image";
import React from "react";

const Dashboard = () => {
  return (
    <>
      <div className="m-4">
        <div className="w-40 h-40 p-2">
          <Image src="/logo.png" alt="logo picture" width={100} height={100} />
        </div>
        <div className="grid place-content-center">
          <div>
            <h1 className="text-2xl font-bold">Classroom Evaluation:</h1>
          </div>
          <div className="flex gap-4">
            <button className="rounded-3xl w-60 h-40 bg-ocean-100 grid place-items-center">
              <h3 className="font-semibold text-lg">Quarter 1</h3>
            </button>
            <button className="rounded-3xl w-60 h-40 bg-ocean-100 grid place-items-center">
              <h3 className="font-semibold text-lg">Quarter 2</h3>
            </button>
            <button className="rounded-3xl w-60 h-40 bg-ocean-100 grid place-items-center">
              <h3 className="font-semibold text-lg">Quarter 3</h3>
            </button>
            <button className="rounded-3xl w-60 h-40 bg-ocean-100 grid place-items-center">
              <h3 className="font-semibold text-lg">Quarter 4</h3>
            </button>
          </div>
        </div>
        <div className=""></div>
      </div>
    </>
  );
};

export default Dashboard;
