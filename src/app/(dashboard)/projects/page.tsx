import ProjectCard from "@/src/components/projects/ProjectCard.tsx";
import { getUserSession } from "@/src/utils/auth.utils.ts";
import { getProjectPreviews } from "@/src/graphql/queries.ts";

export default async function ProjectsPage() {
  const session = await getUserSession();

  if (!session) return null;

  const projects = await getProjectPreviews(session.user.id);

  return (
    <div className="flex w-full gap-3">
      {projects.map((project) => (
        <ProjectCard project={project} key={`project-${project.id}`} />
      ))}
    </div>
  );
}
