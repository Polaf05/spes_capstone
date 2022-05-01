import React from "react";
import { UploadIcon, DownloadIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";

const gettingStarted = () => {
  return (
    <React.Fragment>
      <div className="bg-[url('/bg-form.jpg')] bg-cover min-h-screen">
        <div className="flex justify-center">
          <div className="flex flex-row justify-between bg-ocean-100 w-3/5  h-full my-32 rounded-xl p-20">
            <section className="grid justify-items-start w-2/3">
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

                <form action="">
                  <div>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 w-full border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <div className="flex text-lg text-gray-600">
                          <label className="relative cursor-pointer  font-bold text-ocean-400 hover:text-ocean-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-ocean-400">
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-lg text-gray-500">
                          .xlsx file format
                        </p>
                      </div>
                    </div>
                  </div>
                </form>

                <h6 className="text-md font-bold">
                  If you don't have a template file yet, please download here:
                </h6>
                <button className="flex justify-center rounded-xl w-52 h-10 bg-ocean-400">
                  <DownloadIcon className="text-white w-7 h-9"></DownloadIcon>
                </button>
              </section>
            </section>
            <section className="relative space-y-24 w-1/3">
              <div className="grid justify-end">
                <Image
                  src="/logo.png"
                  alt="logo picture"
                  width={150}
                  height={130}
                />
              </div>
              <div className="w-3/4 m-8 space-y-12">
                <h6 className="text-lg font-bold inline-block">
                  An error message will appear here if there's a problem with
                  your file
                </h6>
                <Link href={"/tasks"} passHref>
                  <button className="rounded-full w-56 h-14 bg-ocean-300 text-white text-lg font-bold">
                    Continue
                  </button>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default gettingStarted;
