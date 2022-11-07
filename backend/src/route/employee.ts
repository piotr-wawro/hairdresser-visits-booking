import express from "express";
import {
  deleteEmpoyee,
  getAllEmpoyyes,
  getAllEmpoyyesAsManager,
  getEmpoyee,
  patchEmpoyee,
  postEmpoyee,
} from "../controller/employee.js";
import { Roles } from "../entity/User.js";
import { authenticate } from "../middleware/authenticate.js";
import { verifyRole } from "../middleware/verifyRole.js";

const router = express.Router();

router.get(
  "/all",
  authenticate,
  verifyRole(Roles.MANAGER),
  getAllEmpoyyesAsManager
);

router.get("/all", getAllEmpoyyes);

router.post("/", authenticate, verifyRole(Roles.MANAGER), postEmpoyee);

router.get("/", authenticate, verifyRole(Roles.MANAGER), getEmpoyee);

router.patch("/", authenticate, verifyRole(Roles.MANAGER), patchEmpoyee);

router.delete("/", authenticate, verifyRole(Roles.MANAGER), deleteEmpoyee);

export default router;
