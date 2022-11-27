import { RequestHandler } from "express";
import {
  createSchedule,
  findAllSchedules,
  findSchedule,
  removeSchedule,
  updateSchedule,
} from "../service/schedule.js";

export const getAllSchedules: RequestHandler = async (req, res, next) => {
  const { start, end }: { start?: string; end?: string } = req.query;

  try {
    const schedule = await findAllSchedules(start, end);
    res.status(200).send(schedule);
  } catch (error) {
    next(error);
  }
};

export const postSchedule: RequestHandler = async (req, res, next) => {
  const { start, end, userId } = req.body;

  try {
    await createSchedule(userId, start, end);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

export const getSchedule: RequestHandler = async (req, res, next) => {
  const { id }: { id?: string } = req.query;

  try {
    const schedule = await findSchedule(id);
    res.status(200).send(schedule);
  } catch (error) {
    next(error);
  }
};

export const patchSchedule: RequestHandler = async (req, res, next) => {
  const { id, start, end, userId } = req.body;

  try {
    await updateSchedule(id, start, end, userId);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

export const deleteSchedule: RequestHandler = async (req, res, next) => {
  const { id } = req.body;

  try {
    await removeSchedule(id);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};
