import PageHeading from "@/components/common/page-heading";
import React from "react";

import ProjectsClientPage from "./page.client";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import CreateProjectDialog from "./_components/create-project-dialog";
import { db } from "@/server/db";
import { projectsTable } from "@/server/db/schema";

export default async function ProjectsPage() {
  const projects = await db.select().from(projectsTable);

  return (
    <div>
      <div className="flex items-center justify-between">
        <PageHeading
          title="Projects"
          subtitle="All the projects added to your account."
        />
        <CreateProjectDialog
          trigger={
            <Button>
              <PlusCircleIcon />
              <span>Create</span>
            </Button>
          }
        />
      </div>

      <ProjectsClientPage projects={projects} />
    </div>
  );
}
