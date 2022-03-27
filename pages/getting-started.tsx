import React from "react";
import { UploadIcon, DownloadIcon } from "@heroicons/react/outline";
import Image from "next/image";

const gettingStarted = () => {
  return (
    <React.Fragment>
      <div className="bg-[url('/bg-getting-started.jpg')] bg-cover min-h-screen">
        <div className="flex justify-center">
          <div className="flex flex-row justify-between bg-ocean-100 w-3/4 h-full my-32 rounded-xl p-20">
            <section className="grid justify-items-start w-1/2">
              <h1 className="text-2xl font-bold">Getting Started</h1>
              <section className="m-4">
                <h6 className="text-lg font-bold">Instructions</h6>
                <p className="inline-block text-justify">
                  Paragraph (Large) Lorem ipsum dolor sit amet, consectetuer
                  adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                  laoreet dolore magna. Lorem ipsum dolor sit amet, consectetuer
                  adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                  laoreet dolore magna.
                </p>
              </section>
              <section className="m-4 space-y-4">
                <h6 className="text-lg font-bold">
                  Please upload your file here:
                </h6>
                <section className="flex justify-between">
                  <button className="flex justify-center rounded-xl w-52 h-14 bg-ocean-400 pt-2">
                    <UploadIcon className="text-white w-8 h-10"></UploadIcon>
                  </button>
                  <button className="flex justify-center rounded-xl w-52 h-14 bg-ocean-300 text-white font-bold pt-4 text-base">
                    Submit
                  </button>
                </section>

                <h6 className="text-md font-bold">
                  If you don't have a template file yet, please download here:
                </h6>
                <button className="flex justify-center rounded-xl w-52 h-10 bg-ocean-400">
                  <DownloadIcon className="text-white w-7 h-9"></DownloadIcon>
                </button>
              </section>
            </section>
            <section className="relative space-y-28">
              <div className="grid justify-end">
                <Image
                  src="/logo.png"
                  alt="logo picture"
                  width={150}
                  height={130}
                />
              </div>
              <div className="w-3/4 m-8">
                <h6 className="text-lg font-bold inline-block">
                  An error message will appear here if there's a problem with
                  your file
                </h6>
              </div>
            </section>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default gettingStarted;
