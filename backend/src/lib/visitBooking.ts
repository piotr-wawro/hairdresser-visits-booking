import { LessThan, MoreThan } from "typeorm";
import { dataSource } from "../config/database.js";
import { Schedule } from "../entity/Schedule.js";
import { Visit } from "../entity/Visit.js";
import { ApiError } from "./ApiError.js";

export const serviceToTime = (type: string) => {
  if (type === "haircut") {
    return 60 * 60 * 1000;
  } else if (type === "hair-dyeing") {
    return 2 * 60 * 60 * 1000;
  } else {
    return 30 * 60 * 1000;
  }
};

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

export const addVisit = (newVisit: Visit) => {
  return dataSource.manager.transaction("SERIALIZABLE", async (manager) => {
    const visits = await manager.count(Visit, {
      where: {
        start: LessThan(newVisit.end),
        end: MoreThan(newVisit.start),
      },
    });

    if (visits) {
      throw ApiError.badRequset("Booked by someone else.");
    }

    const schedules = await manager.count(Schedule, {
      where: {
        start: LessThan(newVisit.start),
        end: MoreThan(newVisit.end),
        forId: newVisit.servicedById,
      },
    });

    if (!schedules) {
      throw ApiError.badRequset("No employee to service.");
    }

    await manager.save(newVisit);
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
    await manager.save(patchedVisit);
  });
};
