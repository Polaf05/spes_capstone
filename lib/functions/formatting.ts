import axios from "axios";
import {
  InferenceDetails,
  scoreData,
  Student,
  SurveyResult,
} from "../../types/Students";

//function that dynamically formats highest possible score, written task and performance task
export function getTask(
  item: [],
  counter: number,
  ending: number,
  flag: boolean,
  possible: []
) {
  let works = [] as any;

  for (let counting = counter; counting <= counter + ending; counting++) {
    const written_work = {
      tasked_number: counting - (counter - 1),
      score: item[counting],
      highest_possible_score: flag ? item[counting] : possible[counting],
      passing_score: flag ? 0 : Math.floor((possible[counting] / 4) * 3),
      ranking: 0,
      status: flag
        ? "NO DATA"
        : getStatus(
            item[counting],
            possible[counting],
            Math.floor((possible[counting] / 4) * 3)
          ),
    };
    if (flag) {
      if (written_work.score != null) {
        if (written_work.score != 0) {
          works.push(written_work);
        }
      }
    } else {
      works.push(written_work);
    }
  }

  return works;
}

export function getStatus(
  score: number,
  highest_possible_score: number,
  passing_score: number
) {
  if (score == highest_possible_score) {
    return "Perfect";
  } else if (score >= passing_score) {
    return "Passed";
  } else if (score >= passing_score - 1 && score < passing_score) {
    return "Considerable";
  } else if (score < passing_score - 1 && score > 0) {
    return "Failed";
  } else if (score == 0) {
    return "Zero";
  } else {
    return "??";
  }
}

export function getWeighted(score: number, possible: number) {
  const scores: scoreData = {
    score: score,
    highest_possible_score: possible,
    ranking: 0,
  };

  return scores;
}

export function giveValue(item: any) {
  let wifi: Partial<InferenceDetails> = {};
  let data: Partial<InferenceDetails> = {};
  let device: Partial<InferenceDetails> = {};
  let effect: Partial<InferenceDetails> = {};
  let similarities: Partial<InferenceDetails> = {};
  let name: String = "";

  if (item.effectivity_implementation == "Not effective") {
    //1
    effect.linguistic = "Not effective";
    effect.value = 0;
  } else if (item.effectivity_implementation == "Quite effective") {
    //3
    effect.linguistic = "Quite effective";
    effect.value = 0.3334;
  } else if (item.effectivity_implementation == "Effective") {
    //5
    effect.linguistic = "Effective";
    effect.value = 0.6667;
  } else {
    //7
    effect.linguistic = "Very effective";
    effect.value = 1;
  }

  if (item.learning_performance_similarities == "Not Similar") {
    //1
    similarities.linguistic = "Not Similar";
    similarities.value = 0;
  } else if (item.learning_performance_similarities == "Quite Similar") {
    //3
    similarities.linguistic = "Quite Similar";
    similarities.value = 0.3334;
  } else if (item.learning_performance_similarities == "Similar") {
    //5
    similarities.linguistic = "Similar";
    similarities.value = 0.6667;
  } else {
    //7
    similarities.linguistic = "More than Similar";
    similarities.value = 1;
  }

  if (item.wifi.includes("have an excellent")) {
    //1
    wifi.linguistic = "Good";
    wifi.value = 1;
  } else if (item.wifi.includes("slow and sometimes intermittent")) {
    //3
    wifi.linguistic = "Bad";
    wifi.value = 0.5;
  } else {
    //5
    wifi.linguistic = "No Wifi Connection";
    wifi.value = 0;
  }

  if (item.data.includes("have an excellent")) {
    //1
    data.linguistic = "Good";
    data.value = 1;
  } else if (item.data.includes("slow and sometimes intermittent")) {
    //3
    data.linguistic = "Bad";
    data.value = 0.5;
  } else {
    //5
    data.linguistic = "No Data Connection";
    data.value = 0;
  }

  if (item.device.includes("don't have")) {
    device.linguistic = "No Device";
    device.value = 0;
  } else if (item.device.includes("rent")) {
    device.linguistic = "Renting Device";
    device.value = 0.1667;
  } else if (item.device.includes("share")) {
    device.linguistic = "Sharing Device";
    device.value = 0.3333;
  } else if (item.device.includes("borrow")) {
    device.linguistic = "Borrowing a Device";
    device.value = 0.5;
  } else if (item.device.includes("have a personal tablet")) {
    device.linguistic = "Mobile/Tablet only";
    device.value = 0.6667;
  } else if (item.device.includes("have a personal laptop")) {
    device.linguistic = "Laptop/Computer only";
    device.value = 0.8333;
  } else {
    device.linguistic = "Both Laptop and Mobile";
    device.value = 1;
  }

  if (item.name.includes(",")) {
    let nname = "";
    if (item.name.includes(", ")) {
      nname = item.name.replace(",", "");
    } else {
      nname = item.name.replace(",", " ");
    }

    nname = nname.replace(/[&\/\\#,+()$~%.'":*?<>{}.]/g, "");
    nname = nname.replace(/\s+/g, " ").trim();
    nname = nname.toUpperCase();

    let namesplit = nname.split(" ");

    if (namesplit[namesplit.length - 1].length == 1) {
      namesplit = namesplit.slice(0, -1);
    }
    let fullname = namesplit.join(" ");

    name = fullname;
  } else {
    let nname = item.name;
    nname = nname.replace(/[&\/\\#,+()$~%.'":*?<>{}.]/g, "");
    nname = nname.replace(/\s+/g, " ").trim();
    nname = nname.toUpperCase();

    let namesplit = nname.split(" ");

    if (namesplit[namesplit.length - 1].length == 1) {
      namesplit = namesplit.slice(0, -1);
    }
    let fullname = namesplit.join(" ");

    name = fullname;
  }

  const surveyData: SurveyResult = {
    email: item.email,
    mobile: item.mobile,
    name: name as string,
    gender: item.gender,
    grade: item.grade,
    school: item.school,
    learning_type: item.learning_type,
    learning_difficulty: item.learning_difficulty,
    effectivity_implementation: effect as InferenceDetails,
    learning_performance_similarities: similarities as InferenceDetails,
    environment_factors: item.environment_factors,
    wifi: wifi as InferenceDetails,
    data: data as InferenceDetails,
    device: device as InferenceDetails,
    tech_difficulty: item.tech_difficulty,
    platform: item.platform,
    accessible_usage: item.accessible_usage,
  };

  return surveyData;
}

export function getEnvironmentalData(row: any, counter: number) {
  let environment = [];

  for (let i = counter; i <= counter + 8; i++) {
    if (row[i] == "Greatly Affecting") {
      environment.push(0.75);
    } else if (row[i] == "Affecting") {
      environment.push(0.5);
    } else if (row[i] == "Quite Affecting") {
      environment.push(0.25);
    } else if (row[i] == "Unaffecting at all") {
      environment.push(0);
    }
  }

  return environment;
}

export function getSurveyResults(survey_list: SurveyResult[], name: string) {
  let survey = survey_list.find((element) => element.name == name);

  return survey as SurveyResult;
}

export function getRemarks(grade_before: number) {
  if (grade_before < 75) {
    return "Very Poor";
  } else if (grade_before >= 75 && grade_before <= 82) {
    return "Poor";
  } else if (grade_before >= 82 && grade_before <= 89) {
    return "Average";
  } else if (grade_before >= 89 && grade_before <= 96) {
    return "Good";
  } else if (grade_before > 96) {
    return "Very Good";
  }
}

export function getGradeAfter(grade_after: number) {
  if (grade_after >= 100) {
    grade_after = 100;
  }

  return grade_after;
}

export function formatArray(arr: any) {
  var outStr = "";
  if (arr.length === 1) {
    outStr = arr[0];
  } else if (arr.length === 2) {
    //joins all with "and" but no commas
    //example: "bob and sam"
    outStr = arr.join(" and ");
  } else if (arr.length > 2) {
    //joins all with commas, but last one gets ", and" (oxford comma!)
    //example: "bob, joe, and sam"
    outStr = arr.slice(0, -1).join(", ") + ", and " + arr.slice(-1);
  }
  return outStr;
}

export function uploadJson(student: Student[]) {
  let response: any;
  // const data = await axios
  //   .post("/api/json", { classroom: student })
  //   .then((res) => res.data);

  // console.log(data);
  let request = new XMLHttpRequest();

  request.onreadystatechange = () => {
    if (request.readyState == XMLHttpRequest.DONE) {
      //console.log(request.responseText);

      response = JSON.parse(request.response);

      console.log(response.metadata.id);
    }
  };

  request.open("POST", "https://api.jsonbin.io/v3/b", true);
  request.setRequestHeader("Content-Type", "application/json");
  request.setRequestHeader(
    "X-Master-Key",
    "$2b$10$wnfLIJ3QgmRaWVd8uqIWc.SxSIXMJdLAVTLdAKRcJIquIN82p.GcS"
  );
  request.setRequestHeader("X-Bin-Name", "students");
  request.setRequestHeader("X-Bin-Private", "false");

  request.send(JSON.stringify(student));

  return response?.metadata.id;
}

export function fetchJson(id: string) {
  let req = new XMLHttpRequest();

  req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
      console.log(req.responseText);
    }
  };

  req.open("GET", `https://api.jsonbin.io/v3/b/${id}`, true);
  req.setRequestHeader(
    "X-Master-Key",
    "$2b$10$wnfLIJ3QgmRaWVd8uqIWc.SxSIXMJdLAVTLdAKRcJIquIN82p.GcS"
  );
  req.setRequestHeader(
    "X-Access-Key",
    "$2b$10$3jwfnPzq3VTkd8Gf3xAd0Od1FIFqq/scYeJ7AyZqFjdMfCjLurtGi"
  );
  req.send();
}
