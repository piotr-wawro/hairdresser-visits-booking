import "reflect-metadata";
import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST || "localhost",
  port: 5432,
  username: "dev",
  password: "dev",
  database: "dev",
  synchronize: true,
  logging: true,
  entities: ["./src/entity/**/*.ts"],
  subscribers: [],
  migrations: [],
});

dataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });
