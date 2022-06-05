import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

const secret: any = process.env.SECRET;

export default async function (req: any, res: any) {
  const { username, password } = req.body;

  // Check in the database
  // if a user with this username
  // and password exists
  if (username === "admin" && password === "admin") {
    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
        username: username,
      },
      secret
    );

    const serialised = serialize("OursiteJWT", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialised);

    res.status(200).json({ message: "Success!" });
  } else {
    res.json({ message: "Invalid credentials!" });
  }
}
