import { z } from "zod";

export const createProjectSchema = z.object({
  title: z.string().min(3).max(30),
  description: z.string().max(100).optional(),
});

export type CreateProject = z.infer<typeof createProjectSchema>;
