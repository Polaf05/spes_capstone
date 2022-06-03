import { useContext } from "react";
import { SetJsonContext } from "../context/SetJson";

export const useJson = () => {
  const { jsonFile, setJsonFile } = useContext(SetJsonContext);
  return { jsonFile, setJsonFile };
};
