import express from "express";
import { Roles, User } from "../entity/User.js";
import { ApiError } from "../lib/ApiError.js";
import { addUser } from "../lib/serializableRequest.js";
import { isEmailValid } from "../lib/validateEmail.js";
import { repeat } from "../lib/visitBooking.js";
import { authenticate } from "../middleware/authenticate.js";
import { verifyRole } from "../middleware/verifyRole.js";

const router = express.Router();

router.get(
  "/all",
  authenticate,
  verifyRole(Roles.MANAGER),
  async (req, res, next) => {
    try {
      const eployees = await User.find({
        where: [{ role: Roles.EMPLOYEE }, { role: Roles.MANAGER }],
      });
      res.status(200).send(eployees);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/all", async (req, res, next) => {
  try {
    const eployees = await User.find({
      select: {
        id: true,
        firstName: true,
        lastName: true,
      },
      where: [{ role: Roles.EMPLOYEE }, { role: Roles.MANAGER }],
    });
    res.status(200).send(eployees);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  authenticate,
  verifyRole(Roles.MANAGER),
  async (req, res, next) => {
    const { firstName, lastName, email, phoneNumber } = req.body;

    try {
      if (!isEmailValid(email)) throw ApiError.badRequset("Invalid email.");

      const employee = new User();
      employee.role = Roles.EMPLOYEE;
      employee.firstName = firstName;
      employee.lastName = lastName;
      employee.email = email;
      employee.phoneNumber = phoneNumber;

      const success = await repeat(() => addUser(employee), 3);

      if (success) {
        res.status(200).send();
      } else {
        return next(ApiError.conflict(`User with ${email} already exists.`));
      }
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/",
  authenticate,
  verifyRole(Roles.MANAGER),
  async (req, res, next) => {
    const { id } = req.body;

    try {
      const employee = await User.findOne({
        where: [
          { id, role: Roles.EMPLOYEE },
          { id, role: Roles.MANAGER },
        ],
      });

      res.status(200).send(employee);
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
    const { id, firstName, lastName, email, phoneNumber } = req.body;

    try {
      const employee = await User.findOneOrFail({
        where: [
          { id, role: Roles.EMPLOYEE },
          { id, role: Roles.MANAGER },
        ],
      });
      employee.firstName = firstName ?? employee?.firstName;
      employee.lastName = lastName ?? employee?.lastName;
      employee.email = email ?? employee?.email;
      employee.phoneNumber = phoneNumber ?? employee?.phoneNumber;
      await employee.save();

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
      const employee = await User.findOneOrFail({
        where: [
          { id, role: Roles.EMPLOYEE },
          { id, role: Roles.MANAGER },
        ],
      });
      await employee.remove();

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
);

export default router;
