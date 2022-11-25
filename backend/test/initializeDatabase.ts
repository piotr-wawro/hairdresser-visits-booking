import { simpleSource } from "../src/config/database.js";
import { logger } from "../src/utils/logger.js";

export const initializeDatabase = async (databaseName: string) => {
  try {
    await simpleSource.initialize();

    const databases: [{ datname: string }] = await simpleSource.query(
      "SELECT datname FROM pg_database"
    );

    if (!databases.some((e) => e.datname === databaseName)) {
      await simpleSource.query(`CREATE DATABASE ${databaseName}`);
    }

    await simpleSource.destroy();
  } catch (error) {
    logger(error as Error);
  }
};
