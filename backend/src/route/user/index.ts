import express from "express";
import visit from "./visit.js";
import profile from "./profile.js";

const router = express.Router();

router.use("/profile", profile);
router.use("/visit", visit);

export default router;
