import "reflect-metadata";
import { DataSource } from "typeorm";
import "./dotenv.js";

export const dataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST || "localhost",
  port: parseInt(process.env.DATABASE_PORT || ""),
  username: process.env.DATABASE_USERNAME || "",
  password: process.env.DATABASE_PASSWORD || "",
  database: process.env.DATABASE_NAME || "",
  synchronize: process.env.ENVIRONMENT == "dev" ? true : false,
  logging: process.env.ENVIRONMENT == "dev" ? true : false,
  entities:
    process.env.ENVIRONMENT == "dev"
      ? ["./src/entity/**/*.ts"]
      : ["./dist/entity/**/*.js"],
  subscribers: [],
  migrations:
    process.env.ENVIRONMENT == "dev"
      ? ["./src/migration/testing/**/*.ts"]
      : ["./dist/migration/production/**/*.js"],
});

await dataSource.initialize();
console.log("Data Source has been initialized!");
dataSource.runMigrations();
