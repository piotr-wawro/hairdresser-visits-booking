import express from "express";
import { getUserVisits } from "../../controller/user.js";
import { Roles } from "../../entity/User.js";
import { authenticate } from "../../middleware/authenticate.js";
import { verifyRole } from "../../middleware/verifyRole.js";

const router = express.Router();

router.get("/", authenticate, verifyRole(Roles.USER), getUserVisits);

export default router;
