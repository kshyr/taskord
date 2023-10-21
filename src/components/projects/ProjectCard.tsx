import { Project } from "@/src/types/types.ts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { encodeSlug } from "@/src/utils/general.utils.ts";
import Link from "next/link";
import { ReactNode } from "react";

function ProjectLink({
  project,
  children,
}: {
  project: Project;
  children: ReactNode;
}) {
  return (
    <Link href={`/projects/${encodeSlug(project.name)}`} key={project.id}>
      {children}
    </Link>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="flex flex-1 flex-col justify-between">
      <CardHeader>
        <ProjectLink project={project}>
          <CardTitle>{project.name}</CardTitle>
        </ProjectLink>
        <CardDescription>{project.description}</CardDescription>
        <div className="mt-2 flex w-full flex-wrap justify-end gap-2">
          <span className="text-gray-700 mr-auto text-sm font-medium">
            {project.category}
          </span>
          {project.tags?.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {project.tasks
            ?.sort(
              (a, b) =>
                new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime(),
            )
            .map((task) => (
              <div
                key={task.id}
                className="flex w-full rounded-lg border border-border bg-neutral-800 px-4 py-2 text-sm font-medium"
              >
                <span>{task.name}</span>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
