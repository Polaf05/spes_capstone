import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  CogIcon,
  QuestionMarkCircleIcon,
  XIcon,
} from "@heroicons/react/outline";

const handleEvent = () => {
  return 0;
};

const EditDialog = ({
  range,
  setRange,
  openEditDialog,
  setEditDialogOpen,
}: {
  range: number[];
  setRange: React.Dispatch<React.SetStateAction<number[]>>;
  openEditDialog: boolean;
  setEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Transition appear show={openEditDialog} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setEditDialogOpen(false)}
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
                    <span>
                      <CogIcon className="w-7 h-7 text-neutral-700" />
                    </span>
                    Configure Fuzzy Range of Remarks
                  </h4>
                  <div
                    onClick={() => setEditDialogOpen(false)}
                    className="cursor-pointer rounded-full w-8 h-8 flex items-center justify-center hover:bg-ocean-300 hover:text-white"
                  >
                    <XIcon className="w-6 h-6" />
                  </div>
                </div>
                <div className="grid grid-cols-4 mt-5">
                  <div className="col-span-2">
                    <h6 className="text-lg">Exemplary</h6>
                    <h6 className="text-lg">Accomplished</h6>
                    <h6 className="text-lg">Developing</h6>
                    <h6 className="text-lg">Beginning</h6>
                    <h6 className="text-lg">Fail</h6>
                  </div>
                  <div className="col-span-1">
                    {range.map((r, idx) => (
                      <div
                        key={idx}
                        className="grid grid-cols-3 place-items-center "
                      >
                        <button
                          onClick={() => {
                            range[idx] = r - 1;
                            setRange(range);
                          }}
                          className="bg-ocean-100 w-5 h-5 rounded-full flex items-center justify-center font-bold"
                        >
                          -
                        </button>
                        <h6 className="text-lg font-semibold">{r}</h6>
                        <button className="bg-ocean-100 w-5 h-5 rounded-full flex items-center justify-center font-bold">
                          +
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="col-span-1">
                    <h6 className="text-lg pl-2"> to 100 %</h6>
                    <h6 className="text-lg pl-2"> to 79 %</h6>
                    <h6 className="text-lg pl-2"> to 59 %</h6>
                    <h6 className="text-lg pl-2"> to 69 %</h6>
                    <h6 className="text-lg pl-2"> to 39 %</h6>
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

export default EditDialog;
