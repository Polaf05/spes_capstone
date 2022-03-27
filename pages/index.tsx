import type { NextPage } from "next";
import React from "react";
import { Button } from "../components/Button";
import Link from "next/link";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div className="bg-[url('/bg_index.jpg')] bg-cover min-h-screen">
      <div className="flex flex-row justify-between ">
        <div className="mt-32 ml-32 space-y-10 w-2/5">
          <h1 className="font-poppins text-6xl font-bold break-words leading-tight">
            Student Performance Evaluation System
          </h1>
          <p className="text-justify inline-block">
            Paragraph (Large) Lorem ipsum dolor sit amet, consectetuer
            adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
            dolore magna. Lorem ipsum dolor sit amet, consectetuer adipiscing
            elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore
            magna.
          </p>
          <Link href={"/getting-started"} passHref>
            <button className="rounded-full w-96 h-16 bg-ocean-300 text-white text-lg font-bold">
              Continue
            </button>
          </Link>
        </div>
        <div className="mt-32 mx-40">
          <Image src="/logo.png" alt="logo picture" width={300} height={200} />
        </div>
      </div>
    </div>
  );
};

export default Home;
