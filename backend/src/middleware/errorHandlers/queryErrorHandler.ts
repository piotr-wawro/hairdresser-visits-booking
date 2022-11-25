import { ErrorRequestHandler } from "express";
import { QueryFailedError } from "typeorm";

export const queryErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof QueryFailedError) {
    if (err.driverError.code === "40001") {
      res.status(409).send({
        error:
          "Could not serialize access due to read/write dependencies among transactions.",
      });
    }
    if (err.driverError.code === "23503") {
      res.status(409).send({
        error: "Update or delete on table violates foreign key constraint.",
      });
    }
  } else {
    next(err);
  }
};
