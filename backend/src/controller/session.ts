import { RequestHandler } from "express";
import { transporter } from "../config/email.js";
import { loginEmail } from "../lib/email.js";
import { findUserOrCreate } from "../service/user.js";

export const logIn: RequestHandler = async (req, res, next) => {
  const email = req.body.email;

  try {
    const user = await findUserOrCreate(email);

    if (process.env.ENVIRONMENT === "prod") {
      transporter.sendMail(loginEmail(user));
      res.status(200).send();
    } else {
      res.status(200).send(loginEmail(user));
    }
  } catch (error) {
    next(error);
  }
};
