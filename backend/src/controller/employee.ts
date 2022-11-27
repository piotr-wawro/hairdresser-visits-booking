import { RequestHandler } from "express";
import {
  createEmployee,
  findAllEmployees,
  findEmployee,
  getAllEmployeesAsManager,
  removeEmployee,
  updateEmployee,
} from "../service/employee.js";

export const getAllEmpoyeesAsManager: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const employes = await getAllEmployeesAsManager();
    res.status(200).send(employes);
  } catch (error) {
    next(error);
  }
};

export const getAllEmployees: RequestHandler = async (req, res, next) => {
  try {
    const employes = await findAllEmployees();
    res.status(200).send(employes);
  } catch (error) {
    next(error);
  }
};

export const postEmpoyee: RequestHandler = async (req, res, next) => {
  const { firstName, lastName, email, phoneNumber } = req.body;

  try {
    await createEmployee(firstName, lastName, email, phoneNumber);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

export const getEmpoyee: RequestHandler = async (req, res, next) => {
  const { id }: { id?: string } = req.query;

  try {
    const employee = await findEmployee(id);
    res.status(200).send(employee);
  } catch (error) {
    next(error);
  }
};

export const patchEmpoyee: RequestHandler = async (req, res, next) => {
  const { id, firstName, lastName, email, phoneNumber } = req.body;

  try {
    await updateEmployee(id, firstName, lastName, email, phoneNumber);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

export const deleteEmpoyee: RequestHandler = async (req, res, next) => {
  const { id } = req.body;

  try {
    await removeEmployee(id);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};
