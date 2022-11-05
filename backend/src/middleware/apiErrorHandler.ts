import { ErrorRequestHandler } from "express";
import { QueryFailedError } from "typeorm";
import { ApiError } from "../lib/ApiError.js";

export const apiErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.status).send({ error: err.message });
  } else if (err instanceof QueryFailedError) {
    if (err.driverError.code === "40001") {
      res.status(409).send({
        error:
          "Could not serialize access due to read/write dependencies among transactions.",
      });
    }
  } else {
    res.status(500).send({ error: "Something went wrong." });
    console.log(err);
  }
};
