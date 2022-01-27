import { Entity, Column, PrimaryGeneratedColumn, Double } from "typeorm";

@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  accountNumber: number;

  @Column()
  accountDigits: number;

  @Column()
  wallet: Double;

  @Column()
  email: string;

  @Column()
  password: string;
}
