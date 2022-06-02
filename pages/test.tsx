import React from "react";
import { useSelectedQuarter } from "../hooks/useSelectedQuarter";

const Test = () => {
  const { quarter } = useSelectedQuarter();
  return <div>Quarter: {quarter}</div>;
};

export default Test;
