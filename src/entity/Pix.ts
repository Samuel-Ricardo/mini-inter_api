import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

import { User } from "./User";

@Entity()
export class Pix {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  status: string;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn()
  receivingUser: User;

  @ManyToOne(() => User, user => user.id, { nullable: true })
  payingUser: User;

  @Column()
  value: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
