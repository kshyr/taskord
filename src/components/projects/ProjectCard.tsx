import { Project } from "@/src/types/types.ts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
        <div className="mt-2 flex w-full flex-wrap justify-end">
          <span className="text-gray-700 mr-auto text-sm">
            {project.category}
          </span>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-gray-700 bg-gray-100 mb-2 mr-2 rounded-full px-2 py-1 text-xs font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {project.tasks
            .sort(
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
