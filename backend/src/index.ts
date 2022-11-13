import app from "./app.js";

const port = process.env.BACKEND_PORT;

app.listen(port, () => {
  console.log(
    `hairdresser-visits-booking backend listening at http://localhost:${port}`
  );
});
