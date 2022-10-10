import jwt from "jsonwebtoken";
import fs from "fs";
import { User } from "../entity/User.js";

export const signJwt = (user: User) => {
  const token = jwt.sign(
    {
      sub: user.id,
      iat: Date.now(),
    },
    fs.readFileSync("key/id_rsa_priv.pem", "utf8"),
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
    fs.readFileSync("key/id_rsa_pub.pem", "utf8")
  );
  return payload;
};
