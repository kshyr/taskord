"use client";
import type { Task } from "@/src/types/types.ts";
import { StatusValue } from "@/src/types/types.ts";
import { useMemo, useState } from "react";
import { DndContext, DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import { DraggableTask } from "@/src/components/projects/kanban/DraggableTask.tsx";
import { DroppableColumn } from "@/src/components/projects/kanban/DroppableColumn.tsx";
import HorizontalScroller from "@/src/components/general/HorizontalScroller.tsx";

type Column = {
  status: StatusValue;
  name: string;
  tasks: Task[];
};

type KanbanBoardProps = {
  tasks?: Task[];
};

function buildColumns(tasks: Task[]): Column[] {
  const columns: Column[] = [
    {
      status: StatusValue.BACKLOG,
      name: "Backlog",
      tasks: [],
    },
    {
      status: StatusValue.TODO,
      name: "To Do",
      tasks: [],
    },
    {
      status: StatusValue.IN_PROGRESS,
      name: "In Progress",
      tasks: [],
    },
    {
      status: StatusValue.DONE,
      name: "Done",
      tasks: [],
    },
    {
      status: StatusValue.CANCELED,
      name: "Canceled",
      tasks: [],
    },
  ];

  for (const task of tasks) {
    const column = columns.find(
      (column) => column.status === task.status,
    ) as Column;

    column.tasks.push(task);
  }

  return columns;
}

export default function KanbanBoard({ tasks }: KanbanBoardProps) {
  const columns = useMemo(() => buildColumns(tasks || []), [tasks]);
  const [parent, setParent] = useState<UniqueIdentifier | null>(1);

  const draggableMarkup = <DraggableTask id={1}>Drag me</DraggableTask>;

  function handleDragEnd(event: DragEndEvent) {
    const { over } = event;
    over && setParent(over.id);
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <HorizontalScroller className="flex w-full gap-4">
        {columns.map((column) => (
          <div
            key={column.status}
            className="flex min-h-[40rem] min-w-[20rem] flex-col gap-4 rounded-lg border bg-card p-4"
          >
            <h3 className=" font-bold">{column.name}</h3>
            <DroppableColumn id={column.status} key={column.status}>
              {parent === column.status ? draggableMarkup : "Drop here"}
            </DroppableColumn>
          </div>
        ))}
      </HorizontalScroller>
    </DndContext>
  );
}
