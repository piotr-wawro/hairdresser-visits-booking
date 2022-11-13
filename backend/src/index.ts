import express from "express";
import route from "./route/index.js";
import errorHandlers from "./middleware/errorHandlers/index.js";

const app = express();
const port = 3001;

app.use("/", route);

app.use(errorHandlers);

app.listen(port, () => {
  console.log(
    `hairdresser-visits-booking backend listening at http://localhost:${port}`
  );
});
