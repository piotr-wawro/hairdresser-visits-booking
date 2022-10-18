import express from "express";
import { LessThan, MoreThan, QueryFailedError } from "typeorm";
import { transporter } from "../config/email.js";
import { User } from "../entity/User.js";
import { Visit } from "../entity/Visit.js";
import { ApiError } from "../lib/ApiError.js";
import { loginEmail } from "../lib/email.js";
import {
  addVisit,
  patchVisit,
  repeat,
  serviceToTime,
} from "../lib/visitBooking.js";
import { authenticate } from "../middleware/authenticate.js";

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

router.get("/profile", authenticate, async (req, res) => {
  const { firstName, lastName, email, phoneNumber } = req.user;
  res.status(200).send({ firstName, lastName, email, phoneNumber });
});

router.patch("/profile", authenticate, async (req, res, next) => {
  const { firstName, lastName, phoneNumber } = req.body;
  const user = req.user;

  user.firstName = firstName ?? user.firstName;
  user.lastName = lastName ?? user.lastName;
  user.phoneNumber = phoneNumber ?? user.phoneNumber;

  try {
    await user.save();
    res.status(200).send();
  } catch (error) {
    next(error);
  }
});

router.get("/visit", async (req, res, next) => {
  const { start, end } = req.body;

  try {
    const visits = await Visit.findBy({
      start: LessThan(new Date(end)),
      end: MoreThan(new Date(start)),
    });
    res.status(200).send(visits);
  } catch (error) {
    next(error);
  }
});

router.post("/visit", authenticate, async (req, res, next) => {
  const { start, type } = req.body;
  const user = req.user;

  const newVisit = new Visit();
  newVisit.user = user;
  newVisit.start = new Date(start);
  newVisit.end = new Date(newVisit.start.getTime() + serviceToTime(type));

  try {
    const success = await repeat(() => addVisit(newVisit), 3);

    if (success) {
      res.status(200).send();
    } else {
      next(ApiError.badRequset("Booked by someone else."));
    }
  } catch (error) {
    if (
      error instanceof QueryFailedError &&
      error.driverError.code === "40001"
    ) {
      next(
        ApiError.conflict(
          "Could not serialize access due to read/write dependencies among transactions."
        )
      );
    } else {
      next(error);
    }
  }
});

router.patch("/visit", authenticate, async (req, res, next) => {
  const { id, start, type } = req.body;
  const user = req.user;

  const patch = {
    start: new Date(start),
    end: new Date(start + serviceToTime(type)),
  };

  try {
    const oldVisit = await Visit.findOneByOrFail({ id });
    if (oldVisit.userId !== user.id) {
      next(ApiError.unauthorized("Can not edit someone else visit."));
      return;
    }
    const success = await repeat(() => patchVisit(oldVisit, patch), 3);

    if (success) {
      res.status(200).send();
    } else {
      next(ApiError.badRequset("Booked by someone else."));
    }
  } catch (error) {
    if (
      error instanceof QueryFailedError &&
      error.driverError.code === "40001"
    ) {
      next(
        ApiError.conflict(
          "Could not serialize access due to read/write dependencies among transactions."
        )
      );
    } else {
      next(error);
    }
  }
});

router.delete("/visit", authenticate, async (req, res, next) => {
  const { id } = req.body;
  const user = req.user;

  try {
    const oldVisit = await Visit.findOneByOrFail({ id });
    if (oldVisit.userId !== user.id) {
      next(ApiError.unauthorized("Can not edit someone else visit."));
      return;
    }

    await oldVisit.remove();
    res.status(200).send();
  } catch (error) {
    if (
      error instanceof QueryFailedError &&
      error.driverError.code === "40001"
    ) {
      next(
        ApiError.conflict(
          "Could not serialize access due to read/write dependencies among transactions."
        )
      );
    } else {
      next(error);
    }
  }
});

export default router;
