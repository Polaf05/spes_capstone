import { Dialog } from "@headlessui/react";
import React, { useContext } from "react";
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
    <Dialog
      open={open}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/25">
        <Dialog.Panel className="w-full h-full max-w-sm rounded bg-white">
          <Dialog.Title>Student Information:</Dialog.Title>
          {student?.name ?? "No Name"}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default StudentDialog;
