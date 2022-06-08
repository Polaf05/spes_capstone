import React from "react";
import ReactTooltip from "react-tooltip";

const Test = () => {
  return (
    <div>
      <a data-tip data-for="happyFace">
        {" "}
        d(`･∀･)b{" "}
      </a>
      <ReactTooltip id="happyFace" type="error">
        <span>Show happy face</span>
      </ReactTooltip>
    </div>
  );
};

export default Test;
