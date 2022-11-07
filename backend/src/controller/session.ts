import { RequestHandler } from "express";
import { User } from "../entity/User.js";
import { loginEmail } from "../lib/email.js";

export const logIn: RequestHandler = async (req, res, next) => {
  const email = req.body.email;

  try {
    let user = await User.findOneBy({ email });
    if (!user) {
      user = new User();
      user.email = email;
      await user.save();
    }

    // transporter.sendMail(loginEmail(user));
    // res.status(200).send("OK");
    res.status(200).send(loginEmail(user));
  } catch (error) {
    next(error);
  }
};
