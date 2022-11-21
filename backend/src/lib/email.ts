import { User } from "../entity/User.js";
import { signJwt } from "./jwt.js";

export const loginEmail = (user: User) => {
  const email = user.email;
  const token = signJwt(user);

  return {
    from: "example.company.834@gmail.com",
    to: email,
    subject: "Login to hairdresser visits booking",
    text: token,
  };
};
