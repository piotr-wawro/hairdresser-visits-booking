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

  @Column({ nullable: true })
  forId!: string;

  @ManyToOne(() => User, (user) => user.visits, { onDelete: "CASCADE" })
  for!: Relation<User>;
}
