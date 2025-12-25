import PageHeading from "@/components/common/page-heading";
import { Button } from "@/components/ui/button";
import { db } from "@/server/db";
import {
  environmentsTable,
  projectsTable,
  variablesTable,
} from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { PlusCircleIcon } from "lucide-react";
import { notFound } from "next/navigation";
import React from "react";
import CreateEnvDialog from "./_components/create-env-dialog";
import EnvironmentTab from "./_components/env-tab";
import { transformProjectRow } from "./_utils";

export default async function ProjectDetails({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ envId: string }>;
}) {
  const { id } = await params;
  const res = await db
    .select()
    .from(projectsTable)
    .where(eq(projectsTable.id, id))
    .leftJoin(
      environmentsTable,
      eq(environmentsTable.projectId, projectsTable.id)
    )
    .leftJoin(
      variablesTable,
      eq(variablesTable.environmentId, environmentsTable.id)
    );

  const project = transformProjectRow(res);

  if (!project) {
    notFound();
  }

  console.log(project);

  return (
    <div>
      <div className="flex items-center justify-between">
        <PageHeading
          title={project.title}
          subtitle={project.description || ""}
        />
        <div className="space-x-2">
          <CreateEnvDialog
            projectId={id}
            trigger={
              <Button variant="secondary">
                <PlusCircleIcon />
                Environment
              </Button>
            }
          />
          <Button>
            <PlusCircleIcon />
            Variable
          </Button>
        </div>
      </div>
      <div className="my-4">
        <EnvironmentTab envs={project.envs} />
      </div>
    </div>
  );
}
