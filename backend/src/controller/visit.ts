import { RequestHandler } from "express";
import {
  createVisit,
  findAllVisits,
  findVisit,
  removeVisit,
  updateVisit,
} from "../service/visit.js";

export const getAllVisits: RequestHandler = async (req, res, next) => {
  const { start, end }: { start?: string; end?: string } = req.query;

  try {
    const visits = await findAllVisits(start, end);
    res.status(200).send(visits);
  } catch (error) {
    next(error);
  }
};

export const postVisit: RequestHandler = async (req, res, next) => {
  const { start, type, servicedBy } = req.body;
  const user = req.user;

  try {
    await createVisit(user, start, type, servicedBy);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

export const getVisit: RequestHandler = async (req, res, next) => {
  const { id }: { id?: string } = req.query;

  try {
    const visits = await findVisit(id);
    res.status(200).send(visits);
  } catch (error) {
    next(error);
  }
};

export const patchVisit: RequestHandler = async (req, res, next) => {
  const { id, start, type, servicedBy } = req.body;
  const user = req.user;

  try {
    await updateVisit(user, id, start, type, servicedBy);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

export const delteVisit: RequestHandler = async (req, res, next) => {
  const { id } = req.body;
  const user = req.user;

  try {
    await removeVisit(user, id);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};
