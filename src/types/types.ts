enum Status {
  OPEN,
  IN_PROGRESS,
  CLOSED,
}

enum Priority {
  LOW,
  MEDIUM,
  HIGH,
}

export type Task = {
  id: string;
  name: string;
  project?: Project;
  description?: string;
  status: Status;
  priority: Priority;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  coverImageUrl?: string;
  tags?: string[];
  tasks?: Task[];
  createdAt: string;
  updatedAt: string;
};
