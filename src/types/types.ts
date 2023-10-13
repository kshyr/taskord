export type Task = {
  id: number;
  name: string;
  description: string;
  status: "open" | "in_progress" | "closed";
  dueDate: string;
  createdAt: string;
  updatedAt: string;
};

export type Project = {
  id: number;
  name: string;
  description: string;
  coverImageUrl?: string;
  category: string;
  tags: string[];
  tasks: Task[];
  createdAt: string;
  updatedAt: string;
};
