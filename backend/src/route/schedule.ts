import express from "express";
import { LessThan, MoreThan } from "typeorm";
import { Schedule } from "../entity/Schedule.js";
import { Roles, User } from "../entity/User.js";
import { ApiError } from "../lib/ApiError.js";
import { authenticate } from "../middleware/authenticate.js";
import { verifyRole } from "../middleware/verifyRole.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
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
      const user = await User.findOneBy({ id: userId });

      if (user?.role != Roles.EMPLOYEE) {
        next(ApiError.badRequset("User is not an employee"));
      }

      const schedule = new Schedule();
      schedule.start = start;
      schedule.end = end;
      schedule.for = userId;

      await schedule.save();

      res.status(200);
    } catch (error) {
      next(error);
    }
  }
);

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
      schedule.start = start;
      schedule.end = end;
      schedule.for = userId;

      await schedule.save();

      res.status(200);
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

      res.status(200);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
