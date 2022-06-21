import React, { useState, useContext, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useClassroom } from "../hooks/useSetClassroom";
import { useSelectedStudent } from "../hooks/useSelectedStudent";
import { StruggledStudent, Student } from "../types/Students";
import StudentDialog from "./dialogs/StudentDialog";
import TutorialDialog from "./dialogs/TutorialDialog";

import {
  displayData,
  getGrade,
  getRemarks,
  transmuteGrade,
} from "../lib/functions/grade_computation";
import { classNames, formatName } from "../lib/functions/concat";
import { QuestionMarkCircleIcon } from "@heroicons/react/outline";
import ReactTooltip from "react-tooltip";
import { PencilAltIcon } from "@heroicons/react/solid";
import EditDialog from "./dialogs/EditDialog";

ChartJS.register(ArcElement, Tooltip, Legend);

export const Task = ({
  students,
  category,
  assessment,
  open,
  setIsOpen,
  quarter,
  dialog,
  setDialog,
  strgStudent,
  categoryTitle,
  openClassDialog,
  setClassDialogOpen,
  tutorial,
  setTutorial,
}: {
  students: Student[];
  category: string;
  assessment: string;
  setIsOpen: any;
  open: boolean;
  quarter: number;
  dialog: string;
  strgStudent: StruggledStudent | null;
  categoryTitle: string;
  setDialog: React.Dispatch<React.SetStateAction<string>>;
  openClassDialog: boolean;
  setClassDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  tutorial: string;
  setTutorial: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [sortingMethod, setSorting] = useState("Grade Before");
  const { setStudent } = useSelectedStudent();
  const [filteredStudents, setFilteredStudents] = useState<Student[] | null>(
    students!
  );
  useEffect(() => {
    if (students) {
      setFilteredStudents([
        ...students!.sort((a, b) => {
          switch (sortingMethod) {
            case "Initial Grade":
            case "Transmuted Grade":
              return category === "Over All"
                ? b.quarter![quarter].grade_before -
                    a.quarter![quarter].grade_before
                : category === "Written Works"
                ? b.quarter![quarter].written_percentage?.score! -
                  a.quarter![quarter].written_percentage?.score!
                : b.quarter![quarter].performance_percentage?.score! -
                  a.quarter![quarter].performance_percentage?.score!;
            case "Name":
              let fa = a.name.toLowerCase(),
                fb = b.name.toLowerCase();

              if (fa < fb) {
                return -1;
              }
              if (fa > fb) {
                return 1;
              }
              return 0;
            case "Remarks":
              return category === "Over All"
                ? b.quarter![quarter].grade_after -
                    a.quarter![quarter].grade_after
                : category === "Written Works"
                ? b.quarter![quarter].written_percentage?.score! -
                  a.quarter![quarter].written_percentage?.score!
                : b.quarter![quarter].performance_percentage?.score! -
                  a.quarter![quarter].performance_percentage?.score!;
            case "Adjustment Difference":
              return b.quarter![quarter].diff - a.quarter![quarter].diff;
            default:
              return 0;
          }
        }),
      ]);
    }
  }, [sortingMethod]);

  const labels = ["Very Good", "Good", "Average", "Poor", "Very Poor"];

  var count = [0, 0, 0, 0, 0];
  students?.map((student) => {
    const i = labels.indexOf(
      category === "Over All"
        ? student.quarter![quarter].remarks
        : getRemarks(
            category === "Written Works"
              ? student.quarter![quarter].written_percentage?.score!
              : student.quarter![quarter].performance_percentage?.score!
          )
    );

    count[i] += 1;
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Student's performance",
        data: count,
        backgroundColor: [
          "#CCB53B",
          "#F9E852",
          "#A2CAEB",
          "#5DB4E5",
          "#4B94BD",
        ],
      },
    ],
  };

  const [tooltip, showTooltip] = useState<boolean>(false);
  const [openEditDialog, setEditDialogOpen] = useState<boolean>(false);
  const [range, setRange] = useState<number[]>([80, 70, 60, 40, 0]);
  return (
    students && (
      <>
        <div className="grid grid-cols-12 gap-4 lg:px-8 xl:px-12">
          <div className="col-span-7">
            <div className="lg:text-xl xl:text-2xl font-bold flex gap-2 items-center lg:pt-8">
              <h1>
                Q{quarter + 1}: Clasroom Assessment:{" "}
                <span
                  className={classNames(
                    "underline decoration-2",
                    assessment.match(/Poor/g) ? "text-red-400" : ""
                  )}
                >
                  {assessment}
                </span>
              </h1>
              <QuestionMarkCircleIcon
                onClick={() => {
                  setClassDialogOpen(true);
                  setTutorial("classTable");
                }}
                className="w-5 h-5 text-neutral-500 hover:cursor-pointer"
                data-for="question"
                data-tip="Click for a quick tutorial"
                onMouseEnter={() => showTooltip(true)}
                onMouseLeave={() => {
                  showTooltip(false);
                  setTimeout(() => showTooltip(true), 50);
                }}
              />
              {tooltip && (
                <ReactTooltip id="question" type="dark" effect="float" />
              )}
            </div>
            <div className="text-lg font-semibold flex items-center gap-2">
              <h4>Sorted by: {sortingMethod ? sortingMethod : "Name"}</h4>
            </div>
            <div className="w-full overflow-y-auto lg:h-[80vh] xl:h-[50vh]">
              <table className="table-fixed min-w-full rounded-md xl:text-lg text-left border-collapse">
                {/* Table Head - Buttons */}
                <thead className="border-b-2 bg-white sticky top-0">
                  <tr className="text-center">
                    <th className="flex items-center pl-2">
                      <button
                        className="font-semibold hover:cursor-pointer rounded-full px-4 hover:bg-ocean-100 focus-within:bg-ocean-100"
                        value={"Name"}
                        onClick={() => setSorting("Name")}
                      >
                        Name
                      </button>
                    </th>
                    <th>
                      <button
                        className="font-semibold hover:cursor-pointer rounded-full px-4 hover:bg-ocean-100 focus-within:bg-ocean-100"
                        onClick={() => setSorting("Initial Grade")}
                      >
                        Initial Grade
                      </button>
                    </th>
                    <th>
                      <button
                        className="font-semibold hover:cursor-pointer rounded-full px-4 hover:bg-ocean-100 focus-within:bg-ocean-100"
                        onClick={() => setSorting("Transmuted Grade")}
                      >
                        Final Grade
                      </button>
                    </th>
                    <th>
                      <button
                        className="font-semibold hover:cursor-pointer rounded-full px-4 hover:bg-ocean-100 focus-within:bg-ocean-100"
                        onClick={() => setSorting("Fuzzy Grade")}
                      >
                        Performance Rate
                      </button>
                    </th>
                    {/* <th>
                      <button
                        className="font-semibold hover:cursor-pointer rounded-full px-4 hover:bg-ocean-100 focus-within:bg-ocean-100"
                        onClick={() => setSorting("Fuzzy Remarks")}
                      >
                        Remarks
                      </button>
                    </th> */}
                  </tr>
                </thead>
                {/* Table Contents */}
                <tbody className="bg-white">
                  {students &&
                    students?.map((student, idx) => (
                      <tr
                        className={classNames(
                          "hover:cursor-pointer text-center hover:font-semibold",
                          (category === "Over All"
                            ? transmuteGrade(
                                student.quarter![quarter].grade_before
                              )
                            : transmuteGrade(
                                getGrade(
                                  category === "Written Works"
                                    ? student.quarter![quarter]
                                        .written_percentage?.score
                                    : student.quarter![quarter]
                                        .performance_percentage?.score
                                )
                              )) > 75
                            ? "odd:bg-yellow-50 even:bg-white"
                            : "bg-red-200"
                        )}
                        onClick={() => {
                          setDialog("student info");
                          setStudent(student);
                          setIsOpen(true);
                        }}
                        key={idx}
                      >
                        <td className="pl-4 text-left">
                          {formatName(student.name)}
                        </td>
                        <td className="">
                          {category === "Over All"
                            ? student.quarter![quarter].grade_before.toFixed()
                            : displayData(
                                getGrade(
                                  category === "Written Works"
                                    ? student.quarter![quarter]
                                        .written_percentage?.score
                                    : student.quarter![quarter]
                                        .performance_percentage?.score
                                )
                              )}
                        </td>
                        <td>
                          {category === "Over All"
                            ? transmuteGrade(
                                student.quarter![quarter].grade_before
                              )
                            : displayData(
                                transmuteGrade(
                                  getGrade(
                                    category === "Written Works"
                                      ? student.quarter![quarter]
                                          .written_percentage?.score
                                      : student.quarter![quarter]
                                          .performance_percentage?.score
                                  )
                                )
                              )}
                        </td>
                        <td>
                          {category === "Over All"
                            ? parseFloat(
                                (
                                  student.quarter![quarter].grade_after * 100
                                ).toFixed()
                              )
                            : displayData(
                                getGrade(
                                  category === "Written Works"
                                    ? parseFloat(
                                        (
                                          student.quarter![quarter].ww_fuzzy
                                            .satisfaction * 100
                                        ).toFixed()
                                      )
                                    : parseFloat(
                                        (
                                          student.quarter![quarter].pt_fuzzy
                                            .satisfaction * 100
                                        ).toFixed()
                                      )
                                )
                              )}
                        </td>
                        {/* <td>
                          {category === "Over All"
                            ? getRemarks(student.quarter![quarter].grade_before)
                            : getRemarks(
                                getGrade(
                                  category === "Written Works"
                                    ? student.quarter![quarter]
                                        .written_percentage?.score
                                    : student.quarter![quarter]
                                        .performance_percentage?.score
                                )
                              )}
                        </td> */}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div
              data-for="question"
              data-tip="Click for a quick tutorial"
              onMouseEnter={() => showTooltip(true)}
              onMouseLeave={() => {
                showTooltip(false);
                setTimeout(() => showTooltip(true), 50);
              }}
              onClick={() => {
                setClassDialogOpen(true);
                setTutorial("classTable");
              }}
              className="flex items-center mt-1 gap-1 hover:cursor-pointer"
            >
              <QuestionMarkCircleIcon className="w-3 h-3 text-neutral-500 hover:cursor-pointer" />
              <p className="text-neutral-500 text-sm">
                Performance is rated through fuzzification process. Fuzzy rate
                implies the performance of a student for the quarter.
              </p>
            </div>
          </div>
          <div className="col-span-5 h-fit">
            <h3 className="pt-10 pb-2 font-semibold text-lg">
              Chart Representation:
            </h3>
            <div className="grid grid-cols-5 grid-flow-row gap-4">
              <div className="lg:col-span-5 xl:col-span-3">
                <div className="lg:px-8">
                  <Doughnut
                    data={data}
                    options={{
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                      cutout: 70,
                    }}
                  />
                </div>
              </div>
              <div className="lg:col-span-5 xl:col-span-2 h-fit">
                <div className="flex justify-between mt-3">
                  <h6 className="xl:text-lg font-semibold border-b-2 border-black">
                    Legend
                  </h6>
                  {/* <PencilAltIcon
                    onClick={() => {
                      setEditDialogOpen(true);
                    }}
                    className="w-6 h-6 hover:cursor-pointer"
                  /> */}
                </div>
                <p className="text-[0.8rem] text-neutral-500 italic">
                  Based on initial grade
                </p>
                <section className="mt-2">
                  <div className="flex justify-between">
                    <p>{"Very Good:  (80 - 100) "}</p>
                    <div className="bg-legend-vgood border lg:w-12 lg:h-4 xl:w-9"></div>
                  </div>
                  <div className="flex justify-between">
                    <p>{"Good: (70 - 79) "}</p>
                    <div className="bg-legend-good border lg:w-12 lg:h-4 xl:w-9"></div>
                  </div>
                  <div className="flex justify-between">
                    <p>{"Average: (60 - 69) "}</p>
                    <div className="bg-legend-ave border lg:w-12 lg:h-4 xl:w-9"></div>
                  </div>
                  <div className="flex justify-between">
                    <p>{"Poor: (40 - 59) "}</p>
                    <div className="bg-legend-poor border lg:w-12 lg:h-4 xl:w-9"></div>
                  </div>
                  <div className="flex justify-between">
                    <p>{"Very Poor: (0 - 39) "}</p>
                    <div className="bg-legend-vpoor border lg:w-12 lg:h-4 xl:w-9"></div>
                  </div>
                </section>
              </div>
            </div>
            <EditDialog
              range={range}
              setRange={setRange}
              openEditDialog={openEditDialog}
              setEditDialogOpen={setEditDialogOpen}
            />
            {/* <div className="row-span-2 overflow-auto h-44 md:overflow-auto mt-5">
              <p className="inline-block text-justify">
                Chart Description: Paragraph (Large) Lorem ipsum dolor sit amet,
                consectetuer adipiscing elit, sed diam nonummy nibh euismod
                tincidunt ut laoreet dolore magna. Lorem ipsum dolor sit amet,
                consectetuer adipiscing elit, sed diam nonummy nibh euismod
                tincidunt ut laoreet dolore magna. Lorem ipsum dolor sit amet,
                consectetuer adipiscing elit, sed diam nonummy nibh euismod
                tincidunt ut laoreet dolore magna. Chart Description: Paragraph
                (Large) Lorem ipsum dolor sit amet, consectetuer adipiscing
                elit,
              </p>
            </div> */}
          </div>
        </div>
        <div className="w-96">
          {
            <StudentDialog
              dialog={dialog}
              students={students}
              quarter={quarter}
              category={category}
              open={open}
              setIsOpen={setIsOpen}
              strgStudent={strgStudent}
              categoryTitle={categoryTitle}
            />
          }
        </div>
        <div className="">
          <TutorialDialog
            tutorial={tutorial}
            openClassDialog={openClassDialog}
            setClassDialogOpen={setClassDialogOpen}
          />
        </div>
      </>
    )
  );
};
