export const getLabels = (label: string, quarter_length: number) => {
  let arr: string[] = [];
  for (let i = 0; i < quarter_length; i++) {
    arr.push(`${label} ${i + 1}`);
  }
  return arr;
};
