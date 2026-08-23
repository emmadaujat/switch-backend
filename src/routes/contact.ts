import { Router } from "express";
import { AppDataSource } from "../data-source";
import { ContactSubmission } from "../entities/ContactSubmission";
import { contactLimiter } from "../middleware/rateLimiter";

const router = Router();

router.post("/", contactLimiter, async (req, res) => {
  const { fullName, email, studentId, message } = req.body;
  console.log(`New contact submission from ${email}`);

  // data validation
  if (!fullName?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  const repo = AppDataSource.getRepository(ContactSubmission);
  const submission = repo.create({ fullName, email, studentId, message });
  await repo.save(submission);

  res.status(201).json({ success: true });
});

export default router;
