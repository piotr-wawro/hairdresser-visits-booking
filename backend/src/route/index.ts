import express from "express";
import cors from "cors";
import { logIn } from "../controller/session.js";
import employee from "./employee.js";
import schedule from "./schedule.js";
import user from "./user/index.js";
import visit from "./visit.js";

const router = express.Router();

router.use(express.json());
router.use(cors());

router.get("/log-in", logIn);

router.use("/user", user);
router.use("/employee", employee);
router.use("/visit", visit);
router.use("/schedule", schedule);

export default router;
