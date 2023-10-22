"use client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogHeader,
} from "@/src/components/ui/dialog.tsx";
import { ButtonWithIcon } from "@/src/components/ui/button.tsx";
import { Plus } from "lucide-react";

type CreateProjectModalProps = {
  createProject: (formData: FormData) => void;
};

export default function CreateProjectModal({
  createProject,
}: CreateProjectModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <ButtonWithIcon
          icon={<Plus size={20} />}
          variant="secondary"
          className="ml-auto gap-1"
        >
          New Project
        </ButtonWithIcon>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>

        <form action={createProject}>
          <input type="text" name="name" placeholder="Project Name" />
          <input
            type="text"
            name="description"
            placeholder="Project Description"
          />
          <button type="submit">Create Project</button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
