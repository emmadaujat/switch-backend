import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source";
import contactRoutes from "./routes/contact";
import adminRoutes from "./routes/admin";
import morgan from "morgan";

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());
app.use(morgan("dev"));
app.use("/contact", contactRoutes);
app.use("/admin", adminRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
    app.listen(process.env.PORT || 4000, () => {
      console.log(`Server running on port ${process.env.PORT || 4000}`);
    });
  })
  .catch((err) => console.error("DB connection error:", err));
