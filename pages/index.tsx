import type { NextPage } from "next";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div className="bg-[url('/bg-index.jpg')] bg-cover min-h-screen">
      <div className="flex flex-row justify-around pt-16 px-14 gap-12 xl:pt-20">
        <div className="space-y-10 w-9/12 xl:w-1/2">
          <div className="font-poppins text-4xl font-bold break-words leading-tight xl:text-5xl ">
            <h1>Student Performance</h1> <h1>Evaluation System</h1>
          </div>
          <p className="text-justify inline-block text-base xl:text-lg">
            A data analytics web-based platform that automates evaluation on
            students from online/hybrid learning set-up amidst pandemic based on
            their semester-long performance. It includes additional factors in
            the evaluation, such as "Environmental" and "Technological" factors.
          </p>
          <Link href={"/getting-started"} passHref>
            <button className="rounded-full w-64 h-14 border-2 border-ocean-300 bg-white text-ocean-300 hover:bg-ocean-300 hover:text-white text-lg font-bold">
              Continue
            </button>
          </Link>
        </div>
        <div className="w-44 h-44 relative xl:w-64 xl:h-64">
          <Image
            src="/logo.png"
            alt="logo picture"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
      <div className="float-right pr-4">
        <p className="text-sm text-neutral-400">ver 0.1.8</p>
      </div>
    </div>
  );
};

export default Home;
