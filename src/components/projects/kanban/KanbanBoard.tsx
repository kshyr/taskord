"use client";
import type { Task } from "@/src/types/types.ts";
import { StatusValue } from "@/src/types/types.ts";
import { useMemo, useState } from "react";
import { experimental_useOptimistic as useOptimistic } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { DraggableTask } from "@/src/components/projects/kanban/DraggableTask.tsx";
import { DroppableColumn } from "@/src/components/projects/kanban/DroppableColumn.tsx";
import HorizontalScroller from "@/src/components/general/HorizontalScroller.tsx";
import { getSubscriptionClient } from "@/src/graphql/client.ts";
import { Session } from "next-auth";
import { gql } from "graphql-request";
import { getSession, useSession } from "next-auth/react";

type Column = {
  status: StatusValue;
  name: string;
  tasks: Task[];
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

type KanbanBoardProps = {
  tasks?: Task[];
  updateTaskStatus: (id: string, status: StatusValue) => Promise<void>;
};

export default function KanbanBoard({
  tasks,
  updateTaskStatus,
}: KanbanBoardProps) {
  console.log(tasks?.map((task) => task.status));

  const [optimisticTasks, addOptimisticTask] = useOptimistic<Task[]>(
    tasks || [],
    // @ts-ignore
    (
      state: Task[],
      partiallyUpdatedTask: { id: string; status: StatusValue },
    ) =>
      state.map((task) => {
        if (task.id === partiallyUpdatedTask.id) {
          return {
            ...task,
            status: partiallyUpdatedTask.status,
          };
        }
        return task;
      }),
  );
  const columns = useMemo(
    () => buildColumns(optimisticTasks || []),
    [optimisticTasks],
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { over, active } = event;

    if (over && tasks) {
      const task = optimisticTasks.find(
        (task) => task.id === active.id,
      ) as Task;
      addOptimisticTask({
        id: task.id,
        status: over.id as StatusValue,
      });
      const res = await updateTaskStatus(task.id, over.id as StatusValue);
    }
  }

  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  const client = getSubscriptionClient(session as Session);
  client.subscribe(
    {
      query: gql`
        subscription {
          value(condition: 100)
        }
      `,
    },
    {
      error: (err) => console.error(err),
      next: (data) => {
        console.log(data);
      },
      complete: () => console.log("done"),
    },
  );

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <HorizontalScroller className="flex w-full gap-4">
        {columns.map((column) => (
          <div
            key={column.status}
            className="flex min-h-[40rem] min-w-[20rem] flex-col gap-4 rounded-lg border bg-card p-4"
          >
            <h3 className=" font-bold">{column.name}</h3>
            <DroppableColumn status={column.status} key={column.status}>
              {column.tasks.map((task) => (
                <DraggableTask key={task.id} task={task}></DraggableTask>
              ))}
              Drop here
            </DroppableColumn>
          </div>
        ))}
      </HorizontalScroller>
    </DndContext>
  );
}
