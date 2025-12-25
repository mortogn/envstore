import { z } from "zod";

export const createEnvironmentSchema = z.object({
  projectId: z.string().uuid(),
  name: z.string().min(3).max(30),
  description: z.string().max(80).optional(),
});

export type CreateEnvironment = z.infer<typeof createEnvironmentSchema>;

export const variableItemSchema = z.object({
  key: z
    .string()
    .min(1, "Key is required")
    .max(255, "Key can not exceed 255 characters."),
  value: z.string().min(1, "Value is required"),
});

export const createVariableSchema = z.object({
  variables: z
    .array(variableItemSchema)
    .min(1, "At least one variable is required."),
  envId: z.string().min(1, "Environment selection is required"),
});

export type CreateVariableValues = z.infer<typeof createVariableSchema>;
