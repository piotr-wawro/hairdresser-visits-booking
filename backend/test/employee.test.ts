import "../src/config/dotenv.js";
import request from "supertest";
import app from "../src/app.js";
import { dataSource } from "../src/config/database.js";
import { User } from "../src/entity/User.js";
import { initializeDatabase } from "./initializeDatabase.js";

const mngToken = process.env.TOKEN_MNG || "";

beforeAll(async () => {
  await initializeDatabase("employee_test");
  dataSource.setOptions({
    database: "employee_test",
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

describe("/employee", () => {
  describe("/all", () => {
    describe("get", () => {
      test("return all employees full data if manager", async () => {
        const response = await request(app)
          .get("/employee/all")
          .set("Authorization", mngToken);

        expect(response.status).toEqual(200);
        expect(response.body).toEqual([
          {
            id: "c9c70c2c-ca36-498c-91e4-d51b67f3c1dd",
            firstName: "Klara",
            lastName: "Kowalska",
            email: "mng@EKRABSCSBIJIUEDPXVVK.com",
            phoneNumber: "607867801",
            role: "manager",
          },
          {
            id: "634dc798-9608-405e-8e95-94095d91fb73",
            firstName: "Jolanta",
            lastName: "Rutkowska",
            email: "emp1@EKRABSCSBIJIUEDPXVVK.com",
            phoneNumber: "676043415",
            role: "employee",
          },
          {
            id: "244e757c-9d58-4be3-bc21-ac46953be644",
            firstName: "Krystyn",
            lastName: "Jaworski",
            email: "emp2@EKRABSCSBIJIUEDPXVVK.com",
            phoneNumber: "727388602",
            role: "employee",
          },
        ]);
      });
    });

    describe("get", () => {
      test("return all employees simple data if anonym", async () => {
        const response = await request(app).get("/employee/all");

        expect(response.status).toEqual(200);
        expect(response.body).toEqual([
          {
            id: "c9c70c2c-ca36-498c-91e4-d51b67f3c1dd",
            firstName: "Klara",
            lastName: "Kowalska",
            role: "manager",
          },
          {
            id: "634dc798-9608-405e-8e95-94095d91fb73",
            firstName: "Jolanta",
            lastName: "Rutkowska",
            role: "employee",
          },
          {
            id: "244e757c-9d58-4be3-bc21-ac46953be644",
            firstName: "Krystyn",
            lastName: "Jaworski",
            role: "employee",
          },
        ]);
      });
    });
  });

  describe("post", () => {
    test("add new employee", async () => {
      const response = await request(app)
        .post("/employee")
        .set("Authorization", mngToken)
        .send({
          firstName: "Wioletta",
          lastName: "Kwiatkowska",
          email: "emp3@EKRABSCSBIJIUEDPXVVK.com",
          phoneNumber: "675740849",
        });

      const emp = await User.findOneByOrFail({
        email: "emp3@EKRABSCSBIJIUEDPXVVK.com",
      });

      expect(response.status).toEqual(200);
      expect(emp).toEqual({
        id: expect.any(String),
        firstName: "Wioletta",
        lastName: "Kwiatkowska",
        email: "emp3@EKRABSCSBIJIUEDPXVVK.com",
        phoneNumber: "675740849",
        role: "employee",
        schedules: undefined,
        services: undefined,
        visits: undefined,
      });
    });
  });

  describe("get", () => {
    test("return single employee", async () => {
      const response = await request(app)
        .get("/employee")
        .set("Authorization", mngToken)
        .query({ id: "634dc798-9608-405e-8e95-94095d91fb73" });

      expect(response.status).toEqual(200);
      expect(response.body).toEqual({
        id: "634dc798-9608-405e-8e95-94095d91fb73",
        firstName: "Jolanta",
        lastName: "Rutkowska",
        email: "emp1@EKRABSCSBIJIUEDPXVVK.com",
        phoneNumber: "676043415",
        role: "employee",
        schedules: undefined,
        services: undefined,
        visits: undefined,
      });
    });
  });

  describe("patch", () => {
    test("update employee data", async () => {
      const response = await request(app)
        .patch("/employee")
        .set("Authorization", mngToken)
        .send({
          id: "634dc798-9608-405e-8e95-94095d91fb73",
          firstName: "Katarzyna",
          lastName: "Nowakowska",
          email: "emp3@EKRABSCSBIJIUEDPXVVK.com",
          phoneNumber: "676043415",
        });

      const user = await User.findOneByOrFail({
        email: "emp3@EKRABSCSBIJIUEDPXVVK.com",
      });

      expect(response.status).toEqual(200);
      expect(user).toEqual({
        id: "634dc798-9608-405e-8e95-94095d91fb73",
        firstName: "Katarzyna",
        lastName: "Nowakowska",
        email: "emp3@EKRABSCSBIJIUEDPXVVK.com",
        phoneNumber: "676043415",
        role: "employee",
        schedules: undefined,
        services: undefined,
        visits: undefined,
      });
    });
  });

  describe("delete", () => {
    test("remove employee", async () => {
      const response = await request(app)
        .delete("/employee")
        .set("Authorization", mngToken)
        .send({ id: "244e757c-9d58-4be3-bc21-ac46953be644" });

      const user = await User.findOneBy({
        id: "244e757c-9d58-4be3-bc21-ac46953be644",
      });

      expect(response.status).toEqual(200);
      expect(user).toEqual(null);
    });
  });
});
