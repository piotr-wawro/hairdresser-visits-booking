import { LessThan, MoreThan } from "typeorm";
import { Roles, User } from "../entity/User.js";
import { Visit } from "../entity/Visit.js";
import { ApiError } from "../utils/ApiError.js";
import { addVisit, patchVisit, repeat } from "../lib/serializableRequest.js";

export const findAllVisits = (start?: string, end?: string) => {
  return Visit.findBy({
    ...(end && { start: LessThan(new Date(end)) }),
    ...(start && { end: MoreThan(new Date(start)) }),
  });
};

export const createVisit = async (
  user: User,
  start: string,
  servicedBy: string
) => {
  const employee = await User.findOneByOrFail({ id: servicedBy });
  if (employee.role !== Roles.EMPLOYEE) {
    throw ApiError.badRequset("Select employee.");
  }

  const newVisit = new Visit();
  newVisit.bookedBy = user;
  newVisit.start = new Date(start);
  newVisit.end = new Date(newVisit.start.getTime() + 60 * 60 * 1000);
  newVisit.servicedById = servicedBy;

  return repeat(() => addVisit(newVisit), 3);
};

export const findVisit = (id?: string) => {
  if (id) {
    return Visit.findOneBy({ id });
  } else {
    throw ApiError.badRequset("No id provided.");
  }
};

export const updateVisit = async (
  user: User,
  id: string,
  start: string,
  servicedBy: string
) => {
  const patch = {
    start: new Date(start),
    end: new Date(new Date(start).getTime() + 60 * 60 * 1000),
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
