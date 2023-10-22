import TasksTable from "@/src/components/tasks/TasksTable.tsx";
import { getAllTasks, getProjectPreviews } from "@/src/graphql/queries.ts";
import {
  createTask as createTaskMutation,
  deleteTask as deleteTaskMutation,
} from "@/src/graphql/mutations.ts";
import { revalidateTag } from "next/cache";
import CreateTaskModal from "@/src/components/tasks/CreateTaskModal.tsx";
import { getUserSession } from "@/src/utils/auth.utils.ts";

export default async function TasksPage() {
  await getUserSession();

  const tasks = await getAllTasks();
  const projects = await getProjectPreviews();

  async function createTask(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const dueDate = formData.get("dueDate") as string;
    const priority = formData.get("priority") as string;
    const projectId = formData.get("projectId") as string;
    const status = formData.get("status") as string;

    await createTaskMutation({
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

  async function deleteTask(id: string) {
    "use server";

    await deleteTaskMutation(id);

    revalidateTag("tasks");
    revalidateTag("projects");
  }

  return (
    <div className="flex flex-col gap-3">
      <CreateTaskModal createTask={createTask} projects={projects} />
      <TasksTable tasks={tasks} deleteTask={deleteTask} />
    </div>
  );
}
