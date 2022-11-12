import { RequestHandler } from "express";
import { loginEmail } from "../lib/email.js";
import { findUserOrCreate } from "../service/user.js";

export const logIn: RequestHandler = async (req, res, next) => {
  const email = req.body.email;

  try {
    const user = await findUserOrCreate(email);
    // transporter.sendMail(loginEmail(user));
    // res.status(200).send();
    res.status(200).send(loginEmail(user));
  } catch (error) {
    next(error);
  }
};
