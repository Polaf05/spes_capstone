import { Dialog, Transition } from "@headlessui/react";
import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/outline";
import React, { useContext, Fragment } from "react";
import { SelectedStudentContext } from "../context/SelectedStudent";
import { useSelectedStudent } from "../hooks/useSelectedStudent";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const StudentDialog = ({
  open,
  setIsOpen,
  topStudents
}: {
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  topStudents: number[]
}) => {
  const { student } = useSelectedStudent();
  var diffArrow, id
  if (student){
    diffArrow = student.diff > 0 ? "up" : student.diff === 0 ? "neutral" : "down"
    id = student.id
  }

  return (
    <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={()=>{setIsOpen(false)}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto ">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-5xl h-[55vh] transform overflow-hidden rounded-2xl bg-white p-10 text-left align-middle shadow-xl transition-all">
                  <div className="">
                    <div className="grid grid-cols-2">
                        <div className="col-span-1 flex gap-4">
                          <span className={classNames("border h-16 w-16 rounded-full grid place-items-center", student?.remarks === "Very Good" ? "bg-yellow-200" : "bg-slate-300")}>
                            <h1 className="font-bold text-xl">{student?.grade_after}</h1>
                          </span>
                          <div className="">
                            <h1 className="font-bold text-lg">Grade After Adjustment</h1>
                            <div className="flex place-items-center">
                              <p className="">Grade before: {student?.grade_before}</p>
                              {diffArrow === "up" ? <ArrowSmUpIcon className="w-5 h-5 text-green-400"/> : diffArrow === "down" ? <ArrowSmDownIcon className="w-5 h-5 text-red-400"/> : ""}
                            </div>
                          </div>
                        </div>
                        <div className="col-span-1">
                          <Dialog.Title
                            as="h1"
                            className="flex justify-end text-2xl font-semibold leading-6 text-gray-900 w-full mb-2"
                          >
                            {student?.name}
                          </Dialog.Title>
                          <div className="flex justify-end font-medium border-b">Male</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 mt-2 h-56 overflow-y-auto border-b">
                      <p className="">{topStudents.includes(id) ? `Top ${topStudents.indexOf(id) + 1}` : ""}</p>
                      <p className="col-start-2 inline-block text-justify">
                      Assessment: Paragraph (Large) Lorem ipsum dolor sit amet,
                      consectetuer adipiscing elit, sed diam nonummy nibh euismod
                      tincidunt ut laoreet dolore magna. Lorem ipsum dolor sit amet,
                      consectetuer adipiscing elit, sed diam nonummy nibh euismod
                      tincidunt ut laoreet dolore magna. Lorem ipsum dolor sit amet,
                      consectetuer adipiscing elit, sed diam nonummy nibh euismod
                      tincidunt ut laoreet dolore magna.
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-ocean-100 px-4 py-2 text-base font-medium text-ocean-400 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={()=>{setIsOpen(false)}}
                    >
                      View Full Details
                    </button>
                  </div>
                 
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
  );
};

export default StudentDialog;
