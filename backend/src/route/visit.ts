import express from "express";
import { LessThan, MoreThan } from "typeorm";
import { Roles, User } from "../entity/User.js";
import { Visit } from "../entity/Visit.js";
import { ApiError } from "../lib/ApiError.js";
import { authenticate } from "../middleware/authenticate.js";
import { verifyRole } from "../middleware/verifyRole.js";

const router = express.Router();

router.get("/all", async (req, res, next) => {
  const { start, end } = req.body;
  const user = req.user;

  try {
    const visits = await Visit.findBy({
      ...(end && { start: LessThan(new Date(end)) }),
      ...(start && { end: MoreThan(new Date(start)) }),
    });
    res.status(200).send(visits);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  authenticate,
  verifyRole(Roles.MANAGER),
  async (req, res, next) => {
    const { start, end, userId, employeeId } = req.body;

    try {
      const user = await User.findOneByOrFail({ id: userId });
      if (user?.role != Roles.USER) {
        next(ApiError.badRequset("User is not an user"));
      }

      const employee = await User.findOneByOrFail({ id: employeeId });
      if (employee?.role != Roles.EMPLOYEE) {
        next(ApiError.badRequset("User is not an employee"));
      }

      const visits = new Visit();
      visits.start = start;
      visits.end = end;
      visits.bookedBy = user;
      visits.servicedBy = employee;
      visits.save();

      res.status(200).send(visits);
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
    const { id, start, end, userId, employeeId } = req.body;

    try {
      let user = null;
      if (userId) {
        user = await User.findOneByOrFail({ id: userId });
        if (user?.role != Roles.USER) {
          next(ApiError.badRequset("User is not an user"));
        }
      }

      let employee = null;
      if (employeeId) {
        employee = await User.findOneByOrFail({ id: employeeId });
        if (employee?.role != Roles.EMPLOYEE) {
          next(ApiError.badRequset("User is not an employee"));
        }
      }

      const visits = await Visit.findOneByOrFail({ id });
      if (start) visits.start = start;
      if (end) visits.end = end;
      if (user) visits.bookedBy = user;
      if (employee) visits.servicedBy = employee;
      await visits.save();

      res.status(200).send(visits);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  authenticate,
  verifyRole(Roles.MANAGER),
  async (req, res, next) => {
    const { id } = req.body;

    try {
      const visits = await Visit.findOneByOrFail({ id });
      await visits.remove();

      res.status(200).send(visits);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
