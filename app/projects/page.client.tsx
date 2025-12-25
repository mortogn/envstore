"use client";

import React, { useEffect, useState } from "react";
import SearchBar from "./_components/search-bar";
import { Environment, Project } from "@/server/db/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

type Props = {
  projects: Project[];
};

export default function ProjectsClientPage({ projects }: Props) {
  const [query, setQuery] = useState("");

  const queriedProjects = query
    ? projects.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.description?.toLowerCase().includes(query.toLowerCase())
      )
    : projects;

  return (
    <div className="mt-10">
      <SearchBar value={query} onChange={setQuery} />

      <div className="grid grid-cols-5 gap-3 mt-6">
        {queriedProjects.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`}>
            <Card className="flex flex-col gap-1 h-full">
              <CardHeader className="mb-0">
                <CardTitle>{project.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <div className="flex-1" />
              <CardFooter className="flex-col items-start font-medium tracking-wide font-mono">
                <p>12 enviroments</p>
                <p>46 secrets</p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
