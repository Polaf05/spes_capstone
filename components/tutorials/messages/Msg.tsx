import Link from "next/link";
import React from "react";

const Msg = () => {
  return (
    <p className="">
      1: Suggested Grade feature is only available if google spreadsheet survey
      results is available. Want to conduct data gathering on external elements
      that affect your student's performance? Please contact us{" "}
      <a href="/about" className="text-ocean-400 underline">
        here
      </a>
    </p>
  );
};

export default Msg;
