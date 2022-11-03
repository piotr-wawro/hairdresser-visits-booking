import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { User } from "./User.js";

@Entity()
export class Schedule extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  start!: Date;

  @Column()
  end!: Date;

  @ManyToOne(() => User, (user) => user.visits)
  for!: Relation<User>;
}
