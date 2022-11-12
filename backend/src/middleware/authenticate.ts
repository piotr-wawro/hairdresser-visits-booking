import { RequestHandler } from "express";
import { User } from "../entity/User.js";
import { verifyJwt } from "../lib/jwt.js";
import { ApiError } from "../utils/ApiError.js";

export const authenticate: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const payload = verifyJwt(token || "");
    const user = await User.findOneByOrFail({ id: payload.sub as string });
    req.user = user;

    next();
  } catch (error) {
    next(ApiError.unauthorized("Invalid token."));
  }
};
