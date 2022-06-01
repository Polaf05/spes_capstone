import { useContext } from "react";
import { SelectedQuarterContext } from "../context/SelectedQuarter";

export const useSelectedQuarter = () => {
  const { quarter, setQuarter } = useContext(SelectedQuarterContext);
  return { quarter, setQuarter };
};
