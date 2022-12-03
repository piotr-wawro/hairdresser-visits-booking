import { Roles, User } from "../entity/User.js";
import { ApiError } from "../utils/ApiError.js";
import { addUser, repeat } from "../lib/serializableRequest.js";
import { isEmailValid } from "../lib/validateEmail.js";

export const getAllEmployeesAsManager = () => {
  return User.find({
    where: [{ role: Roles.EMPLOYEE }, { role: Roles.MANAGER }],
  });
};

export const findAllEmployees = () => {
  return User.find({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      role: true,
    },
    where: [{ role: Roles.EMPLOYEE }, { role: Roles.MANAGER }],
  });
};

export const createEmployee = (
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string
) => {
  if (!isEmailValid(email)) throw ApiError.badRequset("Invalid email.");

  const employee = new User();
  employee.role = Roles.EMPLOYEE;
  employee.firstName = firstName;
  employee.lastName = lastName;
  employee.email = email;
  employee.phoneNumber = phoneNumber;

  return repeat(() => addUser(employee), 3);
};

export const findEmployee = (id?: string) => {
  if (id) {
    return User.findOne({
      where: [
        { id, role: Roles.EMPLOYEE },
        { id, role: Roles.MANAGER },
      ],
    });
  } else {
    throw ApiError.badRequset("No id provided.");
  }
};

export const updateEmployee = async (
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string
) => {
  const employee = await User.findOneOrFail({
    where: [
      { id, role: Roles.EMPLOYEE },
      { id, role: Roles.MANAGER },
    ],
  });
  employee.firstName = firstName ?? employee?.firstName;
  employee.lastName = lastName ?? employee?.lastName;
  employee.email = email ?? employee?.email;
  employee.phoneNumber = phoneNumber ?? employee?.phoneNumber;
  return employee.save();
};

export const removeEmployee = async (id: string) => {
  const employee = await User.findOneOrFail({
    where: [
      { id, role: Roles.EMPLOYEE },
      { id, role: Roles.MANAGER },
    ],
  });
  return employee.remove();
};
