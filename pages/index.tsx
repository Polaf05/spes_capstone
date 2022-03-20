import type { NextPage } from "next";
import React from "react";
import { Button } from "../components/Button";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <React.Fragment>
      <div className="m-32 space-y-8">
        <div className="grid grid-cols-2">
          <h1 className="font-poppins text-6xl font-bold break-words leading-tight">
            Student Performance Evaluation System
          </h1>
        </div>
        <div className="grid grid-cols-2">
          <p className="text-justify">
            Paragraph (Large) Lorem ipsum dolor sit amet, consectetuer
            adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
            dolore magna. Lorem ipsum dolor sit amet, consectetuer adipiscing
            elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore
            magna.
          </p>
        </div>
        <Link href={"/gettingStarted"} passHref>
          <button className="rounded-full w-96 h-16 bg-ocean-300 text-white text-lg font-bold">
            Continue
          </button>
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Home;
