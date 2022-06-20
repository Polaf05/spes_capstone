import { createContext, useContext, useEffect, useState } from "react";
import { JsonState } from "../types/Contexts";

export const SetJsonContext = createContext<JsonState>({} as JsonState);

export const SetJsonProvider: React.FC = ({ children }) => {
  const [jsonFile, setJsonFile] = useState<string>("");

  // on load get json
  useEffect(() => {
    const localJson = localStorage.getItem("json_file");
    if (localJson) {
      setJsonFile(JSON.parse(localJson));
      ////console.log("GET JSON: ", localJson);
    }
  }, []);

  // on set student
  useEffect(() => {
    if (jsonFile) {
      localStorage.setItem("json_file", JSON.stringify(jsonFile));
      ////console.log("SET JSON: ", jsonFile);
    }
  }, [jsonFile]);

  return (
    <SetJsonContext.Provider value={{ jsonFile, setJsonFile }}>
      {children}
    </SetJsonContext.Provider>
  );
};
