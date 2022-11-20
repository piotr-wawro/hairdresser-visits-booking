import { dataSource } from "../src/config/database";
import { logger } from "../src/utils/logger";

export const initializeDatabase = async (databaseName: string) => {
  await createDatabase(databaseName);
  dataSource.setOptions({
    database: databaseName,
  });
};

const createDatabase = async (databaseName: string) => {
  try {
    await dataSource.initialize();

    const databases: [{ datname: string }] = await dataSource.query(
      "SELECT datname FROM pg_database"
    );
    if (!databases.some((e) => e.datname === databaseName)) {
      await dataSource.query(`CREATE DATABASE ${databaseName}`);
    }

    await dataSource.destroy();
  } catch (error) {
    logger(error as Error);
  }
};
