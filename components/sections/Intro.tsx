import Image from "next/image";
import React, { useState } from "react";
import { classNames } from "../../lib/functions/concat";

const msg = [
  "Survey Requirement",
  "Paste Google Spreadsheet",
  "Upload Grading Sheet File",
  "Generate Evaluation",
];

const Intro = ({
  page,
  setPage,
}: {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div>
      <div className="flex justify-center">
        <div className="space-y-2 bg-ocean-100 px-16 w-10/12 my-10 rounded-2xl p-10 xl:w-4/5">
          <div className="grid grid-cols-12">
            <div className="col-span-10">
              <h1 className="text-2xl font-bold">Getting Started</h1>
              <p className="text-light">
                Students' Performance Evaluation System
              </p>
            </div>
            <div className="col-span-2 flex justify-end">
              <Image
                src="/logo.png"
                alt="logo picture"
                width={105}
                height={95}
              />
            </div>
          </div>
          <div className="xl:px-12">
            <h3 className="text-xl font-bold">
              Step {page + 1}: {msg[page]}
            </h3>
            <div className="border-2 border-black h-[40vh] xl:h-[60vh] rounded-lg flex justify-center items-center relative">
              <Image
                src={`/step-${page + 1}.jpg`}
                alt={`step ${page + 1} image not available`}
                layout="fill"
              />
            </div>
            <p className="text-justify mt-5">
              Paragraph (Large) Lorem ipsum dolor sit amet, consectetuer
              adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
              laoreet dolore magna. Lorem ipsum dolor sit amet, consectetuer
              adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
              laoreet dolore magna.
            </p>
            <div className="grid grid-cols-3 mt-4">
              <div className="text-lg">
                <button
                  onClick={() => {
                    if (page > 0) setPage(page - 1);
                  }}
                >
                  <span className="underline decoration-2">Prev</span>
                </button>
              </div>
              <div className="flex justify-center gap-2">
                <span
                  className={classNames(
                    "rounded-full w-3 h-3",
                    page === 0 ? "bg-black" : "border border-black"
                  )}
                ></span>
                <span
                  className={classNames(
                    "rounded-full w-3 h-3",
                    page === 1 ? "bg-black" : "border border-black"
                  )}
                ></span>
                <span
                  className={classNames(
                    "rounded-full w-3 h-3",
                    page === 2 ? "bg-black" : "border border-black"
                  )}
                ></span>
                <span
                  className={classNames(
                    "rounded-full w-3 h-3",
                    page === 3 ? "bg-black" : "border border-black"
                  )}
                ></span>
              </div>
              <div className="text-lg flex flex-col justify-end items-end">
                <button
                  onClick={() => {
                    setPage(page + 1);
                  }}
                >
                  {" "}
                  <span className="underline decoration-2">Next</span>
                </button>
                <button
                  onClick={() => {
                    setPage(4);
                  }}
                  className="text-lg underline decoration-2"
                >
                  Skip Tutorial
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
