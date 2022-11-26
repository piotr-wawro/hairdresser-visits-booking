import express from "express";
import route from "./route/index.js";
import errorHandlers from "./middleware/errorHandlers/index.js";

const app = express();

app.use("/", route);
app.use(errorHandlers);

export default app;
