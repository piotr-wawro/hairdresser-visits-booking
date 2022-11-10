import { MigrationInterface, QueryRunner } from "typeorm";

export class test1668074868708 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "user" ("id", "firstName", "lastName", "email", "phoneNumber", "role")
       VALUES
        ('c9c70c2c-ca36-498c-91e4-d51b67f3c1dd', 'Klara', 'Kowalska', 'mng@EKRABSCSBIJIUEDPXVVK.com', '607867801', 'manager')
        ('634dc798-9608-405e-8e95-94095d91fb73', 'Jolanta', 'Rutkowska', 'emp1@EKRABSCSBIJIUEDPXVVK.com', '676043415', 'employee')
        ('244e757c-9d58-4be3-bc21-ac46953be644', 'Krystyn', 'Jaworski', 'emp2@EKRABSCSBIJIUEDPXVVK.com', '727388602', 'employee')
        ('d32cff38-8813-48da-9df0-1fe3a83287e8', 'Alojzy', 'Zawadzki', 'usr1@EKRABSCSBIJIUEDPXVVK.com', '727388602', 'user')
        ('2176b3f7-f58a-45d3-837a-ba93dca5e872', 'Wisława', 'Olszewska', 'usr2@EKRABSCSBIJIUEDPXVVK.com', '661753220', 'user')
        ('d2aab8be-7de5-4ffc-9fbc-41817b1cb4d3', 'Irena', 'Szymańska', 'usr3@EKRABSCSBIJIUEDPXVVK.com', '604939624', 'user')
        ('35df7121-a675-4969-8cc5-bdbdfb53810f', 'Ignacy', 'Woźniak', 'emp4@EKRABSCSBIJIUEDPXVVK.com', '787371335', 'user')

      ;`
    );

    await queryRunner.query(
      `INSERT INTO "schedule" ("id", "start", "end", "forId")
         VALUES
          ('b5926670-6e3b-4c84-8a14-d907ca072d07', '2022-12-01 08:00:00', '2022-12-01 10:00:00', '634dc798-9608-405e-8e95-94095d91fb73')
          ('6f11ef42-515f-4a26-8a52-730e0f64d529', '2022-12-01 13:00:00', '2022-12-01 16:00:00', '634dc798-9608-405e-8e95-94095d91fb73')
          ('e6cfbc8e-bd07-4a8d-a360-429b67e61d1f', '2022-12-01 10:00:00', '2022-12-01 18:00:00', '244e757c-9d58-4be3-bc21-ac46953be644')
          ('b52d6d44-214c-448c-80f4-5966536bd5a9', '2022-12-02 08:00:00', '2022-12-02 16:00:00', '244e757c-9d58-4be3-bc21-ac46953be644')
        ;`
    );

    await queryRunner.query(
      `INSERT INTO "schedule" ("id", "start", "end", "bookedById", "servicedById")
           VALUES
            ('a88987c1-59ab-4e0e-a205-9de7c0458b0e', '2022-12-01 08:00:00', '2022-12-01 09:00:00', 'd32cff38-8813-48da-9df0-1fe3a83287e8', '634dc798-9608-405e-8e95-94095d91fb73')
            ('14ff7f01-2651-4e6f-bcf7-15b7e75b9ca9', '2022-12-01 13:00:00', '2022-12-01 14:00:00', '2176b3f7-f58a-45d3-837a-ba93dca5e872', '634dc798-9608-405e-8e95-94095d91fb73')
            ('3edcf7d2-2a99-4756-8a6c-6ec4cc08ee03', '2022-12-01 15:00:00', '2022-12-01 16:00:00', 'd2aab8be-7de5-4ffc-9fbc-41817b1cb4d3', '244e757c-9d58-4be3-bc21-ac46953be644')
            ('2eaa34b6-379a-4820-ae41-3e9cf6dc812b', '2022-12-02 09:00:00', '2022-12-02 10:00:00', '35df7121-a675-4969-8cc5-bdbdfb53810f', '244e757c-9d58-4be3-bc21-ac46953be644')
          ;`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "user"
        WHERE (("firstName" = 'saffs'));`
    );
  }
}
