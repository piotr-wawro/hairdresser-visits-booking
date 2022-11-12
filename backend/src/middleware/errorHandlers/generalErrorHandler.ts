import { ErrorRequestHandler } from "express";
import { logger } from "../../utils/logger.js";

export const generalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  logger(err);
  return res.status(500).send({ error: "Something went wrong." });
};
