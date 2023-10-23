import { StatusValue, Task } from "@/src/types/types.ts";

export function sortTasks(tasks: Task[]): Task[] {
  return tasks.sort((a, b) => {
    if (a.dueDate && !b.dueDate) return -1;
    if (!a.dueDate && b.dueDate) return 1;

    if (a.dueDate && b.dueDate) {
      const aDate = new Date(a.dueDate).getTime();
      const bDate = new Date(b.dueDate).getTime();

      if (aDate < bDate) return -1;
      if (aDate > bDate) return 1;
    }

    if (a.priority > b.priority) return -1;
    if (a.priority < b.priority) return 1;

    const statusPriority = [
      StatusValue.IN_PROGRESS,
      StatusValue.TODO,
      StatusValue.BACKLOG,
    ];
    return statusPriority.indexOf(a.status) - statusPriority.indexOf(b.status);
  });
}
