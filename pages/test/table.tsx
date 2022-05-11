import React from "react";

import { useClassroom } from "../../hooks/useSetClassroom";

const Table = () => {
  const { students } = useClassroom();
  return (
    <div>
      <pre>{students ? JSON.stringify(students, null, 2) : "No file"}</pre>
    </div>
  );
};

export default Table;
