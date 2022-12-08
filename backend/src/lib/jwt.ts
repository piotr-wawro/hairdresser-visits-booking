import jwt from "jsonwebtoken";
import fs from "fs";
import { User } from "../entity/User.js";

export const signJwt = (user: User) => {
  const token = jwt.sign(
    {
      sub: user.id,
      iat: Date.now(),
    },
    fs.readFileSync(process.env.PRIV_KEY || "", "utf8"),
    {
      expiresIn: "1w",
      algorithm: "RS256",
    }
  );

  return token;
};

export const verifyJwt = (token: string) => {
  const payload = jwt.verify(
    token,
    fs.readFileSync(process.env.PUB_KEY || "", "utf8")
  );
  return payload;
};
