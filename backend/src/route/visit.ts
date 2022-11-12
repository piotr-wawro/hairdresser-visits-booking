import express from "express";
import {
  delteVisit,
  getAllVisits,
  getVisit,
  patchVisit,
  postVisit,
} from "../controller/visit.js";
import { Roles } from "../entity/User.js";
import { authenticate } from "../middleware/authenticate.js";
import { verifyRole } from "../middleware/verifyRole.js";

const router = express.Router();

router.get("/all", getAllVisits);

router.post("/", authenticate, verifyRole(Roles.USER), postVisit);

router.get("/", getVisit);

router.patch("/", authenticate, verifyRole(Roles.USER), patchVisit);

router.delete("/", authenticate, verifyRole(Roles.USER), delteVisit);

export default router;
