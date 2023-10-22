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

type TaskTableProps = {
  tasks: Task[];
  deleteTask: (id: string) => void;
};

export default function TasksTable({ tasks, deleteTask }: TaskTableProps) {
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
                <DeleteAction itemId={task.id} deleteMutation={deleteTask} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
