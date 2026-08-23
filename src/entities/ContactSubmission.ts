import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class ContactSubmission {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  fullName!: string;

  @Column()
  email!: string;

  @Column({ nullable: true })
  studentId?: string;

  @Column("text")
  message!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
