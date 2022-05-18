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
  let tech_difficulty: Partial<InferenceDetails> = {};
  let accessible_usage: Partial<InferenceDetails> = {};
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
    environment_factors: [] as any,
    wifi: [] as any,
    data: [] as any,
    device: [] as any,
    tech_difficulty: [] as any,
    platform: item.platform,
    accessible_usage: [] as any,
  };

  return surveyData;
}
