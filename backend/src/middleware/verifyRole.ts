import { RequestHandler } from "express";
import { Roles } from "../entity/User.js";
import { ApiError } from "../lib/ApiError.js";

export const verifyRole = (...allowedRoles: Roles[]) => {
  return <RequestHandler>((req, res, next) => {
    if (allowedRoles.includes(req.user.role)) {
      next();
    } else {
      next(ApiError.unauthorized("Unauthorized."));
    }
  });
};
