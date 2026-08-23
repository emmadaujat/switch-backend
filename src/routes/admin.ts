import { Router } from "express";
import { AppDataSource } from "../data-source";
import { ContactSubmission } from "../entities/ContactSubmission";
import { requireAdmin } from "../middleware/requireAdmin";

const router = Router();

router.get("/contact", requireAdmin, async (req, res) => {
  const repo = AppDataSource.getRepository(ContactSubmission);
  const submissions = await repo.find({ order: { createdAt: "DESC" } });
  res.json(submissions);
});

export default router;
