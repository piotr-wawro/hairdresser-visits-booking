import app from "./app.js";
import { dataSource } from "./config/database.js";
import { transporter } from "./config/email.js";
import "./config/dotenv.js";

const port = process.env.BACKEND_PORT;

await dataSource.initialize();
await dataSource.runMigrations();
await transporter.verify();

app.listen(port, () => {
  console.log(
    `hairdresser-visits-booking backend listening at http://localhost:${port}`
  );
});
