export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

export const studentInCategory = (
  category: any,
  overall: any,
  wworks: any,
  ptasks: any
) => {
  return category === "Over All"
    ? overall
    : category === "Written Works"
    ? wworks
    : ptasks;
};
