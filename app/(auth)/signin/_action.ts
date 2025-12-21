"use server";

import { z } from "zod";
import { signInSchema } from "./_schema";

type SignInActionParams = z.infer<typeof signInSchema>;

export const signInAction = (values: SignInActionParams) => {
  const result = signInSchema.safeParse(values);

  if (!result.success) {
    return {
      success: false,
      errors: result.error,
    };
  }
};
