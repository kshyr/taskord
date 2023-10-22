import { getProjectById } from "@/src/graphql/queries.ts";
import DeleteAction from "@/src/components/general/DeleteAction.tsx";
import { deleteProject as deleteProjectMutation } from "@/src/graphql/mutations.ts";
import { revalidateTag } from "next/cache";

export default async function ProjectPage({
  params,
}: {
  params: { projectId: string };
}) {
  const project = await getProjectById(params.projectId);

  async function deleteProject(id: string) {
    "use server";

    await deleteProjectMutation(id);

    revalidateTag("projects");
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold">{project.name}</h1>
      <p className="font-xl font-normal">This is a project page</p>
      <DeleteAction itemId={project.id} deleteMutation={deleteProject} />
    </div>
  );
}
