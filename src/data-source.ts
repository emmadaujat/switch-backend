import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { ContactSubmission } from "./entities/ContactSubmission";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  synchronize: true, // fine for a solo/small project; switch to migrations later if the team grows
  logging: false,
  entities: [ContactSubmission],
});
