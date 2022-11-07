import { RequestHandler } from "express";
import { LessThan, MoreThan } from "typeorm";
import { Schedule } from "../entity/Schedule.js";
import { Roles, User } from "../entity/User.js";
import { ApiError } from "../lib/ApiError.js";
import { addSchedule } from "../lib/serializableRequest.js";
import { repeat } from "../lib/visitBooking.js";

export const getAllSchedules: RequestHandler = async (req, res, next) => {
  const { start, end } = req.body;

  try {
    const schedule = await Schedule.findBy({
      ...(end && { start: LessThan(new Date(end)) }),
      ...(start && { end: MoreThan(new Date(start)) }),
    });
    res.status(200).send(schedule);
  } catch (error) {
    next(error);
  }
};

export const postSchedule: RequestHandler = async (req, res, next) => {
  const { start, end, userId } = req.body;

  try {
    const user = await User.findOneByOrFail({ id: userId });

    if (user?.role != Roles.EMPLOYEE) {
      next(ApiError.badRequset("User is not an employee."));
    }

    const schedule = new Schedule();
    schedule.start = new Date(start);
    schedule.end = new Date(end);
    schedule.for = user;

    const success = await repeat(() => addSchedule(schedule), 3);

    if (success) {
      res.status(200).send();
    } else {
      next(ApiError.conflict("Schedule is overlapping."));
    }
  } catch (error) {
    next(error);
  }
};

export const getSchedule: RequestHandler = async (req, res, next) => {
  const { id } = req.body;

  try {
    const schedule = await Schedule.findOneByOrFail({ id });
    res.status(200).send(schedule);
  } catch (error) {
    next(error);
  }
};

export const patchSchedule: RequestHandler = async (req, res, next) => {
  const { id, start, end, userId } = req.body;

  try {
    const user = await User.findOneBy({ id: userId });

    if (user?.role != Roles.EMPLOYEE) {
      next(ApiError.badRequset("User is not an employee"));
    }

    const schedule = await Schedule.findOneByOrFail({ id });
    schedule.start = start ?? schedule.start;
    schedule.end = end ?? schedule.end;
    schedule.for = user ?? schedule.for;

    await schedule.save();

    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

export const deleteSchedule: RequestHandler = async (req, res, next) => {
  const { id } = req.body;

  try {
    const schedule = await Schedule.findOneByOrFail({ id });
    await schedule.remove();
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};
