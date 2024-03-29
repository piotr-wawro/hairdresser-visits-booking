import { LessThan, MoreThan } from "typeorm";
import { User } from "../entity/User.js";
import { Visit } from "../entity/Visit.js";
import { isEmailValid } from "../lib/validateEmail.js";
import { ApiError } from "../utils/ApiError.js";

export const findUserOrCreate = async (email: string) => {
  if (!isEmailValid(email)) throw ApiError.badRequset("Invalid email.");
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

export const findUserVisits = (user: User, start?: string, end?: string) => {
  const userId = user.id;

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
      ...(end && { start: LessThan(new Date(end)) }),
      ...(start && { end: MoreThan(new Date(start)) }),
    },
  });
};
