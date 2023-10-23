import {
  Table,
  TableBody,
  TableHeader,
  TableCell,
  TableRow,
  TableHead,
} from "@/src/components/ui/table.tsx";
import type { Task } from "@/src/types/types.ts";
import DeleteAction from "@/src/components/general/DeleteAction.tsx";
import { deleteTask as deleteTaskMutation } from "@/src/graphql/mutations.ts";
import { Session } from "next-auth";
import { revalidateTag } from "next/cache";
import { getUserSession } from "@/src/utils/auth.utils.ts";

type TaskTableProps = {
  tasks: Task[];
};

export default async function TasksTable({ tasks }: TaskTableProps) {
  const session = await getUserSession();

  if (!session) {
    return null;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Project</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => {
          const dueDate = task?.dueDate && new Date(task.dueDate);

          async function deleteTask() {
            "use server";

            await deleteTaskMutation(session as Session, task.id);

            revalidateTag("tasks");
            revalidateTag("projects");
          }

          return (
            <TableRow key={task.id}>
              <TableCell>{task.name}</TableCell>
              <TableCell>{task?.project?.name}</TableCell>
              <TableCell>
                {dueDate &&
                  dueDate.toLocaleDateString() +
                    " at " +
                    dueDate.toLocaleTimeString().split(" ")[0].slice(0, -3) +
                    " " +
                    dueDate.toLocaleTimeString().split(" ")[1]}
              </TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell>{task.priority}</TableCell>
              <TableCell>
                <DeleteAction deleteMutation={deleteTask} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
