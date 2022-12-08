import "../src/config/dotenv.js";
import request from "supertest";
import app from "../src/app.js";
import { dataSource } from "../src/config/database.js";
import { Visit } from "../src/entity/Visit.js";
import { initializeDatabase } from "./initializeDatabase.js";

const usr1Token = process.env.TOKEN_USR1 || "";

beforeAll(async () => {
  await initializeDatabase("visit_test");
  dataSource.setOptions({
    database: "visit_test",
  });
  await dataSource.initialize();
});

beforeEach(async () => {
  await dataSource.dropDatabase();
  await dataSource.synchronize();
  await dataSource.runMigrations();
});

afterAll(async () => {
  await dataSource.destroy();
});

describe("/schedule", () => {
  describe("/all", () => {
    describe("get", () => {
      test("return all visits", async () => {
        const response = await request(app).get("/visit/all");

        expect(response.status).toEqual(200);
        expect(response.body).toEqual([
          {
            id: "a88987c1-59ab-4e0e-a205-9de7c0458b0e",
            start: "2022-12-01T08:00:00.000Z",
            end: "2022-12-01T09:00:00.000Z",
            bookedById: "d32cff38-8813-48da-9df0-1fe3a83287e8",
            servicedById: "634dc798-9608-405e-8e95-94095d91fb73",
          },
          {
            id: "14ff7f01-2651-4e6f-bcf7-15b7e75b9ca9",
            start: "2022-12-01T13:00:00.000Z",
            end: "2022-12-01T14:00:00.000Z",
            bookedById: "2176b3f7-f58a-45d3-837a-ba93dca5e872",
            servicedById: "634dc798-9608-405e-8e95-94095d91fb73",
          },
          {
            id: "3edcf7d2-2a99-4756-8a6c-6ec4cc08ee03",
            start: "2022-12-01T15:00:00.000Z",
            end: "2022-12-01T16:00:00.000Z",
            bookedById: "d2aab8be-7de5-4ffc-9fbc-41817b1cb4d3",
            servicedById: "244e757c-9d58-4be3-bc21-ac46953be644",
          },
          {
            id: "2eaa34b6-379a-4820-ae41-3e9cf6dc812b",
            start: "2022-12-02T09:00:00.000Z",
            end: "2022-12-02T10:00:00.000Z",
            bookedById: "35df7121-a675-4969-8cc5-bdbdfb53810f",
            servicedById: "244e757c-9d58-4be3-bc21-ac46953be644",
          },
        ]);
      });
    });
  });

  describe("post", () => {
    test("add new visit", async () => {
      const response = await request(app)
        .post("/visit")
        .set("Authorization", usr1Token)
        .send({
          start: "2022-12-01T09:40:00.000Z",
          type: "haircut",
          servicedBy: "634dc798-9608-405e-8e95-94095d91fb73",
        });

      const visit = await Visit.findOneByOrFail({
        start: new Date("2022-12-01T09:40:00.000Z"),
        servicedById: "634dc798-9608-405e-8e95-94095d91fb73",
      });

      expect(response.status).toEqual(200);
      expect(visit).toEqual({
        id: expect.any(String),
        start: new Date("2022-12-01T09:40:00.000Z"),
        end: new Date("2022-12-01T10:40:00.000Z"),
        bookedById: "d32cff38-8813-48da-9df0-1fe3a83287e8",
        servicedById: "634dc798-9608-405e-8e95-94095d91fb73",
        bookedBy: undefined,
        servicedBy: undefined,
      });
    });
  });

  describe("get", () => {
    test("return single visit", async () => {
      const response = await request(app)
        .get("/visit")
        .set("Authorization", usr1Token)
        .query({ id: "a88987c1-59ab-4e0e-a205-9de7c0458b0e" });

      expect(response.status).toEqual(200);
      expect(response.body).toEqual({
        id: "a88987c1-59ab-4e0e-a205-9de7c0458b0e",
        start: "2022-12-01T08:00:00.000Z",
        end: "2022-12-01T09:00:00.000Z",
        bookedById: "d32cff38-8813-48da-9df0-1fe3a83287e8",
        servicedById: "634dc798-9608-405e-8e95-94095d91fb73",
      });
    });
  });

  describe("patch", () => {
    test("update schedule data", async () => {
      const response = await request(app)
        .patch("/visit")
        .set("Authorization", usr1Token)
        .send({
          id: "a88987c1-59ab-4e0e-a205-9de7c0458b0e",
          start: "2022-12-01T10:10:00.000Z",
          type: "haircut",
          servicedBy: "244e757c-9d58-4be3-bc21-ac46953be644",
        });

      const visit = await Visit.findOneByOrFail({
        id: "a88987c1-59ab-4e0e-a205-9de7c0458b0e",
      });

      expect(response.status).toEqual(200);
      expect(visit).toEqual({
        id: "a88987c1-59ab-4e0e-a205-9de7c0458b0e",
        start: new Date("2022-12-01T10:10:00.000Z"),
        end: new Date("2022-12-01T11:10:00.000Z"),
        bookedById: "d32cff38-8813-48da-9df0-1fe3a83287e8",
        servicedById: "244e757c-9d58-4be3-bc21-ac46953be644",
        bookedBy: undefined,
        servicedBy: undefined,
      });
    });
  });

  describe("delete", () => {
    test("remove schedule", async () => {
      const response = await request(app)
        .delete("/visit")
        .set("Authorization", usr1Token)
        .send({ id: "a88987c1-59ab-4e0e-a205-9de7c0458b0e" });

      const visit = await Visit.findOneBy({
        id: "a88987c1-59ab-4e0e-a205-9de7c0458b0e",
      });

      expect(response.status).toEqual(200);
      expect(visit).toEqual(null);
    });
  });
});
