import { InferenceDetails, SurveyResult } from "../../types/Students";

//function that dynamically formats highest posible score, written task and performance task
export function getTask(item: [], counter: number) {
  let works = [] as any;

  for (let counting = counter; counting <= counter + 9; counting++) {
    const written_work = {
      tasked_number: counting - (counter - 1),
      score: item[counting],
    };
    works.push(written_work);
  }

  return works;
}

export function giveValue(item: any, environment: any) {
  let wifi: Partial<InferenceDetails> = {};
  let data: Partial<InferenceDetails> = {};
  let device: Partial<InferenceDetails> = {};
  let effect: Partial<InferenceDetails> = {};
  let similarities: Partial<InferenceDetails> = {};

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
  } else if (item.item.learning_performance_similarities == "Similar") {
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

  const surveyData: SurveyResult = {
    email: item.email,
    mobile: item.mobile,
    name: item.name,
    gender: item.gender,
    grade: item.grade,
    school: item.school,
    learning_type: item.learning_type,
    learning_difficulty: item.learning_difficulty,
    effectivity_implementation: item.effectivity_implementation as any,
    learning_performance_similarities:
      item.learning_performance_similarities as any,
    environment_factors: environment,
    wifi: wifi as InferenceDetails,
    data: data as InferenceDetails,
    device: device as InferenceDetails,
    tech_difficulty: item.tech_difficulty,
    platform: item.platform,
    accessible_usage: item.accessible_usage,
  };

  return surveyData;
}
