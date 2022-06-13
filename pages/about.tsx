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
        <div className="w-3/5 space-y-5">
          <p className="text-justify text-[0.8rem]">
            <span className="font-semibold italic">
              "The jouney of a thousand miles begins with one step."
            </span>
            - Lao Tzu
          </p>
          <p className="text-justify text-[0.8rem]">
            SPES development journey was never easy. There were times that the
            task to complete the system seems to be unachievable. But here we
            are, one step closer to our dream, to fully implement the potential
            of SPES and gradute from college. Helping other people using
            emerging technologies served as our inspiration on creating SPES.
            Especially SPES is intended to help our modern-day heroes, our
            teachers. Before we graduate from school, we would love to give back
            something to them, a gift where there could be a platform dedicated
            to help them ease the tons of work they do. To the teachers that
            made us who we are today, this is dedicated to all of you. May you
            find this tool helpful and see the potential of SPES be fully
            utilized and adapted by future generations.
          </p>
        </div>
        <div className="grid grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 border border-black bg-[url('/nikol.jpg')] bg-cover"></div>
              <div>
                <h4 className="text-lg font-bold">Ma. Louise Nicole Sacopon</h4>
                <p className="">SPES Project Lead Manager</p>
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
                  Prof. Elanie Vizconde
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
                    Teacher III, Acacia NHS
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
