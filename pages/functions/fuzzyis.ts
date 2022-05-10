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

  let internet = system.getPreciseOutput([wifiValue, dataValue]);

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
    new Rule(["borrow", "good"], ["poor"], "and"),
    new Rule(["borrow", "average"], ["poor"], "and"),
    new Rule(["borrow", "poor"], ["poor"], "and"),
    new Rule(["borrow", "very poor"], ["very poor"], "and"),

    new Rule(["no device", "very good"], ["very poor"], "and"),
    new Rule(["no device", "good"], ["very poor"], "and"),
    new Rule(["no device", "average"], ["very poor"], "and"),
    new Rule(["mo device", "poor"], ["very poor"], "and"),
    new Rule(["no device", "very poor"], ["very poor"], "and"),
  ];

  let resources = system.getPreciseOutput([internetValue,deviceValue]);

  return resources;
}

export function accessibilityInference(technologyValue: number, platformsValue: number){

  const system = new FIS("Accessibiblity"); 

  //OUTPUT DECLARATION

  const ACCESSIBILITY = new LinguisticVariable("accessibility", [0,10]);

  system.addOutput(ACCESSIBILITY);

  //INPUT DECLARATION

  const TECHNOLOGY = new LinguisticVariable("technology", [0,10]);
  const PLATFORM = new LinguisticVariable("platform", [0,10]);

  system.addInput(TECHNOLOGY);
  system.addInput(PLATFORM);

  //TECHNOLOGY TERMS

  TECHNOLOGY.addTerm(new Term("very difficult", 'gauss', [0,2]));
  TECHNOLOGY.addTerm(new Term("difficult", 'gauss', [2,4]));
  TECHNOLOGY.addTerm(new Term("easy", 'gauss', [4,6]));
  TECHNOLOGY.addTerm(new Term("quite easy", 'gauss', [6,8]));
  TECHNOLOGY.addTerm(new Term("very easy", 'gauss', [8,10]));

  //PLATFORM TERMS

  PLATFORM.addTerm(new Term('very difficcult', 'gauss', [0,2]))
  PLATFORM.addTerm(new Term('difficcult', 'gauss', [2,4]))
  PLATFORM.addTerm(new Term('accessible', 'gauss', [4,6]))
  PLATFORM.addTerm(new Term('quite easy', 'gauss', [6,8]))
  PLATFORM.addTerm(new Term('very easy', 'gauss', [8,10]))

  //ACCESSSIBILTY TERMS

  ACCESSIBILITY.addTerm(new Term("very poor", "gauss", [0, 2]));
  ACCESSIBILITY.addTerm(new Term("poor", "gauss", [2, 4]));
  ACCESSIBILITY.addTerm(new Term("average", "gauss", [4, 6]));
  ACCESSIBILITY.addTerm(new Term("good", "gauss", [6, 8]));
  ACCESSIBILITY.addTerm(new Term("very good", "gauss", [8, 10]));

  system.rules = [
    new Rule(["very easy", "very easy"],["very good"], "and"),
    new Rule(["very easy", "quiet easy"],["very good"], "and"),
    new Rule(["very easy", "accessible"],["good"], "and"),
    new Rule(["very easy", "difficult"],["good"], "and"),
    new Rule(["very easy", "very difficult"],["average"], "and"),

    new Rule(["quite easy", "very easy"],["very good"], "and"),
    new Rule(["quite easy", "quiet easy"],["good"], "and"),
    new Rule(["quite easy", "accessible"],["good"], "and"),
    new Rule(["quite easy", "difficult"],["average"], "and"),
    new Rule(["quite easy", "very difficult"],["average"], "and"),
    
    new Rule(["easy", "very easy"],["good"], "and"),
    new Rule(["easy", "quiet easy"],["good"], "and"),
    new Rule(["easy", "accessible"],["average"], "and"),
    new Rule(["easy", "difficult"],["average"], "and"),
    new Rule(["easy", "very difficult"],["poor"], "and"),
    
    new Rule(["difficult", "very easy"],["good"], "and"),
    new Rule(["difficult", "quiet easy"],["average"], "and"),
    new Rule(["difficult", "accessible"],["average"], "and"),
    new Rule(["difficult", "difficult"],["poor"], "and"),
    new Rule(["difficult", "very difficult"],["poor"], "and"),
    
    new Rule(["very difficult", "very easy"],["average"], "and"),
    new Rule(["very difficult", "quiet easy"],["average"], "and"),
    new Rule(["very difficult", "accessible"],["poor"], "and"),
    new Rule(["very difficult", "difficult"],["poor"], "and"),
    new Rule(["very difficult", "very difficult"],["very poor"], "and"),

  ];

  let accessibilityM = system.getPreciseOutput([technologyValue,platformsValue]);

  return accessibilityM;

}

export function technologicalInference(resourceValue: number, accessibilityValue: number){

    const system = new FIS("technological factors");

    //OUTPUT DECLARATION
    const TECHNOLOGICAL = new LinguisticVariable("Tfactor", [0,10]);

    system.addOutput(TECHNOLOGICAL);

    //INPUT DECLATION

    const RESOURCE = new LinguisticVariable('resource', [0,10]);
    const ACCESSIBILITY = new LinguisticVariable('accessilibity',[0,10]);

    system.addInput(RESOURCE);
    system.addInput(ACCESSIBILITY);

    //RESOURCE TERMS

    RESOURCE.addTerm(new Term("very poor", "gauss", [0, 2]));
    RESOURCE.addTerm(new Term("poor", "gauss", [2, 4]));
    RESOURCE.addTerm(new Term("average", "gauss", [4, 6]));
    RESOURCE.addTerm(new Term("good", "gauss", [6, 8]));
    RESOURCE.addTerm(new Term("very good", "gauss", [8, 10]));

    //ACCESSSIBILTY TERMS

    ACCESSIBILITY.addTerm(new Term("very poor", "gauss", [0, 2]));
    ACCESSIBILITY.addTerm(new Term("poor", "gauss", [2, 4]));
    ACCESSIBILITY.addTerm(new Term("average", "gauss", [4, 6]));
    ACCESSIBILITY.addTerm(new Term("good", "gauss", [6, 8]));
    ACCESSIBILITY.addTerm(new Term("very good", "gauss", [8, 10]));

    //TECHNOLOGICAL TERMS

    TECHNOLOGICAL.addTerm(new Term("very poor", "gauss", [0, 2]));
    TECHNOLOGICAL.addTerm(new Term("poor", "gauss", [2, 4]));
    TECHNOLOGICAL.addTerm(new Term("average", "gauss", [4, 6]));
    TECHNOLOGICAL.addTerm(new Term("good", "gauss", [6, 8]));
    TECHNOLOGICAL.addTerm(new Term("very good", "gauss", [8, 10]));

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

    return Tfactor;
}

export function environmentalFactors(envVariables: number[]){

  //summation of the values inside the array of environmental variables
  const sum = envVariables.reduce((partialSum, a) => partialSum + a, 0);

  let average = sum / envVariables.length;

  return average;

}

export function externalElements(technologicalValue:number, environmentalValue: number ){

  const system = new FIS("external Elements");

  //OUTPUT DECLARATION

  const EXTERNAL = new LinguisticVariable("external", [0,10]);

  system.addOutput(EXTERNAL);

  //INPUT DECLARATION

  const TECHNOLOGICAL = new LinguisticVariable("technological", [0,10]);
  const ENVIRONMENTAL = new LinguisticVariable("environment", [0,10]);

  system.addInput(TECHNOLOGICAL);
  system.addInput(ENVIRONMENTAL);

  //TECHNOLOGICAL TERMS
  TECHNOLOGICAL.addTerm(new Term('very poor','gauss',[0,10]));
  TECHNOLOGICAL.addTerm(new Term('poor','gauss',[0,10]));
  TECHNOLOGICAL.addTerm(new Term('average','gauss',[0,10]));
  TECHNOLOGICAL.addTerm(new Term('good','gauss',[0,10]));
  TECHNOLOGICAL.addTerm(new Term('very good','gauss',[0,10]));

  //ENVIRONMENTAL TERMS
  ENVIRONMENTAL.addTerm(new Term('very poor','gauss',[0,10]));
  ENVIRONMENTAL.addTerm(new Term('poor','gauss',[0,10]));
  ENVIRONMENTAL.addTerm(new Term('average','gauss',[0,10]));
  ENVIRONMENTAL.addTerm(new Term('good','gauss',[0,10]));
  ENVIRONMENTAL.addTerm(new Term('very good','gauss',[0,10]));

  //Rule Base

  system.rules =[
    new Rule(['very good','very good'],['very good'],'and'),
    new Rule(['very good','good'],['good'],'and'),
    new Rule(['very good','average'],['good'],'and'),
    new Rule(['very good','poor'],['average'],'and'),
    new Rule(['very good','very poor'],['poor'],'and'),

    new Rule(['good','very good'],['very good'],'and'),
    new Rule(['good','good'],['good'],'and'),
    new Rule(['good','average'],['average'],'and'),
    new Rule(['good','poor'],['poor'],'and'),
    new Rule(['good','very poor'],['poor'],'and'),
    
    new Rule(['average','very good'],['good'],'and'),
    new Rule(['average','good'],['average'],'and'),
    new Rule(['average','average'],['poor'],'and'),
    new Rule(['average','poor'],['poor'],'and'),
    new Rule(['average','very poor'],['very poor'],'and'),
    
    new Rule(['poor','average'],['good'],'and'),
    new Rule(['poor','poor'],['average'],'and'),
    new Rule(['poor','poor'],['poor'],'and'),
    new Rule(['poor','very poor'],['poor'],'and'),
    new Rule(['poor','very poor'],['very poor'],'and'),
    
    new Rule(['very poor','very poor'],['good'],'and'),
    new Rule(['very poor','very poor'],['average'],'and'),
    new Rule(['very poor','very poor'],['poor'],'and'),
    new Rule(['very poor','very poor'],['poor'],'and'),
    new Rule(['very poor','very poor'],['very poor'],'and'),

  ];

  let externalElements = system.getPreciseOutput([technologicalValue,environmentalValue]);

  return externalElements;
}