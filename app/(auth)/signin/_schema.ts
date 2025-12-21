import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Provided email address is not valid"),
  password: z
    .string()
    .min(8, "Password must have a minimum length of 8")
    .max(32, "Maximum length for password is 32"),
});
