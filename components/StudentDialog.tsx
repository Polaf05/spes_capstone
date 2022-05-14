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
                <Dialog.Panel className="w-full max-w-5xl h-[50vh] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="w-3/5">
                     <Dialog.Title
                    as="h1"
                    className="text-2xl font-semibold leading-6 text-gray-900 w-full mb-2"
                  >
                    {student?.name}
                  </Dialog.Title>
                  <div className="font-medium border-b">Male</div>
                  <div className="mt-2">
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
                  <div className="mt-4 flex justify-end">
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
