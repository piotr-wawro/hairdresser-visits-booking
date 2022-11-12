import { ErrorRequestHandler } from "express";
import { ApiError } from "../../utils/ApiError.js";

export const routeUnauthorized: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    if (err.status == 401) {
      next("route");
    }
  } else {
    next(err);
  }
};
