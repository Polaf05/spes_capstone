import { Quarter, Student, TaskAnalysis, TaskData } from "../../types/Students";

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

  let x: number[] = [];

  for (let i = 0; i < task.length; i++) {
    x.push(i);
    if (task[i].score == undefined) {
      task[i].score = 0;
    }
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

  let trends = "";

  let lines = findLineByLeastSquares(x, percent);

  // console.log(lines);

  trends = lines as string;

  const taskData: TaskAnalysis = {
    fluctuation: fluctuate,
    trend: trend,
    consistency: consistent,
    plunge_task: plunge,
    surge_task: surge,
    trends: trends,
  };

  return taskData;
}

export function quarterAnalysis(quarter: Quarter[]) {
  let trend = [];
  //wala pa akong maisip na ibang logic, antok na ako ehhh hekhek
  let surge = [];
  let plunge = [];

  //PASSING NOT YET SURE
  let passsing = 75;
  let streak = 0;
  let consistency = 0;

  let consistent: number[] = [];
  let temp_consistent: number[] = [];

  let len = -1;

  for (let i = 0; i < quarter.length; i++) {
    if (
      quarter[i].performance_tasks?.length != 0 &&
      quarter[i].written_works?.length != 0
    ) {
      len = i;
    }
  }

  for (let i = 0; i <= len; i++) {
    //Getting the trend
    if (i < len) {
      let sum = quarter[i + 1].grade_before - quarter[i].grade_before;
      trend.push(sum);

      if (sum >= 10) {
        surge.push(i + 2);
      } else if (sum <= -10) {
        plunge.push(i + 2);
      }
    }

    //Getting Consistency

    if (quarter[i].grade_before >= passsing) {
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

  let trends = "";

  let positive = 0;
  let negative = 0;
  let alternating = true;
  let linear = true;

  for (let i = 0; i < trend.length; i++) {
    if (i + 1 != trend.length) {
      if (Math.sign(trend[i]) == Math.sign(trend[i + 1])) {
        alternating = false;
      }
    }

    if (trend[i] != trend[0]) {
      linear = false;
    }
    if (trend[i] < 0) {
      negative++;
    } else if (trend[i] > 0) {
      positive++;
    }
  }

  if (!linear) {
    if (!alternating) {
      if (positive > negative) {
        trends = "upward";
      } else {
        trends = "downward";
      }
    } else {
      trends = "fluctuating";
    }
  } else {
    trends = "linear";
  }

  const quarterData: TaskAnalysis = {
    fluctuation: fluctuate,
    trend: trend,
    consistency: consistent,
    plunge_task: plunge,
    surge_task: surge,
    trends: trends,
  };

  return quarterData;
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
      (a, b) =>
        b.quarter![i].written_percentage!.score! -
        a.quarter![i].written_percentage!.score!
    );

    let group: any = [];
    let j = 0;
    class_list.map((student, index, class_list) => {
      let points = 0;
      if (!group[student.quarter![i].written_percentage!.score!]) {
        group[student.quarter![i].written_percentage!.score!] = [];
        j = index + 1;
        points = j;
      } else {
        points = j + 0.5;

        class_list[index - 1].quarter![i].written_percentage!.ranking = points;
      }
      group[student.quarter![i].written_percentage!.score!].push(student);
      student.quarter![i].written_percentage!.ranking = points;
    });

    class_list = classroom.sort(
      (a, b) =>
        b.quarter![i].performance_percentage!.score! -
        a.quarter![i].performance_percentage!.score!
    );

    group = [];
    j = 0;
    class_list.map((student, index, class_list) => {
      let points = 0;
      if (!group[student.quarter![i].performance_percentage!.score!]) {
        group[student.quarter![i].performance_percentage!.score!] = [];
        j = index + 1;
        points = j;
      } else {
        points = j + 0.5;

        class_list[index - 1].quarter![i].performance_percentage!.ranking =
          points;
      }
      group[student.quarter![i].performance_percentage!.score!].push(student);
      student.quarter![i].performance_percentage!.ranking = points;
    });

    class_list = classroom.sort(
      (a, b) => b.quarter![i].grade_before - a.quarter![i].grade_before
    );

    group = [];
    j = 0;
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

function findLineByLeastSquares(values_x: number[], values_y: number[]) {
  var sum_x = 0;
  var sum_y = 0;
  var sum_xy = 0;
  var sum_xx = 0;
  var count = 0;

  /*
   * We'll use those variables for faster read/write access.
   */
  var x = 0;
  var y = 0;
  var values_length = values_x.length;

  if (values_length != values_y.length) {
    throw new Error(
      "The parameters values_x and values_y need to have same size!"
    );
  }

  /*
   * Nothing to do.
   */
  if (values_length === 0) {
    return [[], []];
  }

  /*
   * Calculate the sum for each of the parts necessary.
   */
  for (var v = 0; v < values_length; v++) {
    x = values_x[v];
    y = values_y[v];
    sum_x += x;
    sum_y += y;
    sum_xx += x * x;
    sum_xy += x * y;
    count++;
  }

  /*
   * Calculate m and b for the formular:
   * y = x * m + b
   */
  var m = (count * sum_xy - sum_x * sum_y) / (count * sum_xx - sum_x * sum_x);
  var b = sum_y / count - (m * sum_x) / count;

  /*
   * We will make the x and y result line now
   */
  var result_values_x = [];
  var result_values_y = [];

  for (var v = 0; v < values_length; v++) {
    x = values_x[v];
    y = x * m + b;
    result_values_x.push(x);
    result_values_y.push(y);
  }

  // console.log(result_values_x, result_values_y);

  if (result_values_y[values_length - 1] == result_values_y[0]) {
    return "consistent linear";
  } else if (result_values_y[values_length - 1] > result_values_y[0]) {
    return "upward";
  } else {
    return "downward";
  }
}
