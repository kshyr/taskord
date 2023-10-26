import type { Project } from "@/src/types/types.ts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import Link from "next/link";
import { ReactNode } from "react";
import { priorityItems, Priority } from "@/src/lib/data/priorities.ts";
import { statusItems, Status } from "@/src/lib/data/statuses.ts";
import { StatusValue } from "@/src/types/types.ts";
import { cn } from "@/src/utils/styles.utils.ts";
import ProjectCardTags from "@/src/components/projects/ProjectCardTags.tsx";
import { getRemainingTime } from "@/src/utils/datetime.utils.ts";
import { sortTasks } from "@/src/utils/sort.utils.ts";
import { ArrowRight } from "lucide-react";

type ProjectCardProps = {
  project: Project;
  previewMode?: boolean;
};

type ProjectLinkProps = {
  project: Project;
  previewMode?: boolean;
  children: ReactNode;
};

function ProjectLink({ project, previewMode, children }: ProjectLinkProps) {
  if (previewMode) {
    return <div className="cursor-pointer">{children}</div>;
  }
  return (
    <Link href={`/projects/${project.id}`} className="w-fit" key={project.id}>
      {children}
    </Link>
  );
}

export default function ProjectCard({
  project,
  previewMode = false,
}: ProjectCardProps) {
  return (
    <Card className="flex flex-1 flex-col justify-between transition-all hover:border-muted-foreground/50 hover:drop-shadow-lg">
      <CardHeader className="gap-3">
        <div className="flex items-center justify-between">
          <ProjectLink project={project} previewMode={previewMode}>
            <CardTitle>{project.name}</CardTitle>
          </ProjectLink>
          <ProjectLink project={project} previewMode={previewMode}>
            <ArrowRight />
          </ProjectLink>
        </div>
        <CardDescription>{project.description}</CardDescription>
        {project.tags && <ProjectCardTags tags={project.tags} />}
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-col gap-2">
          {project.tasks?.sort(sortTasks)?.map((task) => {
            const status = statusItems.statuses.find(
              (s) => s.value === task.status,
            ) as Status;
            const StatusIcon = status.icon;

            const priority = priorityItems.priorities.find(
              (p) => p.value === task.priority,
            ) as Priority;
            const PriorityIcon = priority.icon;

            const isPriorityDisplayed =
              task.status === StatusValue.IN_PROGRESS ||
              task.status === StatusValue.TODO;

            const remainingTime = task.dueDate
              ? getRemainingTime(task.dueDate)
              : "";

            return (
              <div
                key={task.id}
                className={cn(
                  "flex w-full items-center gap-1 rounded-lg border border-border bg-neutral-800 px-3 py-2 text-sm font-medium",
                  "cursor-pointer transition-all hover:border-muted-foreground hover:drop-shadow-md",
                )}
              >
                <span className="mr-auto">{task.name}</span>
                {remainingTime && (
                  <span className={cn("text-xs", remainingTime.twColor)}>
                    {remainingTime.time}
                  </span>
                )}
                <StatusIcon
                  size={statusItems.defaults.iconSize}
                  className={cn(
                    statusItems.defaults.className,
                    status.className,
                  )}
                />
                {isPriorityDisplayed && (
                  <PriorityIcon
                    size={priorityItems.defaults.iconSize}
                    className={cn(
                      priorityItems.defaults.className,
                      priority.className,
                    )}
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
