import "../src/config/dotenv.js";
import request from "supertest";
import app from "../src/app.js";
import { dataSource } from "../src/config/database.js";
import { Schedule } from "../src/entity/Schedule.js";
import { initializeDatabase } from "./initializeDatabase.js";

const mngToken = process.env.TOKEN_MNG || "";

beforeAll(async () => {
  await initializeDatabase("schedule_test");
  dataSource.setOptions({
    database: "schedule_test",
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
      test("return all schedules", async () => {
        const response = await request(app).get("/schedule/all");

        expect(response.status).toEqual(200);
        expect(response.body).toEqual([
          {
            id: "b5926670-6e3b-4c84-8a14-d907ca072d07",
            start: "2022-12-01T08:00:00.000Z",
            end: "2022-12-01T11:00:00.000Z",
            forId: "634dc798-9608-405e-8e95-94095d91fb73",
          },
          {
            id: "6f11ef42-515f-4a26-8a52-730e0f64d529",
            start: "2022-12-01T13:00:00.000Z",
            end: "2022-12-01T16:00:00.000Z",
            forId: "634dc798-9608-405e-8e95-94095d91fb73",
          },
          {
            id: "e6cfbc8e-bd07-4a8d-a360-429b67e61d1f",
            start: "2022-12-01T10:00:00.000Z",
            end: "2022-12-01T18:00:00.000Z",
            forId: "244e757c-9d58-4be3-bc21-ac46953be644",
          },
          {
            id: "b52d6d44-214c-448c-80f4-5966536bd5a9",
            start: "2022-12-02T08:00:00.000Z",
            end: "2022-12-02T16:00:00.000Z",
            forId: "244e757c-9d58-4be3-bc21-ac46953be644",
          },
        ]);
      });
    });
  });

  describe("post", () => {
    test("add new schedule", async () => {
      const response = await request(app)
        .post("/schedule")
        .set("Authorization", mngToken)
        .send({
          start: "2022-12-02T08:00:00.000Z",
          end: "2022-12-02T16:00:00.000Z",
          userId: "634dc798-9608-405e-8e95-94095d91fb73",
        });

      const schedule = await Schedule.findOneByOrFail({
        start: new Date("2022-12-02T08:00:00.000Z"),
        end: new Date("2022-12-02T16:00:00.000Z"),
        forId: "634dc798-9608-405e-8e95-94095d91fb73",
      });

      expect(response.status).toEqual(200);
      expect(schedule).toEqual({
        id: expect.any(String),
        start: new Date("2022-12-02T08:00:00.000Z"),
        end: new Date("2022-12-02T16:00:00.000Z"),
        forId: "634dc798-9608-405e-8e95-94095d91fb73",
        for: undefined,
      });
    });
  });

  describe("get", () => {
    test("return single schedule", async () => {
      const response = await request(app)
        .get("/schedule")
        .set("Authorization", mngToken)
        .query({ id: "b5926670-6e3b-4c84-8a14-d907ca072d07" });

      expect(response.status).toEqual(200);
      expect(response.body).toEqual({
        id: "b5926670-6e3b-4c84-8a14-d907ca072d07",
        start: "2022-12-01T08:00:00.000Z",
        end: "2022-12-01T11:00:00.000Z",
        forId: "634dc798-9608-405e-8e95-94095d91fb73",
      });
    });
  });

  describe("patch", () => {
    test("update schedule data", async () => {
      const response = await request(app)
        .patch("/schedule")
        .set("Authorization", mngToken)
        .send({
          id: "b5926670-6e3b-4c84-8a14-d907ca072d07",
          start: "2022-12-01T08:00:00.000Z",
          end: "2022-12-01T12:00:00.000Z",
          userId: "634dc798-9608-405e-8e95-94095d91fb73",
        });

      const schedule = await Schedule.findOneByOrFail({
        id: "b5926670-6e3b-4c84-8a14-d907ca072d07",
      });

      expect(response.status).toEqual(200);
      expect(schedule).toEqual({
        id: "b5926670-6e3b-4c84-8a14-d907ca072d07",
        start: new Date("2022-12-01T08:00:00.000Z"),
        end: new Date("2022-12-01T12:00:00.000Z"),
        forId: "634dc798-9608-405e-8e95-94095d91fb73",
        for: undefined,
      });
    });
  });

  describe("delete", () => {
    test("remove schedule", async () => {
      const response = await request(app)
        .delete("/schedule")
        .set("Authorization", mngToken)
        .send({ id: "b5926670-6e3b-4c84-8a14-d907ca072d07" });

      const schedule = await Schedule.findOneBy({
        id: "b5926670-6e3b-4c84-8a14-d907ca072d07",
      });

      expect(response.status).toEqual(200);
      expect(schedule).toEqual(null);
    });
  });
});
