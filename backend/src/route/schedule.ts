import express from "express";
import { LessThan, MoreThan } from "typeorm";
import { Schedule } from "../entity/Schedule.js";
import { Roles, User } from "../entity/User.js";
import { ApiError } from "../lib/ApiError.js";
import { addSchedule } from "../lib/serializableRequest.js";
import { repeat } from "../lib/visitBooking.js";
import { authenticate } from "../middleware/authenticate.js";
import { verifyRole } from "../middleware/verifyRole.js";

const router = express.Router();

router.get("/all", async (req, res, next) => {
  const { start, end } = req.body;

  try {
    const schedule = await Schedule.findBy({
      ...(end && { start: LessThan(new Date(end)) }),
      ...(start && { end: MoreThan(new Date(start)) }),
    });
    res.status(200).send(schedule);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  authenticate,
  verifyRole(Roles.MANAGER),
  async (req, res, next) => {
    const { start, end, userId } = req.body;

    try {
      const user = await User.findOneByOrFail({ id: userId });

      if (user?.role != Roles.EMPLOYEE) {
        next(ApiError.badRequset("User is not an employee."));
      }

      const schedule = new Schedule();
      schedule.start = new Date(start);
      schedule.end = new Date(end);
      schedule.for = user;

      const success = await repeat(() => addSchedule(schedule), 3);

      if (success) {
        res.status(200).send();
      } else {
        next(ApiError.conflict("Schedule is overlapping."));
      }
    } catch (error) {
      next(error);
    }
  }
);

router.get("/", async (req, res, next) => {
  const { id } = req.body;

  try {
    const schedule = await Schedule.findOneByOrFail({ id });
    res.status(200).send(schedule);
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/",
  authenticate,
  verifyRole(Roles.MANAGER),
  async (req, res, next) => {
    const { id, start, end, userId } = req.body;

    try {
      const user = await User.findOneBy({ id: userId });

      if (user?.role != Roles.EMPLOYEE) {
        next(ApiError.badRequset("User is not an employee"));
      }

      const schedule = await Schedule.findOneByOrFail({ id });
      schedule.start = start ?? schedule.start;
      schedule.end = end ?? schedule.end;
      schedule.for = user ?? schedule.for;

      await schedule.save();

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/",
  authenticate,
  verifyRole(Roles.MANAGER),
  async (req, res, next) => {
    const { id } = req.body;

    try {
      const schedule = await Schedule.findOneByOrFail({ id });
      await schedule.remove();
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
);

export default router;
