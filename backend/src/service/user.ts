import { LessThan, MoreThan } from "typeorm";
import { User } from "../entity/User.js";
import { Visit } from "../entity/Visit.js";

export const findUserOrCreate = async (email: string) => {
  let user = await User.findOneBy({ email });

  if (!user) {
    user = new User();
    user.email = email;
    await user.save();
  }

  return user;
};

export const updateUser = (
  user: User,
  firstName: string,
  lastName: string,
  phoneNumber: string
) => {
  user.firstName = firstName ?? user.firstName;
  user.lastName = lastName ?? user.lastName;
  user.phoneNumber = phoneNumber ?? user.phoneNumber;

  return user.save();
};

export const findUserVisits = (user: User, start: string, end: string) => {
  const userId = user.id;
  const startDate = new Date(start);
  const endDate = new Date(end);

  return Visit.find({
    select: {
      id: true,
      start: true,
      end: true,
      servicedBy: {
        firstName: true,
        lastName: true,
      },
    },
    relations: {
      servicedBy: true,
    },
    where: {
      bookedById: userId,
      ...(end && { start: LessThan(endDate) }),
      ...(start && { end: MoreThan(startDate) }),
    },
  });
};
