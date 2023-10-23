import LandingHeader from "@/src/components/landing/Header.tsx";
import { priorityItems } from "@/src/lib/data/priorities.ts";
import { statusItems } from "@/src/lib/data/statuses.ts";
import { ReactNode } from "react";
import { sampleProjects } from "@/src/lib/data/projects.ts";
import ProjectCard from "@/src/components/projects/ProjectCard.tsx";

export default function DesignPage() {
  return (
    <div className="flex min-h-screen flex-col bg-darker">
      <LandingHeader />
      <main className="container flex max-w-2xl flex-col gap-6 pt-8">
        <h1 className="font-head text-4xl">Design</h1>
        <div className="h-1 w-full bg-muted" />
        <Category title="Status">
          <div className="grid grid-flow-col grid-rows-3 gap-4">
            {statusItems.statuses.map((status) => {
              const StatusIcon = status.icon;
              return (
                <div key={status.label} className="flex items-center gap-3">
                  <StatusIcon
                    size={statusItems.defaults.iconSize}
                    className={status.className}
                  />
                  <span className="text-muted-foreground">{status.label}</span>
                </div>
              );
            })}
          </div>
        </Category>
        <Category title={"Priority"}>
          <div className="flex flex-col gap-4">
            {priorityItems.priorities.map((priority) => {
              const PriorityIcon = priority.icon;
              return (
                <div key={priority.label} className="flex items-center gap-3">
                  <PriorityIcon
                    size={priorityItems.defaults.iconSize}
                    className={priority.className}
                  />
                  <span className="text-muted-foreground">
                    {priority.label}
                  </span>
                </div>
              );
            })}
          </div>
        </Category>
        <Category title={"Project cards"}>
          <div className="flex gap-4">
            {sampleProjects.map((project) => (
              <ProjectCard key={project.id} previewMode project={project} />
            ))}
          </div>
        </Category>
      </main>
    </div>
  );
}

type CategoryProps = {
  title: string;
  children: ReactNode;
};

function Category({ title, children }: CategoryProps) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className=" text-2xl font-semibold">{title}</h2>
      {children}
      <div className="h-[1px] w-full bg-muted" />
    </div>
  );
}
