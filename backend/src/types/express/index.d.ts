import { User } from "../../entity/User.js";

declare global {
  namespace Express {
    export interface Request {
      user: User;
    }
  }
}

export {};
