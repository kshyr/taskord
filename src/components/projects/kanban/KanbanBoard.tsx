"use client";
import type { Task } from "@/src/types/types.ts";
import { StatusValue } from "@/src/types/types.ts";
import { useEffect, useMemo, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { DraggableTask } from "@/src/components/projects/kanban/DraggableTask.tsx";
import { DroppableColumn } from "@/src/components/projects/kanban/DroppableColumn.tsx";
import HorizontalScroller from "@/src/components/general/HorizontalScroller.tsx";
import { getSocket, getSubscriptionClient } from "@/src/graphql/client.ts";
import { Session } from "next-auth";
import { gql } from "graphql-request";
import { useSession } from "next-auth/react";

type Column = {
  status: StatusValue;
  name: string;
  tasks: Task[];
};

type KanbanBoardProps = {
  tasks?: Task[];
  updateTaskStatus: (id: string, status: StatusValue) => Promise<void>;
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

export default function KanbanBoard({
  tasks,
  updateTaskStatus,
}: KanbanBoardProps) {
  console.log(tasks?.map((task) => task.status));

  const [optimisticTasks, setOptimisticTasks] = useState<Task[]>(tasks ?? []);
  const columns = useMemo(
    () => buildColumns(optimisticTasks || []),
    [optimisticTasks],
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { over, active } = event;

    console.log(optimisticTasks);
    if (over && tasks) {
      const newTasks = optimisticTasks.map((task) => {
        if (task.id === active.id) {
          return {
            ...task,
            status: over.id as StatusValue,
          };
        }
        return task;
      });
      setOptimisticTasks(newTasks);

      await updateTaskStatus(active.id as Task["id"], over.id as StatusValue);
    }
  }

  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      return;
    }

    const socket = getSocket();
    const client = getSubscriptionClient(session as Session, socket);
    socket.addEventListener("open", () => {
      client.subscribe(
        gql`
          subscription {
            taskUpdated {
              id
              name
              status
            }
          }
        `,
        {
          error: (err) => console.error(err),
          next: (data) => {
            console.log(data);
            const { id, status } = data.taskUpdated;

            const newTasks = optimisticTasks.map((task) => {
              if (task.id === id) {
                return {
                  ...task,
                  status,
                };
              }
              return task;
            });
            setOptimisticTasks(newTasks);
          },
          complete: () => console.log("done"),
        },
      );
    });

    return () => {
      socket.removeEventListener("open", () => {});
    };
  }, [session]);

  if (!session) {
    return null;
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <HorizontalScroller className="flex w-full gap-4">
        {columns.map((column) => (
          <div
            key={column.status}
            className="flex min-h-[40rem] min-w-[20rem] flex-col gap-4 rounded-lg border bg-card p-4"
          >
            <h3 className="font-bold">{column.name}</h3>
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
