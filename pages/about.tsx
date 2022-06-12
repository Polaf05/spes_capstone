import Image from "next/image";
import Link from "next/link";
import React from "react";
import ReactTooltip from "react-tooltip";
import Footer from "../components/sections/Footer";

const About = () => {
  return (
    <>
      <div className="p-12 space-y-8">
        <div className="flex justify-between">
          <div>
            <h2 className="font-bold text-4xl">Our Story</h2>
            <p className="text-neutral-500">
              SPES Research and Development Team
            </p>
            <div className="w-full h-2 bg-ocean-400 mt-2"></div>
          </div>
          <div>
            <Link href={`/`} passHref>
              <div className="w-fit h-fit cursor-pointer">
                <Image
                  src="/logo.png"
                  alt="logo picture"
                  width={100}
                  height={100}
                />
              </div>
            </Link>
          </div>
        </div>
        <div className="">
          <p className="w-1/2 text-justify text-[0.8rem]">
            Paragraph (Large) Lorem ipsum dolor sit amet, consectetuer
            adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
            dolore magna. Lorem ipsum dolor sit amet, consectetuer adipiscing
            elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore
            magna. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
            diam nonummy nibh euismod tincidunt ut laoreet dolore magna. Lorem
            ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
            nibh euismod tincidunt ut laoreet dolore magna.
          </p>
        </div>
        <div className="grid grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 border border-black bg-[url('/nikol.jpg')] bg-cover"></div>
              <div>
                <h4 className="text-lg font-bold">Ma. Louise Nicole Sacopon</h4>
                <p className="">SPES Lead Manager</p>
                <p className="text-sm text-neutral-600 italic">
                  malouisenicole.sacopon@tup.edu.ph
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 border border-black bg-[url('/kevin.jpg')] bg-cover"></div>
              <div>
                <h4 className="text-lg font-bold">Kevin Ralph Lauren Paular</h4>
                <p className="">SPES Developer</p>
                <p className="text-sm text-neutral-600 italic">
                  kevinralphlauren.paular@tup.edu.ph
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 border border-black bg-[url('/vae.jpg')] bg-cover"></div>
              <div>
                <h4 className="text-lg font-bold ">Franz Arvae Ignacio</h4>
                <p className="">SPES Developer</p>
                <p className="text-sm text-neutral-600 italic">
                  franzarvae.ignacio@tup.edu.ph
                </p>
              </div>
            </div>
          </div>

          <div className="text-right flex flex-col items-end">
            <h3 className="font-semibold text-xl">Acknowledgements:</h3>
            <p className="text-[0.8rem]">
              SPES woudn’t be possible without these awesome people
            </p>
            <div className="w-1/2 h-2 bg-ocean-400 mt-2"></div>
            <div className="mt-5 space-y-3">
              <div>
                <h4 className="text-lg font-semibold ">
                  Prof. Ellanie Vizconde
                </h4>
                <p className="">SPES Capstone Adviser</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold ">Prof. Francis Alfaro</h4>
                <p className="">Research Coordinator</p>
              </div>
            </div>
            <div className="mt-10">
              <p>Special Thanks to:</p>
              <div className="mt-5 space-y-3">
                <div>
                  <h4 className="font-semibold ">Mr. Nikki R. Calixto</h4>
                  <p className="text-[0.8rem] font-light">
                    Master Teacher, Acacia NHS
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold ">Prof. Marisol Payra</h4>
                  <p className="text-[0.8rem] font-light">PUP Professor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
