import express from "express";
import path from "path";
const app = express();
const port = 3000;

app.use(express.static(path.join(process.cwd(), "dist")));

app.listen(port, () => {
  console.log(
    `hairdresser-visits-booking frontend listening at http://localhost:${port}`
  );
});
