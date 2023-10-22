"use client";
import { Button } from "@/src/components/ui/button.tsx";

type DeleteProjectButtonProps = {
  projectId: string;
  deleteProject: (id: string) => void;
};

export default function DeleteProjectButton({
  deleteProject,
  projectId,
}: DeleteProjectButtonProps) {
  return <Button onClick={() => deleteProject(projectId)}>Delete</Button>;
}
