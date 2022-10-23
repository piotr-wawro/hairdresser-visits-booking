import express from "express";
import { LessThan, MoreThan } from "typeorm";
import { transporter } from "../config/email.js";
import { User } from "../entity/User.js";
import { Visit } from "../entity/Visit.js";
import { loginEmail } from "../lib/email.js";
import user from "./user.js";

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

router.get("/visit", async (req, res, next) => {
  const { start, end } = req.body;

  try {
    const visits = await Visit.find({
      select: {
        start: true,
        end: true,
        servicedBy: {
          firstName: true,
          email: false,
          phoneNumber: false,
        },
      },
      relations: {
        servicedBy: true,
      },
      where: {
        start: LessThan(new Date(end)),
        end: MoreThan(new Date(start)),
      },
    });

    res.status(200).send(visits);
  } catch (error) {
    next(error);
  }
});

router.use("/user", user);

export default router;
