import type { Project } from "@/src/types/types.ts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import Link from "next/link";
import { ReactNode } from "react";
import {
  priorityItems,
  Priority,
  Status,
  statusItems,
} from "@/src/lib/static_data.ts";
import { StatusValue } from "@/src/types/types.ts";

type ProjectCardProps = {
  project: Project;
};

type ProjectLinkProps = {
  project: Project;
  children: ReactNode;
};

function ProjectLink({ project, children }: ProjectLinkProps) {
  return (
    <Link href={`/projects/${project.id}`} key={project.id}>
      {children}
    </Link>
  );
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex flex-1 flex-col justify-between">
      <CardHeader>
        <ProjectLink project={project}>
          <CardTitle>{project.name}</CardTitle>
        </ProjectLink>
        <CardDescription>{project.description}</CardDescription>
        <div className="mt-2 flex w-full flex-wrap justify-end gap-2">
          {project.tags?.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-col gap-2">
          {project.tasks
            ?.sort((a, b) => {
              if (!a.dueDate && !b.dueDate) return 0;
              if (!a.dueDate) return -1;
              if (!b.dueDate) return 1;

              return (
                new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
              );
            })
            ?.map((task) => {
              // const status = statuses.find(
              //  (s) => s.value === task.status,
              //) as Status;
              const status = statusItems.statuses[2] as Status;
              const StatusIcon = status.icon;

              const priority = priorityItems.priorities[0] as Priority;
              const PriorityIcon = priority.icon;

              const isPriorityDisplayed =
                task.status === StatusValue.BACKLOG ||
                task.status === StatusValue.IN_PROGRESS ||
                task.status === StatusValue.TODO;

              return (
                <div
                  key={task.id}
                  className="flex w-full items-center gap-1 rounded-lg border border-border bg-neutral-800 px-3 py-2 text-sm font-medium"
                >
                  <span className="mr-auto">{task.name}</span>
                  <StatusIcon
                    size={statusItems.defaults.iconSize}
                    className={status.className}
                  />
                  {isPriorityDisplayed && (
                    <PriorityIcon
                      size={priorityItems.defaults.iconSize}
                      className={priority.className}
                    />
                  )}
                </div>
              );
            })}
        </div>
      </CardContent>
    </Card>
  );
}
