import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { Schedule } from "./Schedule.js";
import { Visit } from "./Visit.js";

export enum Roles {
  MANAGER = "manager",
  EMPLOYEE = "employee",
  USER = "user",
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    type: "enum",
    enum: Roles,
    default: Roles.USER,
  })
  role!: Roles;

  @Column({ default: "" })
  firstName!: string;

  @Column({ default: "" })
  lastName!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ default: "" })
  phoneNumber!: string;

  @OneToMany(() => Visit, (visit) => visit.bookedBy)
  visits!: Relation<Visit[]>;

  @OneToMany(() => Visit, (visit) => visit.servicedBy)
  services!: Relation<Visit[]>;

  @OneToMany(() => Schedule, (schedule) => schedule.for)
  schedules!: Relation<Visit[]>;
}
