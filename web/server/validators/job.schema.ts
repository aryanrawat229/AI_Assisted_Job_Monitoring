import { z } from "zod";

export const createJobSchema = z.object({
  title: z.string().min(1, "Title is required").trim(),
  description: z.string().min(1, "Description is requried"),
  experience: z.number().int().min(0, "Experience must be >= 0"),
  salary: z.number().optional(),
  apply_link: z.url("Invalid apply link"),
});

export type CreateJobInput = z.infer<typeof createJobSchema>;
