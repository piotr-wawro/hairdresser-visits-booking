import express from "express";
import { transporter } from "../config/email.js";
import { User } from "../entity/User.js";
import { loginEmail } from "../lib/email.js";
import employee from "./employee.js";
import schedule from "./schedule.js";
import user from "./user/index.js";
import visit from "./visit.js";

const router = express.Router();
router.use(express.json());

router.get("/log-in", async (req, res, next) => {
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
});

router.use("/user", user);
router.use("/employee", employee);
router.use("/visit", visit);
router.use("/schedule", schedule);

export default router;
