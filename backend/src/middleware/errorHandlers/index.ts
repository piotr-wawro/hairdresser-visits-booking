import { apiErrorHandler } from "./apiErrorHandler.js";
import { queryErrorHandler } from "./queryErrorHandler.js";
import { generalErrorHandler } from "./generalErrorHandler.js";

export default [apiErrorHandler, queryErrorHandler, generalErrorHandler];
