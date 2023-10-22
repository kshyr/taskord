"use client";
import { Button } from "@/src/components/ui/button.tsx";

type DeleteTaskButtonProps = {
  taskId: string;
  deleteTask: (id: string) => void;
};

export default function DeleteTaskButton({
  deleteTask,
  taskId,
}: DeleteTaskButtonProps) {
  return <Button onClick={() => deleteTask(taskId)}>Delete</Button>;
}
