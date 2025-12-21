import React from "react";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="max-w-5xl mx-auto">{children}</div>;
}
