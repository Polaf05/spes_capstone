import { Dialog, Transition } from "@headlessui/react";
import React, { useContext, Fragment } from "react";
import { SelectedStudentContext } from "../context/SelectedStudent";
import { useSelectedStudent } from "../hooks/useSelectedStudent";

const StudentDialog = ({
  open,
  setIsOpen,
}: {
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { student } = useSelectedStudent();

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
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-1">
                      <div className="grid h-20 place-items-center">
                       
                        <h1 className="border col-start-2 font-bold text-lg">Final grade 
                        </h1>
                        
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div className="grid grid-cols-2">
                          <span className="col-span-1 border h-16 w-16 rounded-full bg-yellow-200 grid place-items-center">
                            <h1 className="font-bold text-xl">{student?.grade_after}</h1>
                          </span>
                          <div className="col-span-1 flex justify-end">
                            <Dialog.Title
                              as="h1"
                              className="flex justify-end text-2xl font-semibold leading-6 text-gray-900 w-full mb-2"
                            >
                              {student?.name}
                            </Dialog.Title>
                            <div className="flex justify-end font-medium border-b">Male</div>
                          </div>
                      </div>
                    <div className="mt-2 h-56 overflow-y-auto border-b">
                      <p className="inline-block text-justify">
                      Assessment: Paragraph (Large) Lorem ipsum dolor sit amet,
                      consectetuer adipiscing elit, sed diam nonummy nibh euismod
                      tincidunt ut laoreet dolore magna. Lorem ipsum dolor sit amet,
                      consectetuer adipiscing elit, sed diam nonummy nibh euismod
                      tincidunt ut laoreet dolore magna. Lorem ipsum dolor sit amet,
                      consectetuer adipiscing elit, sed diam nonummy nibh euismod
                      tincidunt ut laoreet dolore magna. Chart Description: Paragraph
                      (Large) Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                      </p>
                    </div>
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
