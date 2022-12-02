import { LessThan, MoreThan } from "typeorm";
import { Schedule } from "../entity/Schedule.js";
import { Roles, User } from "../entity/User.js";
import { ApiError } from "../utils/ApiError.js";
import { addSchedule, repeat } from "../lib/serializableRequest.js";

export const findAllSchedules = (start?: string, end?: string) => {
  return Schedule.findBy({
    ...(end && { start: LessThan(new Date(end)) }),
    ...(start && { end: MoreThan(new Date(start)) }),
  });
};

export const createSchedule = async (
  employeeId: string,
  start: string,
  end: string
) => {
  const user = await User.findOneByOrFail({ id: employeeId });

  if (user?.role != Roles.EMPLOYEE) {
    throw ApiError.badRequset("User is not an employee.");
  }

  const schedule = new Schedule();
  schedule.start = new Date(start);
  schedule.end = new Date(end);
  schedule.for = user;

  return repeat(() => addSchedule(schedule), 3);
};

export const findSchedule = (id?: string) => {
  if (id) {
    return Schedule.findOneByOrFail({ id });
  } else {
    throw ApiError.badRequset("No id provided.");
  }
};

export const updateSchedule = async (
  id: string,
  start: string,
  end: string,
  userId: string
) => {
  const user = await User.findOneBy({ id: userId });

  if (user?.role != Roles.EMPLOYEE) {
    throw ApiError.badRequset("User is not an employee");
  }

  const schedule = await Schedule.findOneByOrFail({ id });
  schedule.start = start ? new Date(start) : schedule.start;
  schedule.end = end ? new Date(end) : schedule.end;
  schedule.for = user ?? schedule.for;

  await schedule.save();
};

export const removeSchedule = async (id: string) => {
  const schedule = await Schedule.findOneByOrFail({ id });
  return schedule.remove();
};
