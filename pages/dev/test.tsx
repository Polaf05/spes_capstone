import React, { useEffect, useState } from "react";
import { useClassroom } from "../../hooks/useSetClassroom";

const Test = () => {
  const { students } = useClassroom();

  useEffect(() => {
    console.log("Hey" + students);
  }, []);

  return (
    <>
      <pre>{students ? JSON.stringify(students, null, 2) : "No data"}</pre>
    </>
  );
};

export default Test;
