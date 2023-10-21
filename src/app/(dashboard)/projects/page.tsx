import ProjectCard from "@/src/components/projects/ProjectCard.tsx";
import { getUserSession } from "@/src/utils/auth.utils.ts";
import { getProjectPreviews } from "@/src/graphql/queries.ts";
import { createProject as createProjectMutation } from "@/src/graphql/mutations.ts";
import { pluralize } from "@/src/utils/general.utils.ts";
import CreateProjectModal from "@/src/components/projects/CreateProjectModal.tsx";
import { revalidateTag } from "next/cache";

export default async function ProjectsPage() {
  const session = await getUserSession();

  if (!session) return null;

  const projects = await getProjectPreviews();

  async function createProject(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    await createProjectMutation(name, description);

    revalidateTag("projects");
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex">
        <span className="text-muted-foreground">
          {projects.length} {pluralize(projects.length, "project")}
        </span>
        <CreateProjectModal createProject={createProject} />
      </div>
      <div className="flex w-full flex-wrap gap-3">
        {projects.map((project) => (
          <ProjectCard project={project} key={`project-${project.id}`} />
        ))}
      </div>
    </div>
  );
}
