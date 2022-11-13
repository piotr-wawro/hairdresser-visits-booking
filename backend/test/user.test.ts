process.env.DATABASE_NAME = "userTest";

import "../src/config/dotenv.js";
import request from "supertest";
import app from "../src/app.js";
import { dataSource } from "../src/config/database.js";
import { User } from "../src/entity/User.js";

const mngToken = process.env.TOKEN_MNG || "";
const usr1Token = process.env.TOKEN_USR1 || "";

beforeEach(async () => {
  await dataSource.initialize();
  await dataSource.runMigrations();
});

afterAll(async () => {
  await dataSource.destroy();
});

describe("/user", () => {
  describe("/profile", () => {
    describe("get", () => {
      test("return user data if authenticated", async () => {
        const response = await request(app)
          .get("/user/profile")
          .set("Authorization", mngToken);

        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
          id: "c9c70c2c-ca36-498c-91e4-d51b67f3c1dd",
          firstName: "Klara",
          lastName: "Kowalska",
          email: "mng@EKRABSCSBIJIUEDPXVVK.com",
          phoneNumber: "607867801",
        });
      });
    });

    describe("patch", () => {
      test("update user data", async () => {
        const response = await request(app)
          .patch("/user/profile")
          .set("Authorization", mngToken)
          .send({
            firstName: "Aralk",
            lastName: "Akslawok",
            phoneNumber: "108768706",
          });

        const user = await User.findOneByOrFail({
          email: "mng@EKRABSCSBIJIUEDPXVVK.com",
        });

        expect(response.status).toEqual(200);
        expect(user).toMatchObject({
          id: "c9c70c2c-ca36-498c-91e4-d51b67f3c1dd",
          firstName: "Aralk",
          lastName: "Akslawok",
          email: "mng@EKRABSCSBIJIUEDPXVVK.com",
          phoneNumber: "108768706",
        });
      });
    });
  });

  describe("/visit", () => {
    describe("get", () => {
      test("return user visits", async () => {
        const response = await request(app)
          .get("/user/visit")
          .set("Authorization", usr1Token);

        expect(response.status).toEqual(200);
        expect(response.body).toEqual([
          {
            id: "a88987c1-59ab-4e0e-a205-9de7c0458b0e",
            start: "2022-12-01T07:00:00.000Z",
            end: "2022-12-01T08:00:00.000Z",
            servicedBy: {
              firstName: "Jolanta",
              lastName: "Rutkowska",
            },
          },
        ]);
      });
    });
  });
});
