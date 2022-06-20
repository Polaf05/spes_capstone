import { Student } from "../../types/Students";
import { TaskInfo } from "../../types/Task";

export const getTasksInfo = (
  students: Student[],
  quarter_index: number,
  option: string
) => {
  if (students) {
    if (option === "written works") {
      let ww_task_array: TaskInfo[] = [];
      let ww_cat_sum = 0,
        ww_ave_cat_sum = 0;

      //Written Works
      students![0].quarter![quarter_index].written_works?.forEach(
        (task, idx) => {
          //initialized values
          const task_info: TaskInfo = {
            task_no: idx + 1,
            total: 0,
            ave_score: 0,
            ave_score_pct: 0,
            population: 0, // total classroom population
            participated: 0, // students participated
            no_data: [], // students absent/no data found
            passed: [], //passed students
            perfect: [],
            failed: [],
            considerable: [],
            zero: [],
          };
          let score_sum = 0;
          students?.map((student, no) => {
            const status =
              student?.quarter![quarter_index].written_works![idx].status;
            if (status === "??") {
              task_info.no_data.push(student);
            } else {
              if (status === "Perfect") task_info.perfect.push(student);
              else if (status === "Passed") task_info.passed.push(student);
              else if (status === "Considerable")
                task_info.considerable.push(student);
              else task_info.failed.push(student);
              //particpants
              task_info.participated += 1;
              //score sum
              score_sum +=
                student?.quarter![quarter_index].written_works![idx].score;
            }
            //total population
            task_info.population += 1;
          });
          //total score
          task_info.total = task.highest_possible_score;
          ////console.log(score_sum);
          task_info.ave_score = Number(
            (score_sum / task_info.participated).toFixed(1)
          );
          task_info.ave_score_pct = Number(
            ((task_info.ave_score / task_info.total) * 100).toFixed(1)
          );
          ww_ave_cat_sum += task_info.ave_score_pct;

          //get sum of passing percentage
          ww_cat_sum += Number(
            (
              ((task_info.passed.length + task_info.perfect.length) /
                task_info.participated) *
              100
            ).toFixed(1)
          );
          ww_task_array.push(task_info);
        }
      );

      return ww_task_array;
    } else {
      let pt_task_array: TaskInfo[] = [];
      let pt_cat_sum = 0,
        pt_ave_cat_sum = 0;

      //Performance Tasks
      students![0].quarter![quarter_index].performance_tasks?.forEach(
        (task, idx) => {
          //initialized values
          const task_info: TaskInfo = {
            task_no: idx + 1,
            total: 0,
            ave_score: 0,
            ave_score_pct: 0,
            population: 0, // total classroom population
            participated: 0, // students participated
            no_data: [], // students absent/no data found
            passed: [], //passed students
            perfect: [],
            failed: [],
            considerable: [],
            zero: [],
          };
          let score_sum = 0;
          students?.map((student, no) => {
            const status =
              student?.quarter![quarter_index].performance_tasks![idx].status;
            if (status === "??") {
              task_info.no_data.push(student);
            } else {
              if (status === "Perfect") task_info.perfect.push(student);
              else if (status === "Passed") task_info.passed.push(student);
              else if (status === "Considerable")
                task_info.considerable.push(student);
              else task_info.failed.push(student);
              //particpants
              task_info.participated += 1;
              //score sum
              score_sum +=
                student?.quarter![quarter_index].performance_tasks![idx].score;
            }
            //total population
            task_info.population += 1;
          });
          //total score
          task_info.total = task.highest_possible_score;
          task_info.ave_score = Number(
            (score_sum / task_info.participated!).toFixed(1)
          );
          task_info.ave_score_pct = Number(
            ((task_info.ave_score / task_info.total) * 100).toFixed(1)
          );

          pt_ave_cat_sum += task_info.ave_score_pct;

          //get sum of passing percentage
          pt_cat_sum += Number(
            (
              ((task_info.passed.length + task_info.perfect.length) /
                task_info.participated) *
              100
            ).toFixed(1)
          );
          pt_task_array.push(task_info);
        }
      );
      return pt_task_array;
    }
  } else {
    return [];
  }
};
