"use server";

import { db } from "@/server/db";
import { CreateProject, createProjectSchema } from "./_schema";
import { projectsTable } from "@/server/db/schema";
import { revalidatePath } from "next/cache";

export const createProjectAction = async (data: CreateProject) => {
  const result = createProjectSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      error: result.error,
    };
  }

  try {
    await db.insert(projectsTable).values({
      title: data.title,
      description: data.description,
    });
  } catch (err) {
    console.error("Something went wrong creating a new project. Error: ", err);

    return {
      success: false,
      message: "Something went wrong",
    };
  }

  revalidatePath("/projects");

  return {
    success: true,
  };
};
