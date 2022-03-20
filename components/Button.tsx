import React from "react";
import { ButtonType } from "../lib/types";

export const Button: React.FC<ButtonType> = ({ name, property }) => {
  return (
    <React.Fragment>
      <button className={property}>{name}</button>
    </React.Fragment>
  );
};
