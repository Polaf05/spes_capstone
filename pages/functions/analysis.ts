export function fluctuation(task: number[]){

    let trend = [];
    //wala pa akong maisip na ibang logic, antok na ako ehhh hekhek
    let leni = [];
    let marcos = [];

    //PASSING NOT YET SURE
    let passsing = 7.5;
    let streak = 0;
    let consistency = 0;
    let passed = 0;

    for(let i = 0; i< task.length-1; i++){
        
        //Getting the trend
        let sum = task[i+1] - task[i];
        trend.push(sum);

        if(sum >= 5){
            leni.push(i);
        }else if(sum <= -5){
            marcos.push(i);
        }

        //Getting Consistency

        if(task[i] >= passsing){ 
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
  
}