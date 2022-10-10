import express from "express";
import common from "./route/common.js";
import { apiErrorHandler } from "./middleware/apiErrorHandler.js";

import "./config/dotenv.js";
import "./config/database.js";
import "./config/email.js";

const app = express();
const port = 3001;

app.use("/", common);

app.use(apiErrorHandler);

app.listen(port, () => {
  console.log(
    `hairdresser-visits-booking backend listening at http://localhost:${port}`
  );
});
