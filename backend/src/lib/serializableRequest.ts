import { LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual } from "typeorm";
import { dataSource } from "../config/database.js";
import { Schedule } from "../entity/Schedule.js";
import { User } from "../entity/User.js";
import { Visit } from "../entity/Visit.js";
import { ApiError } from "../utils/ApiError.js";

export const repeat = async <T>(fun: () => Promise<T>, repeat: number) => {
  for (let i = 0; i < repeat; i++) {
    try {
      return await fun();
    } catch (error) {
      if (i + 1 === repeat || error instanceof ApiError) {
        throw error;
      }
    }
  }
};

export const addUser = (newUser: User) => {
  return dataSource.manager.transaction("SERIALIZABLE", async (manager) => {
    const user = await manager.findOneBy(User, { email: newUser.email });

    if (user) {
      throw ApiError.conflict(`User with ${newUser.email} already exists.`);
    } else {
      return manager.save(newUser);
    }
  });
};

export const addSchedule = (newSchedule: Schedule) => {
  return dataSource.manager.transaction("SERIALIZABLE", async (manager) => {
    const schedules = await manager.count(Schedule, {
      where: {
        start: LessThan(newSchedule.end),
        end: MoreThan(newSchedule.start),
        forId: newSchedule.for.id,
      },
    });

    if (schedules) {
      throw ApiError.conflict("Schedule is overlapping.");
    } else {
      return manager.save(newSchedule);
    }
  });
};

export const addVisit = (newVisit: Visit) => {
  return dataSource.manager.transaction("SERIALIZABLE", async (manager) => {
    const visits = await manager.count(Visit, {
      where: {
        start: LessThan(newVisit.end),
        end: MoreThan(newVisit.start),
        servicedById: newVisit.servicedById,
      },
    });

    if (visits) {
      throw ApiError.badRequset("Booked by someone else.");
    }

    const schedules = await manager.count(Schedule, {
      where: {
        start: LessThanOrEqual(newVisit.start),
        end: MoreThanOrEqual(newVisit.end),
        forId: newVisit.servicedById,
      },
    });

    if (!schedules) {
      throw ApiError.badRequset("No employee to service.");
    }

    return manager.save(newVisit);
  });
};

type VisitPatch = {
  start: Date;
  end: Date;
  servicedById: string;
};

export const patchVisit = (oldVisit: Visit, patch: VisitPatch) => {
  return dataSource.manager.transaction("SERIALIZABLE", async (manager) => {
    const visits = await manager.findBy(Visit, {
      start: LessThan(patch.end),
      end: MoreThan(patch.start),
    });

    if (
      visits.length > 1 ||
      (visits.length === 1 && visits[0].id !== oldVisit.id)
    ) {
      throw ApiError.badRequset("Booked by someone else.");
    }

    const schedules = await manager.count(Schedule, {
      where: {
        start: LessThan(patch.start),
        end: MoreThan(patch.end),
        forId: patch.servicedById ?? oldVisit.servicedById,
      },
    });

    if (!schedules) {
      throw ApiError.badRequset("No employee to service.");
    }

    const patchedVisit = manager.merge(Visit, oldVisit, patch);
    return manager.save(patchedVisit);
  });
};
