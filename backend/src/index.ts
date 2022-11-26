import app from "./app.js";
import { dataSource } from "./config/database.js";
import { logger } from "./utils/logger.js";
import "./config/dotenv.js";

const port = process.env.BACKEND_PORT;

try {
  await dataSource.initialize();
  await dataSource.runMigrations();
} catch (error) {
  logger(error as Error);
}

app.listen(port, () => {
  console.log(
    `hairdresser-visits-booking backend listening at http://localhost:${port}`
  );
});
