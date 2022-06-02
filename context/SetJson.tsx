import { createContext, useContext, useEffect, useState } from "react";

interface Json {
  json: string | null;
  setJson: React.Dispatch<React.SetStateAction<string | null>>;
}

export const SetJsonContext = createContext<Json>({} as Json);

export const SetJsonProvider: React.FC = ({ children }) => {
  const [json, setJson] = useState<string | null>(null);

  // on load get json
  useEffect(() => {
    const localJson = localStorage.getItem("json");
    if (localJson) {
      setJson(JSON.parse(localJson));
      console.log("GET JSON: ", localJson);
    }
  }, []);

  // on set student
  useEffect(() => {
    if (json) {
      localStorage.setItem("json", JSON.stringify(json));
      console.log("SET JSON: ", json);
    }
  }, [json]);

  return (
    <SetJsonContext.Provider value={{ json, setJson }}>
      {children}
    </SetJsonContext.Provider>
  );
};
