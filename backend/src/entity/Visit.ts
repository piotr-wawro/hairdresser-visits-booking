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
export class Visit extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  start!: Date;

  @Column()
  end!: Date;

  @Column({ nullable: true })
  userId!: string;

  @ManyToOne(() => User, (user) => user.visits)
  user!: Relation<User>;
}
