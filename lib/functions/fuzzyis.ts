import { LinguisticVariable, Term, Rule, FIS } from "fuzzyis";
import {
  DataInference,
  InferenceDetails,
  SurveyResult,
} from "../../types/Students";

import * as fuzzylogic from "fuzzylogic";

export function remoteExperience(effectivity: number, similarities: number) {
  const system = new FIS("experience");

  //OUTPUT DECLARATION
  const OVERALL_EXPERIENCE = new LinguisticVariable(
    "overallExperience",
    [0, 1]
  );

  system.addOutput(OVERALL_EXPERIENCE);

  //INPUT DECLARATION
  const EFFECTIVITY_IMPLEMENTATION = new LinguisticVariable(
    "effectivity",
    [0, 8]
  );
  const SIMILARITY_PERFORMANCE = new LinguisticVariable("similarity", [0, 8]);

  system.addInput(EFFECTIVITY_IMPLEMENTATION);
  system.addInput(SIMILARITY_PERFORMANCE);

  //EFFECTIVITY_IMPLEMENTATION TERMS
  EFFECTIVITY_IMPLEMENTATION.addTerm(
    new Term("not effective", "gauss", [0.1416, 0])
  );
  EFFECTIVITY_IMPLEMENTATION.addTerm(
    new Term("quite effective", "gauss", [0.1416, 0.3334])
  );
  EFFECTIVITY_IMPLEMENTATION.addTerm(
    new Term("effective", "gauss", [0.1416, 0.6667])
  );
  EFFECTIVITY_IMPLEMENTATION.addTerm(
    new Term("very effective", "gauss", [0.1416, 1])
  );
  //SIMILARITY_PERFORMANCE TERMS
  SIMILARITY_PERFORMANCE.addTerm(new Term("not similar", "gauss", [0.1416, 0]));
  SIMILARITY_PERFORMANCE.addTerm(
    new Term("quite similar", "gauss", [0.1416, 0.3334])
  );
  SIMILARITY_PERFORMANCE.addTerm(
    new Term("similar", "gauss", [0.1416, 0.6667])
  );
  SIMILARITY_PERFORMANCE.addTerm(
    new Term("more than similar", "gauss", [0.1416, 1])
  );

  //OVERALL EXPERIENCE TER<S
  OVERALL_EXPERIENCE.addTerm(
    new Term("very poor", "triangle", [-0.225, 0, 0.225])
  );
  OVERALL_EXPERIENCE.addTerm(new Term("poor", "triangle", [0, 0.25, 0.5]));
  OVERALL_EXPERIENCE.addTerm(
    new Term("average", "triangle", [0.25, 0.5, 0.75])
  );
  OVERALL_EXPERIENCE.addTerm(new Term("good", "triangle", [0.5, 0.75, 1]));
  OVERALL_EXPERIENCE.addTerm(
    new Term("very good", "triangle", [0.75, 1, 1.25])
  );

  system.rules = [
    new Rule(["very effective", "more than similar"], ["very good"], "and"),
    new Rule(["effective", "more than similar"], ["very good"], "and"),
    new Rule(["quite effective", "more than similar"], ["very good"], "and"),
    new Rule(["not effective", "more than similar"], ["good"], "and"),

    new Rule(["very effective", "similar"], ["good"], "and"),
    new Rule(["effective", "similar"], ["good"], "and"),
    new Rule(["quite effective", "similar"], ["good"], "and"),
    new Rule(["not effective", "similar"], ["average"], "and"),

    new Rule(["very effective", "quite similar"], ["good"], "and"),
    new Rule(["effective", "quite similar"], ["average"], "and"),
    new Rule(["quite effective", "quite similar"], ["average"], "and"),
    new Rule(["not effective", "quite similar"], ["poor"], "and"),

    new Rule(["very effective", "not similar"], ["average"], "and"),
    new Rule(["effective", "not similar"], ["average"], "and"),
    new Rule(["quite effective", "not similar"], ["poor"], "and"),
    new Rule(["not effective", "not similar"], ["very poor"], "and"),
  ];

  let remote_experience = system.getPreciseOutput([effectivity, similarities]);

  return remote_experience[0];
}

export function internetInference(dataValue: number, wifiValue: number) {
  const system = new FIS("Connectivity");

  //OUTPUT DECLARATION
  const INTERNET_CONNECTIVITY = new LinguisticVariable(
    "internetConnectivity",
    [0, 1]
  );

  system.addOutput(INTERNET_CONNECTIVITY);

  //INPUT DECLARATION
  const DATA = new LinguisticVariable("data", [0, 1]);
  const WIFI = new LinguisticVariable("wifi", [0, 1]);

  system.addInput(DATA);
  system.addInput(WIFI);

  //WIFI TERMS
  WIFI.addTerm(new Term("not available", "gauss", [0.2123, 0]));
  WIFI.addTerm(new Term("bad", "gauss", [0.2123, 0.5]));
  WIFI.addTerm(new Term("good", "gauss", [0.2123, 1]));

  //DATA TERMS
  DATA.addTerm(new Term("not available", "gauss", [0.2123, 0]));
  DATA.addTerm(new Term("bad", "gauss", [0.2123, 0.5]));
  DATA.addTerm(new Term("good", "gauss", [0.2123, 1]));

  //OUTPUT TERMS
  INTERNET_CONNECTIVITY.addTerm(
    new Term("very poor", "triangle", [-0.25, 0, 0.25])
  );
  INTERNET_CONNECTIVITY.addTerm(new Term("poor", "triangle", [0, 0.25, 0.5]));
  INTERNET_CONNECTIVITY.addTerm(
    new Term("average", "triangle", [0.25, 0.5, 0.75])
  );
  INTERNET_CONNECTIVITY.addTerm(new Term("good", "triangle", [0.5, 0.75, 1]));
  INTERNET_CONNECTIVITY.addTerm(
    new Term("very good", "triangle", [0.75, 1, 1.25])
  );

  //RULE SET
  system.rules = [
    new Rule(["good", "good"], ["very good"], "and"),
    new Rule(["good", "bad"], ["good"], "and"),
    new Rule(["good", "not available"], ["good"], "and"),

    new Rule(["bad", "good"], ["good"], "and"),
    new Rule(["bad", "bad"], ["average"], "and"),
    new Rule(["bad", "not available"], ["poor"], "and"),

    new Rule(["not available", "good"], ["average"], "and"),
    new Rule(["not available", "bad"], ["poor"], "and"),
    new Rule(["not available", "not available"], ["very poor"], "and"),
  ];

  let internet = system.getPreciseOutput([wifiValue, dataValue]);

  return internet[0];
}

export function resourceInference(internetValue: number, deviceValue: number) {
  const system = new FIS("resource");

  //OUTPUT DECLARATION
  const RESOURCE = new LinguisticVariable("resource", [0, 1]);

  system.addOutput(RESOURCE);

  //INPUT DECLERATION
  const INTERNET_CONNECTIVITY = new LinguisticVariable("internet", [0, 1]);
  const DEVICE = new LinguisticVariable("device", [0, 1]);

  system.addInput(DEVICE);
  system.addInput(INTERNET_CONNECTIVITY);

  //INTERNET TERMS
  INTERNET_CONNECTIVITY.addTerm(
    new Term("very poor", "triangle", [-0.25, 0, 0.25])
  );
  INTERNET_CONNECTIVITY.addTerm(new Term("poor", "triangle", [0, 0.25, 0.5]));
  INTERNET_CONNECTIVITY.addTerm(
    new Term("average", "triangle", [0.25, 0.5, 0.75])
  );
  INTERNET_CONNECTIVITY.addTerm(new Term("good", "triangle", [0.5, 0.75, 1]));
  INTERNET_CONNECTIVITY.addTerm(
    new Term("very good", "triangle", [0.75, 1, 1.25])
  );

  //DEVICE TERMS
  DEVICE.addTerm(new Term("no device", "triangle", [-0.1667, 0, 0.1667]));
  DEVICE.addTerm(new Term("rent", "triangle", [0, 0.1667, 0.3333]));
  DEVICE.addTerm(new Term("borrow", "triangle", [0.1667, 0.3333, 0.5]));
  DEVICE.addTerm(new Term("share", "triangle", [0.3333, 0.5, 0.6667]));
  DEVICE.addTerm(new Term("mobile", "triangle", [0.5, 0.6667, 0.8333]));
  DEVICE.addTerm(new Term("laptop", "triangle", [0.6667, 0.8333, 1]));
  DEVICE.addTerm(new Term("both", "triangle", [0.8333, 1, 1.167]));

  //RESOURCE TERMS
  RESOURCE.addTerm(new Term("very poor", "triangle", [-0.25, 0, 0.25]));
  RESOURCE.addTerm(new Term("poor", "triangle", [0, 0.25, 0.5]));
  RESOURCE.addTerm(new Term("average", "triangle", [0.25, 0.5, 0.75]));
  RESOURCE.addTerm(new Term("good", "triangle", [0.5, 0.75, 1]));
  RESOURCE.addTerm(new Term("very good", "triangle", [0.75, 1, 1.25]));

  //RULE SET
  system.rules = [
    new Rule(["both", "very good"], ["very good"], "and"),
    new Rule(["both", "good"], ["very good"], "and"),
    new Rule(["both", "average"], ["good"], "and"),
    new Rule(["both", "poor"], ["average"], "and"),
    new Rule(["both", "very poor"], ["poor"], "and"),

    new Rule(["laptop", "very good"], ["very good"], "and"),
    new Rule(["laptop", "good"], ["good"], "and"),
    new Rule(["laptop", "average"], ["average"], "and"),
    new Rule(["laptop", "poor"], ["poor"], "and"),
    new Rule(["laptop", "very poor"], ["poor"], "and"),

    new Rule(["mobile", "very good"], ["very good"], "and"),
    new Rule(["mobile", "good"], ["good"], "and"),
    new Rule(["mobile", "average"], ["average"], "and"),
    new Rule(["mobile", "poor"], ["poor"], "and"),
    new Rule(["mobile", "very poor"], ["poor"], "and"),

    new Rule(["share", "very good"], ["good"], "and"),
    new Rule(["share", "good"], ["average"], "and"),
    new Rule(["share", "average"], ["average"], "and"),
    new Rule(["share", "poor"], ["poor"], "and"),
    new Rule(["share", "very poor"], ["poor"], "and"),

    new Rule(["borrow", "very good"], ["average"], "and"),
    new Rule(["borrow", "good"], ["average"], "and"),
    new Rule(["borrow", "average"], ["poor"], "and"),
    new Rule(["borrow", "poor"], ["poor"], "and"),
    new Rule(["borrow", "very poor"], ["poor"], "and"),

    new Rule(["rent", "very good"], ["average"], "and"),
    new Rule(["rent", "good"], ["poor"], "and"),
    new Rule(["rent", "average"], ["poor"], "and"),
    new Rule(["rent", "poor"], ["poor"], "and"),
    new Rule(["rent", "very poor"], ["very poor"], "and"),

    new Rule(["borrow", "good"], ["poor"], "and"),
    new Rule(["borrow", "average"], ["poor"], "and"),
    new Rule(["borrow", "poor"], ["poor"], "and"),
    new Rule(["borrow", "very poor"], ["very poor"], "and"),

    new Rule(["no device", "very good"], ["very poor"], "and"),
    new Rule(["no device", "good"], ["very poor"], "and"),
    new Rule(["no device", "average"], ["very poor"], "and"),
    new Rule(["no device", "poor"], ["very poor"], "and"),
    new Rule(["no device", "very poor"], ["very poor"], "and"),
  ];

  var resourceResult = system.getPreciseOutput([deviceValue, internetValue]);

  return resourceResult[0];
}

export function accessibilityInference(
  technologyValue: number,
  platformsValue: number
) {
  const system = new FIS("accessibiblity");

  //OUTPUT DECLARATION

  const ACCESSIBILITY = new LinguisticVariable("accessibility", [0, 1]);

  system.addOutput(ACCESSIBILITY);

  //INPUT DECLARATION

  const TECHNOLOGY = new LinguisticVariable("technology", [0, 1]);
  const PLATFORM = new LinguisticVariable("platform", [0, 1]);

  system.addInput(TECHNOLOGY);
  system.addInput(PLATFORM);

  //TECHNOLOGY TERMS

  TECHNOLOGY.addTerm(new Term("very difficult", "triangle", [-2.5, 0, 2.5]));
  TECHNOLOGY.addTerm(new Term("difficult", "triangle", [0, 2.5, 5]));
  TECHNOLOGY.addTerm(new Term("easy", "triangle", [2.5, 5, 7.5]));
  TECHNOLOGY.addTerm(new Term("quite easy", "triangle", [5, 7.5, 1]));
  TECHNOLOGY.addTerm(new Term("very easy", "triangle", [7.5, 1, 12.5]));

  //PLATFORM TERMS

  PLATFORM.addTerm(new Term("very difficult", "triangle", [-2.5, 0, 2.5]));
  PLATFORM.addTerm(new Term("difficult", "triangle", [0, 2.5, 5]));
  PLATFORM.addTerm(new Term("accessible", "triangle", [2.5, 5, 7.5]));
  PLATFORM.addTerm(new Term("quite easy", "triangle", [5, 7.5, 1]));
  PLATFORM.addTerm(new Term("very easy", "triangle", [7.5, 1, 12.5]));

  //ACCESSSIBILTY TERMS

  ACCESSIBILITY.addTerm(new Term("very poor", "triangle", [-2.5, 0, 2.5]));
  ACCESSIBILITY.addTerm(new Term("poor", "triangle", [0, 2.5, 5]));
  ACCESSIBILITY.addTerm(new Term("average", "triangle", [2.5, 5, 7.5]));
  ACCESSIBILITY.addTerm(new Term("good", "triangle", [5, 7.5, 1]));
  ACCESSIBILITY.addTerm(new Term("very good", "triangle", [7.5, 1, 12.5]));

  system.rules = [
    new Rule(["very easy", "very easy"], ["very good"], "and"),
    new Rule(["very easy", "quite easy"], ["very good"], "and"),
    new Rule(["very easy", "accessible"], ["good"], "and"),
    new Rule(["very easy", "difficult"], ["good"], "and"),
    new Rule(["very easy", "very difficult"], ["average"], "and"),

    new Rule(["quite easy", "very easy"], ["very good"], "and"),
    new Rule(["quite easy", "quite easy"], ["good"], "and"),
    new Rule(["quite easy", "accessible"], ["good"], "and"),
    new Rule(["quite easy", "difficult"], ["average"], "and"),
    new Rule(["quite easy", "very difficult"], ["average"], "and"),

    new Rule(["easy", "very easy"], ["good"], "and"),
    new Rule(["easy", "quite easy"], ["good"], "and"),
    new Rule(["easy", "accessible"], ["average"], "and"),
    new Rule(["easy", "difficult"], ["average"], "and"),
    new Rule(["easy", "very difficult"], ["poor"], "and"),

    new Rule(["difficult", "very easy"], ["good"], "and"),
    new Rule(["difficult", "quite easy"], ["average"], "and"),
    new Rule(["difficult", "accessible"], ["average"], "and"),
    new Rule(["difficult", "difficult"], ["poor"], "and"),
    new Rule(["difficult", "very difficult"], ["poor"], "and"),

    new Rule(["very difficult", "very easy"], ["average"], "and"),
    new Rule(["very difficult", "quite easy"], ["average"], "and"),
    new Rule(["very difficult", "accessible"], ["poor"], "and"),
    new Rule(["very difficult", "difficult"], ["poor"], "and"),
    new Rule(["very difficult", "very difficult"], ["very poor"], "and"),
  ];

  let accessibilityM = system.getPreciseOutput([
    technologyValue,
    platformsValue,
  ]);

  return accessibilityM[0];
}

export function technologicalInference(
  resourceValue: number,
  accessibilityValue: number
) {
  const system = new FIS("technological factors");

  //OUTPUT DECLARATION
  const TECHNOLOGICAL = new LinguisticVariable("Tfactor", [0, 1]);

  system.addOutput(TECHNOLOGICAL);

  //INPUT DECLATION

  const RESOURCE = new LinguisticVariable("resource", [0, 1]);
  const ACCESSIBILITY = new LinguisticVariable("accessilibity", [0, 1]);

  system.addInput(RESOURCE);
  system.addInput(ACCESSIBILITY);

  //RESOURCE TERMS

  RESOURCE.addTerm(new Term("very poor", "triangle", [-2.5, 0, 2.5]));
  RESOURCE.addTerm(new Term("poor", "triangle", [0, 2.5, 5]));
  RESOURCE.addTerm(new Term("average", "triangle", [2.5, 5, 7.5]));
  RESOURCE.addTerm(new Term("good", "triangle", [5, 7.5, 1]));
  RESOURCE.addTerm(new Term("very good", "triangle", [7.5, 1, 12.5]));

  //ACCESSSIBILTY TERMS

  ACCESSIBILITY.addTerm(new Term("very poor", "triangle", [-2.5, 0, 2.5]));
  ACCESSIBILITY.addTerm(new Term("poor", "triangle", [0, 2.5, 5]));
  ACCESSIBILITY.addTerm(new Term("average", "triangle", [2.5, 5, 7.5]));
  ACCESSIBILITY.addTerm(new Term("good", "triangle", [5, 7.5, 1]));
  ACCESSIBILITY.addTerm(new Term("very good", "triangle", [7.5, 1, 12.5]));

  //TECHNOLOGICAL TERMS

  TECHNOLOGICAL.addTerm(new Term("very poor", "gauss", [-2.5, 0, 2.5]));
  TECHNOLOGICAL.addTerm(new Term("poor", "gauss", [0, 2.5, 5]));
  TECHNOLOGICAL.addTerm(new Term("average", "gauss", [2.5, 5, 7.5]));
  TECHNOLOGICAL.addTerm(new Term("good", "gauss", [5, 7.5, 1]));
  TECHNOLOGICAL.addTerm(new Term("very good", "gauss", [7.5, 1, 12.5]));

  system.rules = [
    new Rule(["very good", "very good"], ["very good"], "and"),
    new Rule(["very good", "good"], ["very good"], "and"),
    new Rule(["very good", "average"], ["very good"], "and"),
    new Rule(["very good", "poor"], ["good"], "and"),
    new Rule(["very good", "very poor"], ["good"], "and"),

    new Rule(["good", "very good"], ["very good"], "and"),
    new Rule(["good", "good"], ["very good"], "and"),
    new Rule(["good", "average"], ["good"], "and"),
    new Rule(["good", "poor"], ["good"], "and"),
    new Rule(["good", "very poor"], ["good"], "and"),

    new Rule(["average", "very good"], ["good"], "and"),
    new Rule(["average", "good"], ["average"], "and"),
    new Rule(["average", "average"], ["average"], "and"),
    new Rule(["average", "poor"], ["average"], "and"),
    new Rule(["average", "very poor"], ["poor"], "and"),

    new Rule(["poor", "very good"], ["average"], "and"),
    new Rule(["poor", "good"], ["average"], "and"),
    new Rule(["poor", "average"], ["poor"], "and"),
    new Rule(["poor", "poor"], ["poor"], "and"),
    new Rule(["poor", "very poor"], ["poor"], "and"),

    new Rule(["very poor", "very good"], ["poor"], "and"),
    new Rule(["very poor", "good"], ["very poor"], "and"),
    new Rule(["very poor", "average"], ["very poor"], "and"),
    new Rule(["very poor", "poor"], ["very poor"], "and"),
    new Rule(["very poor", "very poor"], ["very poor"], "and"),
  ];

  let Tfactor = system.getPreciseOutput([resourceValue, accessibilityValue]);

  return Tfactor[0];
}

export function environmentalFactors(envVariables: number[]) {
  //summation of the values inside the array of environmental variables
  const sum = envVariables.reduce((partialSum, a) => partialSum + a, 0);

  let average = sum / envVariables.length;

  return average;
}

export function externalElements(
  technologicalValue: number,
  environmentalValue: number
) {
  const system = new FIS("external Elements");

  //OUTPUT DECLARATION

  const EXTERNAL = new LinguisticVariable("external", [0, 1]);

  system.addOutput(EXTERNAL);

  //INPUT DECLARATION

  const TECHNOLOGICAL = new LinguisticVariable("technological", [0, 1]);
  const ENVIRONMENTAL = new LinguisticVariable("environment", [0, 5]);

  system.addInput(TECHNOLOGICAL);
  system.addInput(ENVIRONMENTAL);

  //TECHNOLOGICAL TERMS
  TECHNOLOGICAL.addTerm(new Term("very poor", "triangle", [-2.5, 0, 2.5]));
  TECHNOLOGICAL.addTerm(new Term("poor", "triangle", [0, 2.5, 5]));
  TECHNOLOGICAL.addTerm(new Term("average", "triangle", [2.5, 5, 7.5]));
  TECHNOLOGICAL.addTerm(new Term("good", "triangle", [5, 7.5, 1]));
  TECHNOLOGICAL.addTerm(new Term("very good", "triangle", [7.5, 1, 12.5]));

  //ENVIRONMENTAL TERMS
  ENVIRONMENTAL.addTerm(new Term("very poor", "triangle", [-1.25, 0, 1.25]));
  ENVIRONMENTAL.addTerm(new Term("poor", "triangle", [0, 1.25, 2.5]));
  ENVIRONMENTAL.addTerm(new Term("average", "triangle", [1.25, 2.5, 3.75]));
  ENVIRONMENTAL.addTerm(new Term("good", "triangle", [2.5, 3.75, 5]));
  ENVIRONMENTAL.addTerm(new Term("very good", "triangle", [3.75, 5, 6.25]));

  //EXERNAL TERMS
  EXTERNAL.addTerm(new Term("very poor", "triangle", [-2.5, 0, 2.5]));
  EXTERNAL.addTerm(new Term("poor", "triangle", [0, 2.5, 5]));
  EXTERNAL.addTerm(new Term("average", "triangle", [2.5, 5, 7.5]));
  EXTERNAL.addTerm(new Term("good", "triangle", [5, 7.5, 1]));
  EXTERNAL.addTerm(new Term("very good", "triangle", [7.5, 1, 12.5]));

  //Rule Base

  system.rules = [
    new Rule(["very good", "very good"], ["very good"], "and"),
    new Rule(["very good", "good"], ["good"], "and"),
    new Rule(["very good", "average"], ["good"], "and"),
    new Rule(["very good", "poor"], ["average"], "and"),
    new Rule(["very good", "very poor"], ["poor"], "and"),

    new Rule(["good", "very good"], ["very good"], "and"),
    new Rule(["good", "good"], ["good"], "and"),
    new Rule(["good", "average"], ["average"], "and"),
    new Rule(["good", "poor"], ["poor"], "and"),
    new Rule(["good", "very poor"], ["poor"], "and"),

    new Rule(["average", "very good"], ["good"], "and"),
    new Rule(["average", "good"], ["average"], "and"),
    new Rule(["average", "average"], ["poor"], "and"),
    new Rule(["average", "poor"], ["poor"], "and"),
    new Rule(["average", "very poor"], ["very poor"], "and"),

    new Rule(["poor", "average"], ["good"], "and"),
    new Rule(["poor", "poor"], ["average"], "and"),
    new Rule(["poor", "poor"], ["poor"], "and"),
    new Rule(["poor", "very poor"], ["poor"], "and"),
    new Rule(["poor", "very poor"], ["very poor"], "and"),

    new Rule(["very poor", "very poor"], ["good"], "and"),
    new Rule(["very poor", "very poor"], ["average"], "and"),
    new Rule(["very poor", "very poor"], ["poor"], "and"),
    new Rule(["very poor", "very poor"], ["poor"], "and"),
    new Rule(["very poor", "very poor"], ["very poor"], "and"),
  ];

  let externalElements = system.getPreciseOutput([
    technologicalValue,
    environmentalValue,
  ]);

  return externalElements[0];
}

export function afterGradeInference(
  grade_before: number,
  external_elements: number
) {
  const system = new FIS("Grades");

  //OUTPUT DECLARATION

  const AFTER_GRADE = new LinguisticVariable("gradeAfter", [0, 0.8]);

  system.addOutput(AFTER_GRADE);

  // INPUT DECLARTION

  const BEFORE_GRADE = new LinguisticVariable("gradeBefore", [60, 100]);
  const EXTERNAL_FACTORS = new LinguisticVariable("externalFactors", [0, 1]);
  system.addInput(BEFORE_GRADE);
  system.addInput(EXTERNAL_FACTORS);

  //BEFORE GRADE TERMS
  BEFORE_GRADE.addTerm(new Term("very poor", "triangle", [60, 70, 77.5]));
  BEFORE_GRADE.addTerm(new Term("poor", "triangle", [70, 77.5, 85]));
  BEFORE_GRADE.addTerm(new Term("average", "triangle", [77.5, 85, 92.5]));
  BEFORE_GRADE.addTerm(new Term("good", "triangle", [85, 92.5, 100]));
  BEFORE_GRADE.addTerm(new Term("very good", "triangle", [92.5, 100, 107.5]));

  //EXTERNAL FACTORS TERMS
  EXTERNAL_FACTORS.addTerm(new Term("very poor", "triangle", [-0.25, 0, 0.25]));
  EXTERNAL_FACTORS.addTerm(new Term("poor", "triangle", [0, 0.25, 0.5]));
  EXTERNAL_FACTORS.addTerm(new Term("average", "triangle", [0.25, 0.5, 0.75]));
  EXTERNAL_FACTORS.addTerm(new Term("good", "triangle", [0.5, 0.75, 1]));
  EXTERNAL_FACTORS.addTerm(new Term("very good", "triangle", [0.75, 1, 1.25]));

  //AFTER GRADE TERMS
  AFTER_GRADE.addTerm(new Term("very poor", "triangle", [-0.2, 0, 0.2]));
  AFTER_GRADE.addTerm(new Term("poor", "triangle", [0, 0.2, 0.4]));
  AFTER_GRADE.addTerm(new Term("average", "triangle", [0.2, 0.4, 0.6]));
  AFTER_GRADE.addTerm(new Term("good", "triangle", [0.4, 0.6, 0.8]));
  AFTER_GRADE.addTerm(new Term("very good", "triangle", [0.6, 0.8, 1]));

  system.rules = [
    new Rule(["very good", "very good"], ["average"], "and"),
    new Rule(["very good", "good"], ["good"], "and"),
    new Rule(["very good", "average"], ["good"], "and"),
    new Rule(["very good", "poor"], ["very good"], "and"),
    new Rule(["very good", "very poor"], ["very good"], "and"),

    new Rule(["good", "very good"], ["average"], "and"),
    new Rule(["good", "good"], ["average"], "and"),
    new Rule(["good", "average"], ["good"], "and"),
    new Rule(["good", "poor"], ["good"], "and"),
    new Rule(["good", "very poor"], ["very good"], "and"),

    new Rule(["average", "very good"], ["poor"], "and"),
    new Rule(["average", "good"], ["average"], "and"),
    new Rule(["average", "average"], ["average"], "and"),
    new Rule(["average", "poor"], ["good"], "and"),
    new Rule(["average", "very poor"], ["good"], "and"),

    new Rule(["poor", "very good"], ["very poor"], "and"),
    new Rule(["poor", "good"], ["poor"], "and"),
    new Rule(["poor", "average"], ["poor"], "and"),
    new Rule(["poor", "poor"], ["average"], "and"),
    new Rule(["poor", "very poor"], ["average"], "and"),

    new Rule(["very poor", "very good"], ["very poor"], "and"),
    new Rule(["very poor", "good"], ["very poor"], "and"),
    new Rule(["very poor", "average"], ["poor"], "and"),
    new Rule(["very poor", "poor"], ["poor"], "and"),
    new Rule(["very poor", "very poor"], ["average"], "and"),
  ];

  let grade_after = system.getPreciseOutput([grade_before, external_elements]);

  return grade_after[0];
}

export function inferenceData(survey: SurveyResult) {
  let experience = remoteExperience(
    survey.effectivity_implementation.value,
    survey.learning_performance_similarities.value
  );

  let internet = internetInference(survey.data.value, survey.wifi.value);

  let resource = resourceInference(internet, survey.device.value);

  let accessibility = accessibilityInference(
    survey.tech_difficulty,
    survey.accessible_usage
  );

  let technological = technologicalInference(resource, accessibility);

  let environment = environmentalFactors(survey.environment_factors.value);

  let externalFactors = externalElements(technological, environment);

  const data_inference = {
    experience: getInferenceValue(experience),
    internet: getInferenceValue(internet),
    resource: getInferenceValue(resource),
    accessibility: getInferenceValue(accessibility),
    technological: getInferenceValue(technological),
    environment: getInferenceValue(environment),
    external_elements: getInferenceValue(externalFactors),
  };

  return data_inference;
}

export function getInferenceValue(inference: number) {
  let values = "";

  if (inference <= 0.2) {
    values = "Very Poor";
  } else if (inference > 0.2 && inference <= 0.4) {
    values = "Poor";
  } else if (inference > 0.4 && inference <= 0.6) {
    values = "Average";
  } else if (inference > 0.6 && inference <= 0.8) {
    values = "Good";
  } else if (inference > 0.8) {
    values = "Very Good";
  }

  const data: InferenceDetails = {
    value: parseFloat(inference.toFixed(1)),
    linguistic: values,
  };

  return data;
}
export const fuzzyfy = function (score: number) {
  let very_good = fuzzylogic.triangle(score, 0.7, 1, 1.25);
  let good = fuzzylogic.triangle(score, 0.6, 0.7, 1);
  let average = fuzzylogic.triangle(score, 0.4, 0.6, 0.7);
  let poor = fuzzylogic.triangle(score, 0, 0.4, 0.6);
  let very_poor = fuzzylogic.triangle(score, -0.25, 0, 0.4);

  return [
    parseFloat(very_good.toFixed(2)),
    parseFloat(good.toFixed(2)),
    parseFloat(average.toFixed(2)),
    parseFloat(poor.toFixed(2)),
    parseFloat(very_poor.toFixed(2)),
  ];
};
