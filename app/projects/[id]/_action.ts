"use server";

import { db } from "@/server/db";
import { CreateEnvironment, createEnvironmentSchema } from "./_schema";
import { environmentsTable } from "@/server/db/schema";
import { revalidatePath } from "next/cache";

export const createEnvironmentAction = async (values: CreateEnvironment) => {
  const result = createEnvironmentSchema.safeParse(values);

  if (!result.success) {
    return {
      success: false,
      error: result.error,
    };
  }

  try {
    await db.insert(environmentsTable).values({
      name: result.data.name,
      description: result.data.description,
      projectId: result.data.projectId,
    });

    revalidatePath(`/projects/${result.data.projectId}`);

    return {
      success: true,
    };
  } catch (err) {
    console.error("Error creating a new environment. Error: ", err);
    return {
      success: false,
      message: "Something went wrong creating a new environment.",
    };
  }
};
