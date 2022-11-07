import { LessThan, MoreThan } from "typeorm";
import { Roles, User } from "../entity/User.js";
import { Visit } from "../entity/Visit.js";
import { ApiError } from "../lib/ApiError.js";
import { addVisit, patchVisit, repeat } from "../lib/serializableRequest.js";

export const serviceToTime = (type: string) => {
  if (type === "haircut") {
    return 60 * 60 * 1000;
  } else if (type === "hair-dyeing") {
    return 2 * 60 * 60 * 1000;
  } else {
    return 30 * 60 * 1000;
  }
};

export const findAllVisits = (start: string, end: string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  return Visit.findBy({
    ...(end && { start: LessThan(new Date(endDate)) }),
    ...(start && { end: MoreThan(new Date(startDate)) }),
  });
};

export const createVisit = async (
  user: User,
  start: string,
  type: string,
  servicedBy: string
) => {
  const employee = await User.findOneByOrFail({ id: servicedBy });
  if (employee.role !== Roles.EMPLOYEE) {
    throw ApiError.badRequset("Select employee.");
  }

  const newVisit = new Visit();
  newVisit.bookedBy = user;
  newVisit.start = new Date(start);
  newVisit.end = new Date(newVisit.start.getTime() + serviceToTime(type));
  newVisit.servicedById = servicedBy;

  return repeat(() => addVisit(newVisit), 3);
};

export const findVisit = (id: string) => {
  return Visit.findOneBy({ id });
};

export const updateVisit = async (
  user: User,
  id: string,
  start: string,
  type: string,
  servicedBy: string
) => {
  const patch = {
    start: new Date(start),
    end: new Date(new Date(start).getTime() + serviceToTime(type)),
    servicedById: servicedBy,
  };

  const oldVisit = await Visit.findOneByOrFail({
    id: id,
    bookedById: user.id,
  });

  return repeat(() => patchVisit(oldVisit, patch), 3);
};

export const removeVisit = async (user: User, id: string) => {
  const oldVisit = await Visit.findOneByOrFail({ bookedById: user.id, id });
  return oldVisit.remove();
};
