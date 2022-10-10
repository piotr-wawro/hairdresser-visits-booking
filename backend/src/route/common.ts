import express from "express";
import { transporter } from "../config/email.js";
import { User } from "../entity/User.js";
import { loginEmail } from "../lib/email.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();
router.use(express.json());

router.get("/log-in", async (req, res) => {
  const email = req.body.email;

  let user = await User.findOneBy({ email });
  if (!user) {
    user = new User();
    user.email = email;
    await user.save();
  }

  // transporter.sendMail(loginEmail(user));
  // res.status(200).send("OK");
  res.status(200).send(loginEmail(user));
});

router.get("/profile", authenticate, async (req, res) => {
  const { firstName, lastName, email, phoneNumber } = req.user;
  res.status(200).send({ firstName, lastName, email, phoneNumber });
});

router.patch("/profile", authenticate, async (req, res) => {
  const { firstName, lastName, phoneNumber } = req.body;
  const user = req.user;

  user.firstName = firstName ?? user.firstName;
  user.lastName = lastName ?? user.lastName;
  user.phoneNumber = phoneNumber ?? user.phoneNumber;
  user.save();

  res.status(200).send();
});

export default router;
