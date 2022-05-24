import { count } from "console";
import { Student, TaskAnalysis, TaskData } from "../../types/Students";

export function fluctuation(task: TaskData[], possible: TaskData[]) {
  let trend = [];
  //wala pa akong maisip na ibang logic, antok na ako ehhh hekhek
  let surge = [];
  let plunge = [];

  //PASSING NOT YET SURE
  let passsing = 7.5;
  let streak = 0;
  let consistency = 0;

  let consistent: number[] = [];
  let temp_consistent: number[] = [];
  let percent: number[] = [];

  for (let i = 0; i < task.length; i++) {
    let percentage = (task[i].score / possible[i].score) * 10;

    percent.push(percentage);
  }

  for (let i = 0; i < task.length; i++) {
    //Getting the trend
    if (i < task.length - 1) {
      let sum = percent[i + 1] - percent[i];
      trend.push(sum);

      if (sum >= 5) {
        surge.push(i + 2);
      } else if (sum <= -5) {
        plunge.push(i + 2);
      }
    }

    //Getting Consistency

    if (percent[i] >= passsing) {
      consistency++;
      temp_consistent.push(i + 1);
    } else {
      if (consistency > streak) {
        streak = consistency;
        consistency = 0;
        consistent = temp_consistent;
      } else {
        consistency = 0;
        temp_consistent = [];
      }
    }
  }

  const sumWithInitial = trend.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );

  let fluctuate = sumWithInitial / trend.length;

  const taskData: TaskAnalysis = {
    fluctuation: fluctuate,
    trend: trend,
    consistency: consistent,
    plunge_task: plunge,
    surge_task: surge,
  };

  return taskData;
}

export function getRanking(classroom: Student[], task_length: any) {
  let class_list;
  for (let i = 0; i < 4; i++) {
    for (
      let counting = 0;
      counting < task_length[i].written_works.length;
      counting++
    ) {
      class_list = classroom.sort(
        (a, b) =>
          b.quarter![i].written_works![counting].score -
          a.quarter![i].written_works![counting].score
      );

      let group: any = [];
      let j = 0;
      class_list.map((student, index, class_list) => {
        let points = 0;
        if (!group[student.quarter![i].written_works![counting].score]) {
          group[student.quarter![i].written_works![counting].score] = [];
          j = index + 1;
          points = j;
        } else {
          points = j + 0.5;

          class_list[index - 1].quarter![i].written_works![counting].ranking =
            points;
        }
        group[student.quarter![i].written_works![counting].score].push(student);
        student.quarter![i].written_works![counting].ranking = points;
      });
    }

    for (
      let counting = 0;
      counting < task_length[i].performance_work.length;
      counting++
    ) {
      class_list = classroom.sort(
        (a, b) =>
          b.quarter![i].performance_tasks![counting].score -
          a.quarter![i].performance_tasks![counting].score
      );

      let group: any = [];
      let j = 0;
      class_list.map((student, index, class_list) => {
        let points = 0;
        if (!group[student.quarter![i].performance_tasks![counting].score]) {
          group[student.quarter![i].performance_tasks![counting].score] = [];
          j = index + 1;
          points = j;
        } else {
          points = j + 0.5;

          class_list[index - 1].quarter![i].performance_tasks![
            counting
          ].ranking = points;
        }
        group[student.quarter![i].performance_tasks![counting].score].push(
          student
        );
        student.quarter![i].performance_tasks![counting].ranking = points;
      });
    }

    class_list = classroom.sort(
      (a, b) => b.quarter![i].grade_before - a.quarter![i].grade_before
    );

    let group: any = [];
    let j = 0;
    class_list.map((student, index, class_list) => {
      let points = 0;
      if (!group[student.quarter![i].grade_before]) {
        group[student.quarter![i].grade_before] = [];
        j = index + 1;
        points = j;
      } else {
        points = j + 0.5;

        class_list[index - 1].quarter![i].ranking = points;
      }
      group[student.quarter![i].grade_before].push(student);
      student.quarter![i].ranking = points;
    });
  }
  class_list = classroom.sort(
    (a, b) => b.final_grade_before - a.final_grade_after
  );
  let group: any = [];
  let j = 0;
  class_list.map((student, index, class_list) => {
    let points = 0;
    if (!group[student.final_grade_before]) {
      group[student.final_grade_before] = [];
      j = index + 1;
      points = j;
    } else {
      points = j + 0.5;

      class_list[index - 1].ranking = points;
    }
    group[student.final_grade_before].push(student);
    student.ranking = points;
  });

  return class_list;
}

export function rank() {}
