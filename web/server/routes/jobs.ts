import { Router, type Request, type Response } from "express";
import { createJobSchema, type CreateJobInput } from "../validators/job.schema";
import { JobModel } from "../models/jobs";

const router = Router();

/**
 * POST /jobs
 * Create a new job
 */
router.post("/", async (req: Request, res: Response) => {
  const { success, data, error } = createJobSchema.safeParse(req.body);

  if (!success) {
    res.status(400).json({
      error: "Schema Validation failed",
      issues: error.issues,
    });
  }

  try {
    const job = await JobModel.create(data as CreateJobInput);
    res.status(201).json({
      success: true,
      job,
    });
  } catch (error) {
    console.error("Create job error:", error);
    res.status(500).json({
      error: "Failed to create job",
    });
  }
});

export default router;
