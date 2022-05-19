import { InferenceDetails, SurveyResult } from "../../types/Students";

//function that dynamically formats highest posible score, written task and performance task
export function getTask(
  item: [],
  counter: number,
  ending: number,
  flag: boolean
) {
  let works = [] as any;

  for (let counting = counter; counting <= counter + ending; counting++) {
    const written_work = {
      tasked_number: counting - (counter - 1),
      score: item[counting],
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

export function giveValue(item: any) {
  let wifi: Partial<InferenceDetails> = {};
  let data: Partial<InferenceDetails> = {};
  let device: Partial<InferenceDetails> = {};
  let effect: Partial<InferenceDetails> = {};
  let similarities: Partial<InferenceDetails> = {};
  let name: String = "";

  if (item.effectivity_implementation == "Not effective") {
    //1
    effect.linguestic = "Not effective";
    effect.value = 1;
  } else if (item.effectivity_implementation == "Quite effective") {
    //3
    effect.linguestic = "Quite effective";
    effect.value = 3;
  } else if (item.effectivity_implementation == "Effective") {
    //5
    effect.linguestic = "Effective";
    effect.value = 5;
  } else {
    //7
    effect.linguestic = "Very effective";
    effect.value = 7;
  }

  if (item.learning_performance_similarities == "Not Similar") {
    //1
    similarities.linguestic = "Not Simiar";
    similarities.value = 1;
  } else if (item.learning_performance_similarities == "Quite Similar") {
    //3
    similarities.linguestic = "Quite Simiar";
    similarities.value = 3;
  } else if (item.learning_performance_similarities == "Similar") {
    //5
    similarities.linguestic = "Simiar";
    similarities.value = 5;
  } else {
    //7
    similarities.linguestic = "More than Simiar";
    similarities.value = 7;
  }

  if (item.wifi.includes("excellent")) {
    //1
    wifi.linguestic = "Good";
    wifi.value = 1;
  } else if (item.wifi.includes("slow")) {
    //3
    wifi.linguestic = "Bad";
    wifi.value = 3;
  } else {
    //5
    wifi.linguestic = "No Wifi Connection";
    wifi.value = 5;
  }

  if (item.data.includes("excellent")) {
    //1
    data.linguestic = "Good";
    data.value = 1;
  } else if (item.data.includes("slow")) {
    //3
    data.linguestic = "Bad";
    data.value = 3;
  } else {
    //5
    data.linguestic = "No Data Connection";
    data.value = 5;
  }

  if (item.device.includes("don't have")) {
    device.linguestic = "No Device";
    device.value = 1;
  } else if (item.device.includes("rent")) {
    device.linguestic = "Renting Device";
    device.value = 3;
  } else if (item.device.includes("share")) {
    device.linguestic = "Shared Device";
    device.value = 5;
  } else if (item.device.includes("borrow")) {
    device.linguestic = "Borrowed Device";
    device.value = 7;
  } else if (item.device.includes("have a personal tablet")) {
    device.linguestic = "Have Mobile";
    device.value = 9;
  } else if (item.device.includes("have a personal laptop")) {
    device.linguestic = "Have Laptop";
    device.value = 11;
  } else {
    device.linguestic = "Have Both laptop and mobile";
    device.value = 13;
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

export function getSurveyResults(survey_list: SurveyResult[], name: string) {
  let survey = survey_list.find((element) => element.name == name);

  return survey as SurveyResult;
}
