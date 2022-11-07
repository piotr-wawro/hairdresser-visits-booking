import { RequestHandler } from "express";
import { LessThan, MoreThan } from "typeorm";
import { Visit } from "../entity/Visit.js";

export const getUserProfile: RequestHandler = async (req, res) => {
  const { firstName, lastName, email, phoneNumber } = req.user;
  res.status(200).send({ firstName, lastName, email, phoneNumber });
};

export const patchUserProfile: RequestHandler = async (req, res, next) => {
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
};

export const getUserVisits: RequestHandler = async (req, res, next) => {
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
};
