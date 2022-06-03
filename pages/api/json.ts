import { NextApiHandler } from "next";
import { XMLHttpRequest } from "xmlhttprequest";

const postJsonhandler: NextApiHandler = async (req, res) => {
  const { body } = req;

  console.log(body);

  try {
    const response = await fetch("https://api.jsonbin.io/v3/b", {
      method: "POST",
      headers: {
        "X-Master-Key":
          "$2b$10$wnfLIJ3QgmRaWVd8uqIWc.SxSIXMJdLAVTLdAKRcJIquIN82p.GcS",
        "Contetnt-Type": "application/json",
        "X-Bin-Name": "students",
      },
      body: JSON.stringify(body),
    });
    if (response.status >= 400) {
      return res.status(400).json({
        error: "there was an error",
      });
    }
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ error: "There was an error" });
  }
};

export default postJsonhandler;
