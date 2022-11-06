import { ErrorRequestHandler } from "express";
import { ApiError } from "../../lib/ApiError.js";

export const apiErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.status).send({ error: err.message });
  } else {
    next(err);
  }
};
