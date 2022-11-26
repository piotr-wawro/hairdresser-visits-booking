import { RequestHandler } from "express";
import { findUserVisits, updateUser } from "../service/user.js";

export const getUserProfile: RequestHandler = async (req, res) => {
  const { id, firstName, lastName, email, phoneNumber } = req.user;
  res.status(200).send({ id, firstName, lastName, email, phoneNumber });
};

export const patchUserProfile: RequestHandler = async (req, res, next) => {
  const { firstName, lastName, phoneNumber } = req.body;
  const user = req.user;

  try {
    await updateUser(user, firstName, lastName, phoneNumber);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

export const getUserVisits: RequestHandler = async (req, res, next) => {
  const { start, end } = req.body;
  const user = req.user;

  try {
    const visits = await findUserVisits(user, start, end);
    res.status(200).send(visits);
  } catch (error) {
    next(error);
  }
};
