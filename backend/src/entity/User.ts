import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { Visit } from "./Visit.js";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ default: "" })
  firstName!: string;

  @Column({ default: "" })
  lastName!: string;

  @Column()
  email!: string;

  @Column({ default: "" })
  phoneNumber!: string;

  @OneToMany(() => Visit, (visit) => visit.user)
  visits!: Relation<Visit[]>;
}
