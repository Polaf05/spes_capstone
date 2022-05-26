import type { NextPage } from "next";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div className="bg-[url('/bg-index.jpg')] bg-cover min-h-screen">
      <div className="flex flex-row justify-around pt-16 px-14 gap-12 xl:pt-20">
        <div className="space-y-10 w-9/12 xl:w-1/2">
          <div className="font-poppins text-4xl font-bold break-words leading-tight xl:text-6xl ">
            <h1>Student Performance</h1> <h1>Evaluation System</h1>
          </div>
          <p className="text-justify inline-block text-base xl:text-lg">
            Paragraph (Large) Lorem ipsum dolor sit amet, consectetuer
            adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
            dolore magna. Lorem ipsum dolor sit amet, consectetuer adipiscing
            elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore
            magna.
          </p>
          <Link href={"/getting-started"} passHref>
            <button className="rounded-full w-64 h-14 bg-ocean-300 text-white text-lg font-bold">
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
    </div>
  );
};

export default Home;
