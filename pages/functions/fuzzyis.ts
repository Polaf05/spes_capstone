import { LinguisticVariable, Term, Rule, FIS } from "fuzzyis";

// const system = new FIS("Internet Connectivity");
// const TIP = new LinguisticVariable("tip", [0, 30]);
// system.addOutput(TIP);
// const FOOD = new LinguisticVariable("service", [0, 10]);
// const SERVICE = new LinguisticVariable("food", [0, 10]);
// system.addInput(SERVICE);
// system.addInput(FOOD);
// SERVICE.addTerm(new Term("poor", "gauss", [2.123, 0]));
// SERVICE.addTerm(new Term("normal", "gauss", [2.123, 5]));
// SERVICE.addTerm(new Term("excellent", "gauss", [2.123, 10]));
// FOOD.addTerm(new Term("bad", "trapeze", [0, 0, 1, 3]));
// FOOD.addTerm(new Term("good", "trapeze", [7, 9, 10, 10]));
// TIP.addTerm(new Term("small", "triangle", [0, 5, 10]));
// TIP.addTerm(new Term("average", "triangle", [10, 15, 20]));
// TIP.addTerm(new Term("generous", "triangle", [20, 25, 30]));
// system.rules = [
//   new Rule(["poor", "bad"], ["small"], "and"),
//   new Rule(["normal", null], ["average"], "and"),
//   new Rule(["excellent", "good"], ["generous"], "and"),
// ];
// var num1 = 7;
// var num2 = 8;
// console.log(system.getPreciseOutput([num1, num2])[0]);
// var stringgy = system.getPreciseOutput([num1, num2]);
// console.log(stringgy[0] + 5);
// return system.getPreciseOutput([num1, num2])[0];

function internetInference({
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

function resourceInference(internet: number, device: number) {
  const system = new FIS("resource");

  //OUTPUT DECLARATION
  const RESOURCE = new LinguisticVariable("resource", [0, 10]);

  system.addOutput(RESOURCE);
}

export default internetInference;
