import { TaskAnalysis, TaskData } from "../../types/Students";

export function fluctuation(task: TaskData[]){

    let trend = [];
    //wala pa akong maisip na ibang logic, antok na ako ehhh hekhek
    let questionable = [];

    //PASSING NOT YET SURE
    let passsing = 7.5;
    let streak = 0;
    let consistency = 0;
    let passed = 0;

    for(let i = 0; i < task.length; i++){
        
        //Getting the trend
        if(i < task.length-1){
            let sum = task[i+1].score - task[i].score;
            trend.push(sum);
            

            if(sum >= 5){
                questionable.push(i+2);
            }else if(sum <= -5){
                questionable.push(i+2);
            }
        }

        //Getting Consistency

        if(task[i].score >= passsing){ 
            consistency++;
            passed++;
        }else{
            if(consistency > streak){
                streak = consistency;
                consistency = 0;
            }else{
                consistency = 0;
            }
        }

    }

    const sumWithInitial = trend.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0
    );


    let fluctuate = sumWithInitial / trend.length;

    const taskData : TaskAnalysis = {
        fluctuation: fluctuate,
        trend: trend,
        consistency: streak,
        passed: passed,
        questionable: questionable,
    }

    return taskData;
  
}