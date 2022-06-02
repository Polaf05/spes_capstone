import { useContext } from "react";
import { SetJsonContext } from "../context/SetJSON";

export const useJson = () => {
  const { json, setJson } = useContext(SetJsonContext);
  return { json, setJson };
};
