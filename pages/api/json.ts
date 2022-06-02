import { NextApiHandler } from "next";
import { XMLHttpRequest } from "xmlhttprequest";

const postJsonhandler: NextApiHandler = async (req, res) => {
  const { body } = req;
  let request = new XMLHttpRequest();

  request.onreadystatechange = () => {
    if (request.readyState == XMLHttpRequest.DONE) {
      console.log(request.responseText);
    }
  };

  request.open("POST", "https://api.jsonbin.io/v3/b", true);
  request.setRequestHeader("Content-Type", "application/json");
  request.setRequestHeader(
    "X-Master-Key",
    "$2b$10$wnfLIJ3QgmRaWVd8uqIWc.SxSIXMJdLAVTLdAKRcJIquIN82p.GcS"
  );

  const response = request.send(JSON.stringify(body.classroom));
  res.json(response);
};

export default postJsonhandler;
