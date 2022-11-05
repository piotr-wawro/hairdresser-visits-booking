import { LessThan, MoreThan } from "typeorm";
import { dataSource } from "../config/database.js";
import { Schedule } from "../entity/Schedule.js";
import { User } from "../entity/User.js";

export const addUser = (newUser: User) => {
  return dataSource.manager.transaction("SERIALIZABLE", async (manager) => {
    const user = await manager.findOneBy(User, { email: newUser.email });

    if (user) {
      return false;
    } else {
      await manager.save(newUser);
      return true;
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
      return false;
    } else {
      await manager.save(newSchedule);
      return true;
    }
  });
};
