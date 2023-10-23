import TasksTable from "@/src/components/tasks/TasksTable.tsx";
import { getAllTasks, getProjectPreviews } from "@/src/graphql/queries.ts";
import { createTask as createTaskMutation } from "@/src/graphql/mutations.ts";
import { revalidateTag } from "next/cache";
import CreateTaskModal from "@/src/components/tasks/CreateTaskModal.tsx";
import { getUserSession } from "@/src/utils/auth.utils.ts";
import { Session } from "next-auth";

export default async function TasksPage() {
  const session = await getUserSession();

  if (!session) {
    return null;
  }

  const tasks = await getAllTasks(session);
  const projects = await getProjectPreviews(session);

  async function createTask(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const dueDate = formData.get("dueDate") as string;
    const priority = formData.get("priority") as string;
    const projectId = formData.get("projectId") as string;
    const status = formData.get("status") as string;

    await createTaskMutation({
      session: session as Session,
      name,
      description,
      dueDate: new Date(dueDate),
      priority: parseInt(priority),
      projectId,
      status: parseInt(status),
    });

    revalidateTag("tasks");
    revalidateTag("projects");
  }

  return (
    <div className="flex flex-col gap-3">
      <CreateTaskModal createTask={createTask} projects={projects} />
      <TasksTable tasks={tasks} />
    </div>
  );
}
