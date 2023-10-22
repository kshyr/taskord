import {
  Table,
  TableBody,
  TableHeader,
  TableCell,
  TableRow,
  TableHead,
} from "@/src/components/ui/table.tsx";
import type { Task } from "@/src/types/types.ts";
import DeleteTaskButton from "@/src/components/tasks/DeleteTaskButton.tsx";

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
                <DeleteTaskButton taskId={task.id} deleteTask={deleteTask} />
              </TableCell>
            </TableRow>
          );
        })}
        <TableRow>
          <TableCell>Task 1</TableCell>
          <TableCell>Project 1</TableCell>
          <TableCell>2021-10-10</TableCell>
          <TableCell>Done</TableCell>
          <TableCell>High</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
