import React from "react";
import TasksTab from "../components/TasksTab";
import { useClassroom } from "../hooks/useSetClassroom";

export default function Tasks() {
  return (
    <div className="bg-white h-screen w-screen">
      <TasksTab />
    </div>
  );
}
