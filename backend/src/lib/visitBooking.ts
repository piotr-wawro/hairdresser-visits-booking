import { LessThan, MoreThan } from "typeorm";
import { dataSource } from "../config/database.js";
import { Visit } from "../entity/Visit.js";

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
      if (i + 1 === repeat) {
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
      return false;
    } else {
      await manager.save(newVisit);
      return true;
    }
  });
};

type VisitPatch = {
  start: Date;
  end: Date;
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
      return false;
    } else {
      const patchedVisit = manager.merge(Visit, oldVisit, patch);
      await manager.save(patchedVisit);
      return true;
    }
  });
};
