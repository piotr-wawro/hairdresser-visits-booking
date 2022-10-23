import express from "express";
import { LessThan, Like, MoreThan, QueryFailedError } from "typeorm";
import { Roles, User } from "../entity/User.js";
import { Visit } from "../entity/Visit.js";
import { ApiError } from "../lib/ApiError.js";
import {
  addVisit,
  patchVisit,
  repeat,
  serviceToTime,
} from "../lib/visitBooking.js";
import { authenticate } from "../middleware/authenticate.js";
import { verifyRole } from "../middleware/verifyRole.js";

const router = express.Router();

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

router.get(
  "/visit",
  authenticate,
  verifyRole(Roles.USER),
  async (req, res, next) => {
    const { start, end } = req.body;
    const user = req.user;

    try {
      const visits = await Visit.findBy({
        ...(end && { start: LessThan(new Date(end)) }),
        ...(start && { end: MoreThan(new Date(start)) }),
        bookedBy: user,
      });
      res.status(200).send(visits);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/visit",
  authenticate,
  verifyRole(Roles.USER),
  async (req, res, next) => {
    const { start, type, servicedBy } = req.body;
    const user = req.user;

    const newVisit = new Visit();
    newVisit.bookedBy = user;
    newVisit.start = new Date(start);
    newVisit.end = new Date(newVisit.start.getTime() + serviceToTime(type));
    newVisit.servicedBy = servicedBy;

    try {
      const employee = await User.findOneByOrFail({ id: servicedBy });
      if (employee.role !== Roles.EMPLOYEE) {
        return next(ApiError.badRequset("Select employee."));
      }

      const success = await repeat(() => addVisit(newVisit), 3);

      if (success) {
        res.status(200).send();
      } else {
        return next(ApiError.badRequset("Booked by someone else."));
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
  }
);

router.patch(
  "/visit",
  authenticate,
  verifyRole(Roles.USER),
  async (req, res, next) => {
    const { id, start, type } = req.body;
    const user = req.user;

    const patch = {
      start: new Date(start),
      end: new Date(new Date(start).getTime() + serviceToTime(type)),
    };

    try {
      const oldVisit = await Visit.findOneByOrFail({
        id: id,
        bookedById: user.id,
      });

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
  }
);

router.delete(
  "/visit",
  authenticate,
  verifyRole(Roles.USER),
  async (req, res, next) => {
    const { id } = req.body;
    const user = req.user;

    try {
      const oldVisit = await Visit.findOneByOrFail({ id, bookedById: user.id });

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
  }
);

export default router;
