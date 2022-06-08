import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ClassTable from "../tutorials/ClassTable";
import Sorting from "../tutorials/Sorting";
import { XIcon } from "@heroicons/react/outline";

const TutorialDialog = ({
  tutorial,
  openClassDialog,
  setClassDialogOpen,
}: {
  tutorial: string;
  openClassDialog: boolean;
  setClassDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Transition appear show={openClassDialog} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setClassDialogOpen(false)}
      >
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

        <div className="fixed inset-0 overflow-y-auto">
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
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between">
                  <h4 className="text-lg font-semibold">SPES Quick Tutorial</h4>
                  <div
                    onClick={() => setClassDialogOpen(false)}
                    className="cursor-pointer rounded-full w-8 h-8 flex items-center justify-center hover:bg-ocean-300 hover:text-white"
                  >
                    <XIcon className="w-6 h-6" />
                  </div>
                </div>
                {tutorial === "classTable" ? (
                  <ClassTable />
                ) : tutorial === "sorting" ? (
                  <Sorting />
                ) : (
                  "Nothing to show here..."
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TutorialDialog;
