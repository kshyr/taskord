import { useDraggable } from "@dnd-kit/core";
import { StatusValue, Task } from "@/src/types/types.ts";
import { cn } from "@/src/utils/styles.utils.ts";
import { Status, statusItems } from "@/src/lib/data/statuses.ts";
import { Priority, priorityItems } from "@/src/lib/data/priorities.ts";
import { getRemainingTime } from "@/src/utils/datetime.utils.ts";

type DraggableTaskProps = {
  task: Task;
};

export function DraggableTask({ task }: DraggableTaskProps) {
  const { attributes, listeners, setNodeRef, transform, over } = useDraggable({
    id: task.id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const status = statusItems.statuses.find(
    (s) => s.value === task.status,
  ) as Status;
  const StatusIcon = status.icon;

  const priority = priorityItems.priorities.find(
    (p) => p.value === task.priority,
  ) as Priority;
  const PriorityIcon = priority.icon;

  const isPriorityDisplayed =
    task.status === StatusValue.IN_PROGRESS || task.status === StatusValue.TODO;

  const remainingTime = task.dueDate ? getRemainingTime(task.dueDate) : "";

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        "flex w-full items-center gap-1 rounded-lg border border-border bg-neutral-800 px-3 py-2 text-sm font-medium",
        "cursor-pointer hover:border-muted-foreground hover:drop-shadow-md",
      )}
    >
      <span className="mr-auto">{task.name}</span>
      {remainingTime && (
        <span className={cn("text-xs", remainingTime.twColor)}>
          {remainingTime.time}
        </span>
      )}
      <StatusIcon
        size={statusItems.defaults.iconSize}
        className={cn(statusItems.defaults.className, status.className)}
      />
      {isPriorityDisplayed && (
        <PriorityIcon
          size={priorityItems.defaults.iconSize}
          className={cn(priorityItems.defaults.className, priority.className)}
        />
      )}
    </div>
  );
}
