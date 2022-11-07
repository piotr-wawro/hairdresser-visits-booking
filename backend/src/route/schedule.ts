import express from "express";
import {
  deleteSchedule,
  getAllSchedules,
  getSchedule,
  patchSchedule,
  postSchedule,
} from "../controller/schedule.js";
import { Roles } from "../entity/User.js";
import { authenticate } from "../middleware/authenticate.js";
import { verifyRole } from "../middleware/verifyRole.js";

const router = express.Router();

router.get("/all", getAllSchedules);

router.post("/", authenticate, verifyRole(Roles.MANAGER), postSchedule);

router.get("/", getSchedule);

router.patch("/", authenticate, verifyRole(Roles.MANAGER), patchSchedule);

router.delete("/", authenticate, verifyRole(Roles.MANAGER), deleteSchedule);

export default router;
