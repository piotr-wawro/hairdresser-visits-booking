import express from "express";
import common from "./route/common.js";

import "./config/database.js";
import "./config/passport.js";

const app = express();
const port = 3001;

app.use("/", common);

app.listen(port, () => {
  console.log(
    `hairdresser-visits-booking backend listening at http://localhost:${port}`
  );
});
