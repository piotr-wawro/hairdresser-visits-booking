import express from "express";
import { getUserProfile, patchUserProfile } from "../../controller/user.js";
import { authenticate } from "../../middleware/authenticate.js";

const router = express.Router();

router.get("/", authenticate, getUserProfile);
router.patch("/", authenticate, patchUserProfile);

export default router;
