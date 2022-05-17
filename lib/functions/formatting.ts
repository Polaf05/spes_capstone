
//function that dynamically formats highest posible score, written task and performance task
export function getTask (item: [], counter: number){
    let works = [] as any;

    for(let counting = counter; counting <= (counter + 9); counting++){
        const written_work = {
          tasked_number: counting - (counter - 1),
          score: item[counting],
        };
        works.push(written_work);
      }

    return works;

}

export function giveValue(item: []){

    return item;
}