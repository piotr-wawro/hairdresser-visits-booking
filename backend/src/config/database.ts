import "reflect-metadata";
import { DataSource } from "typeorm";
import entity from "../entity/index.js";
import production from "../migration/production/index.js";
import testing from "../migration/testing/index.js";
import "./dotenv.js";

export const dataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST || "",
  port: parseInt(process.env.DATABASE_PORT || ""),
  username: process.env.DATABASE_USERNAME || "",
  password: process.env.DATABASE_PASSWORD || "",
  database: process.env.DATABASE_NAME || "",
  dropSchema: process.env.ENVIRONMENT == "dev" ? true : false,
  synchronize: process.env.ENVIRONMENT == "dev" ? true : false,
  logging: process.env.ENVIRONMENT == "dev" ? true : false,
  logger: "file",
  entities: entity,
  migrations: process.env.ENVIRONMENT == "prod" ? production : testing,
});

export const simpleSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST || "",
  port: parseInt(process.env.DATABASE_PORT || ""),
  username: process.env.DATABASE_USERNAME || "",
  password: process.env.DATABASE_PASSWORD || "",
});
