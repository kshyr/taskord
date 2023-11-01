import { getProjectById } from "@/src/graphql/queries.ts";
import DeleteAction from "@/src/components/general/DeleteAction.tsx";
import {
  deleteProject as deleteProjectMutation,
  updateTaskStatus as updateTaskStatusMutation,
} from "@/src/graphql/mutations.ts";
import { revalidateTag } from "next/cache";
import { getUserSession } from "@/src/utils/auth.utils.ts";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
import KanbanBoard from "@/src/components/projects/kanban/KanbanBoard.tsx";
import { StatusValue } from "@/src/types/types.ts";

export default async function ProjectPage({
  params,
}: {
  params: { projectId: string };
}) {
  const session = await getUserSession();

  if (!session) {
    return null;
  }

  const project = await getProjectById(session, params.projectId);

  if (!project) {
    redirect("/projects");
  }

  async function updateTaskStatus(id: string, status: StatusValue) {
    "use server";

    // const project = await getProjectById(session as Session, params.projectId);
    await updateTaskStatusMutation(session as Session, id, status);
    // revalidateTag(project.id);
  }

  async function deleteProject() {
    "use server";

    await deleteProjectMutation(session as Session, params.projectId);
    revalidateTag("projects");
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold">{project.name}</h1>
      <p className="font-xl font-normal">This is a project page</p>
      <DeleteAction deleteMutation={deleteProject} />
      <KanbanBoard tasks={project.tasks} updateTaskStatus={updateTaskStatus} />
    </div>
  );
}
