import { LinguisticVariable, Term, Rule, FIS } from "fuzzyis";

export function internetInference({
  dataValue,
  wifiValue,
}: {
  dataValue: number;
  wifiValue: number;
}) {
  const system = new FIS("Connectivity");

  //OUTPUT DECLARATION
  const INTERNET_CONNECTIVITY = new LinguisticVariable(
    "internetConnectivity",
    [0, 10]
  );

  system.addOutput(INTERNET_CONNECTIVITY);

  //INPUT DECLARATION
  const DATA = new LinguisticVariable("data", [0, 6]);
  const WIFI = new LinguisticVariable("wifi", [0, 6]);

  system.addInput(DATA);
  system.addInput(WIFI);

  //WIFI TERMS
  WIFI.addTerm(new Term("not available", "gauss", [0, 2]));
  WIFI.addTerm(new Term("bad", "gauss", [2, 4]));
  WIFI.addTerm(new Term("good", "gauss", [4, 6]));

  //DATA TERMS
  DATA.addTerm(new Term("not available", "gauss", [0, 2]));
  DATA.addTerm(new Term("bad", "gauss", [2, 4]));
  DATA.addTerm(new Term("good", "gauss", [4, 6]));

  //OUTPUT TERMS
  INTERNET_CONNECTIVITY.addTerm(new Term("very poor", "gauss", [0, 2]));
  INTERNET_CONNECTIVITY.addTerm(new Term("poor", "gauss", [2, 4]));
  INTERNET_CONNECTIVITY.addTerm(new Term("average", "gauss", [4, 6]));
  INTERNET_CONNECTIVITY.addTerm(new Term("good", "gauss", [6, 8]));
  INTERNET_CONNECTIVITY.addTerm(new Term("very good", "gauss", [8, 10]));

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

  var internet = system.getPreciseOutput([wifiValue, dataValue]);

  return internet;
}

export function resourceInference(internetValue: number, deviceValue: number) {
  const system = new FIS("resource");

  //OUTPUT DECLARATION
  const RESOURCE = new LinguisticVariable("resource", [0, 10]);

  system.addOutput(RESOURCE);

  //INPUT DECLERATION
  const INTERNET_CONNECTIVITY = new LinguisticVariable("internet", [0, 10]);
  const DEVICE = new LinguisticVariable("device", [0, 14]);

  system.addInput(DEVICE);
  system.addInput(INTERNET_CONNECTIVITY);

  //INTERNET TERMS
  INTERNET_CONNECTIVITY.addTerm(new Term("very poor", "gauss", [0, 2]));
  INTERNET_CONNECTIVITY.addTerm(new Term("poor", "gauss", [2, 4]));
  INTERNET_CONNECTIVITY.addTerm(new Term("average", "gauss", [4, 6]));
  INTERNET_CONNECTIVITY.addTerm(new Term("good", "gauss", [6, 8]));
  INTERNET_CONNECTIVITY.addTerm(new Term("very good", "gauss", [8, 10]));

  //DEVICE TERMS
  DEVICE.addTerm(new Term("no device", "gauss", [0, 2]));
  DEVICE.addTerm(new Term("rent", "gauss", [2, 4]));
  DEVICE.addTerm(new Term("borrow", "gauss", [4, 6]));
  DEVICE.addTerm(new Term("share", "gauss", [6, 8]));
  DEVICE.addTerm(new Term("mobile", "gauss", [8, 10]));
  DEVICE.addTerm(new Term("laptop", "gauss", [10, 12]));
  DEVICE.addTerm(new Term("both", "gauss", [12, 14]));

  //RESOURCE TERMS
  RESOURCE.addTerm(new Term("very poor", "gauss", [0, 2]));
  RESOURCE.addTerm(new Term("poor", "gauss", [2, 4]));
  RESOURCE.addTerm(new Term("average", "gauss", [4, 6]));
  RESOURCE.addTerm(new Term("good", "gauss", [6, 8]));
  RESOURCE.addTerm(new Term("very good", "gauss", [8, 10]));

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

    new Rule(["no device", "very good"], ["very poor"], "and"),
    new Rule(["no device", "good"], ["very poor"], "and"),
    new Rule(["no device", "average"], ["very poor"], "and"),
    new Rule(["no device", "poor"], ["very poor"], "and"),
    new Rule(["no device", "very poor"], ["very poor"], "and"),
  ];

  var resourceResult = system.getPreciseOutput([deviceValue, internetValue]);

  return resourceResult;
}
