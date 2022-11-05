import express from "express";
import { LessThan, MoreThan } from "typeorm";
import { Roles } from "../../entity/User.js";
import { Visit } from "../../entity/Visit.js";
import { authenticate } from "../../middleware/authenticate.js";
import { verifyRole } from "../../middleware/verifyRole.js";

const router = express.Router();

router.get(
  "/",
  authenticate,
  verifyRole(Roles.USER),
  async (req, res, next) => {
    const { start, end } = req.body;
    const user = req.user;

    try {
      const visits = await Visit.find({
        select: {
          id: true,
          start: true,
          end: true,
          servicedBy: {
            firstName: true,
            lastName: true,
          },
        },
        relations: {
          servicedBy: true,
        },
        where: {
          ...(end && { start: LessThan(new Date(end)) }),
          ...(start && { end: MoreThan(new Date(start)) }),
          bookedBy: user,
        },
      });
      res.status(200).send(visits);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
