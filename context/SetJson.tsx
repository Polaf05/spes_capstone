import { createContext, useContext, useEffect, useState } from "react";

interface Json {
  json: string;
  setJson: React.Dispatch<React.SetStateAction<string>>;
}

export const SetJsonContext = createContext<Json | null>({} as Json);

export const SetJsonProvider: React.FC = ({ children }) => {
  const [json, setJson] = useState<string>("");

  // on load get json
  useEffect(() => {
    const localJson = localStorage.getItem("json");
    if (localJson) setJson(JSON.parse(localJson));
  }, []);

  // on set student
  useEffect(() => {
    if (json) localStorage.setItem("json", JSON.stringify(json));
  }, [json]);

  return (
    <SetJsonContext.Provider value={{ json, setJson }}>
      {children}
    </SetJsonContext.Provider>
  );
};
