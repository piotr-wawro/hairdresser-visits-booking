import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
