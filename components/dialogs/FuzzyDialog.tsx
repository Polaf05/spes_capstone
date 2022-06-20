import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  CogIcon,
  QuestionMarkCircleIcon,
  XIcon,
} from "@heroicons/react/outline";
import { classNames } from "../../lib/functions/concat";

const FuzzyDialog = ({
  ww_fuzzy_set,
  pt_fuzzy_set,
  fuzzyDialog,
  setFuzzyDialogOpen,
}: {
  ww_fuzzy_set: number[];
  pt_fuzzy_set: number[];

  fuzzyDialog: boolean;
  setFuzzyDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Transition appear show={fuzzyDialog} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40"
        onClose={() => setFuzzyDialogOpen(false)}
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
                  <h4 className="text-xl font-semibold flex items-center gap-2">
                    Student Learning Component Breakdown
                  </h4>
                  <div
                    onClick={() => setFuzzyDialogOpen(false)}
                    className="cursor-pointer rounded-full w-8 h-8 flex items-center justify-center hover:bg-ocean-300 hover:text-white"
                  >
                    <XIcon className="w-6 h-6" />
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-4 mt-5 place-items-center pb-2 border-b border-black">
                  <h6 className="col-span-1 font-semibold">Remarks</h6>
                  <h6 className="col-span-2 font-semibold">Written Works</h6>
                  <h6 className="col-span-2 font-semibold">
                    Performance Tasks
                  </h6>
                </div>
                <div className="mb-4 grid grid-cols-5 gap-4 mt-2">
                  <div className="space-y-2 col-span-1 flex flex-col items-center">
                    <p>Very Good</p>
                    <p>Good</p>
                    <p>Average</p>
                    <p>Poor</p>
                    <p>Very Poor</p>
                  </div>
                  <div className="space-y-2 col-span-2">
                    {ww_fuzzy_set.map((res, idx) => (
                      <div key={idx} className="bg-neutral-100 rounded-lg ">
                        <div
                          className={classNames(
                            " rounded-lg text-center p-1 leading-none ",
                            res > 0 ? "bg-yellow-200" : "bg-neutral-100"
                          )}
                          style={{ width: `${res}%` }}
                        >
                          <p className="font-semibold">{res}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2 col-span-2">
                    {pt_fuzzy_set.map((res, idx) => (
                      <div key={idx} className="bg-neutral-100 rounded-lg ">
                        <div
                          className={classNames(
                            " rounded-lg text-center p-1 leading-none ",
                            res > 0 ? "bg-ocean-300" : "bg-neutral-100"
                          )}
                          style={{ width: `${res}%` }}
                        >
                          <p className="font-semibold">{res}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default FuzzyDialog;
