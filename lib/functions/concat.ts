import { stringify } from "querystring";

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

export const formatName = (name: string) => {
  let myName: string[] = name.split(" ");
  if (!name.match(",")) {
    myName.forEach((element, idx) => {
      myName[idx] = capitalize(element.toLowerCase());
      if (idx === 0) {
        myName[idx] = capitalize(element.toLowerCase().concat(", "));
      }
    });
  }
  return myName.join(" ");
};

export const capitalize = (string: string) =>
  string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
