import { NextApiHandler } from "next";
import jwt from "jsonwebtoken";

const KEY = "akjwrenkjweijhdfsnkjdfsnjweidfsijwre";

const secretHandler: NextApiHandler = async (req, res) => {
  const { token } = req.body;

  const { admin } = jwt.verify(token, KEY) as { [key: string]: boolean };

  if (admin) {
    res.json({ secretAdminCode: 12345 });
  } else {
    res.json({ admin: false });
  }
};
