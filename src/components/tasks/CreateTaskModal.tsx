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

type CreateTaskModalProps = {
  createTask: (formData: FormData) => void;
  projects: { id: string; name: string }[];
};

export default function CreateTaskModal({
  createTask,
  projects,
}: CreateTaskModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <ButtonWithIcon
          icon={<Plus size={20} />}
          variant="secondary"
          className="ml-auto gap-1"
        >
          New Task
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

        <form action={createTask}>
          <input type="text" name="name" placeholder="Task Name" />
          <input
            type="text"
            name="description"
            placeholder="Task Description"
          />
          <select name="projectId">
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="priority"
            placeholder="Priority"
            defaultValue={0}
          />
          <input
            type="number"
            name="status"
            placeholder="Status"
            defaultValue={0}
          />
          <input type="datetime-local" name="dueDate" placeholder="Due Date" />
          <button type="submit">Create Task</button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
