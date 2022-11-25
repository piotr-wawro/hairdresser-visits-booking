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

  @Column({ type: "timestamptz" })
  start!: Date;

  @Column({ type: "timestamptz" })
  end!: Date;

  @Column({ nullable: true })
  bookedById!: string;

  @Column({ nullable: true })
  servicedById!: string;

  @ManyToOne(() => User, (user) => user.visits, { onDelete: "CASCADE" })
  bookedBy!: Relation<User>;

  @ManyToOne(() => User, (user) => user.services, { onDelete: "CASCADE" })
  servicedBy!: Relation<User>;
}
