import "reflect-metadata";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "database-dev",
  port: 5432,
  username: "dev",
  password: "dev",
  database: "dev",
  synchronize: true,
  logging: true,
  entities: [],
  subscribers: [],
  migrations: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });
