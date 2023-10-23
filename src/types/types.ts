export enum StatusValue {
  BACKLOG,
  TODO,
  IN_PROGRESS,
  DONE,
  CANCELED,
}

export enum PriorityValue {
  LOW,
  MEDIUM,
  HIGH,
}

export type Task = {
  id: string;
  name: string;
  project?: Project;
  description?: string;
  status: StatusValue;
  priority: PriorityValue;
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
