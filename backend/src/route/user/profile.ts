import express from "express";
import { authenticate } from "../../middleware/authenticate.js";

const router = express.Router();

router.get("/", authenticate, async (req, res) => {
  const { firstName, lastName, email, phoneNumber } = req.user;
  res.status(200).send({ firstName, lastName, email, phoneNumber });
});

router.patch("/", authenticate, async (req, res, next) => {
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

export default router;
