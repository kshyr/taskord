import type { Project, Task } from "@/src/types/types.ts";
import { DEFAULT_MEMO_OPTS, getQueryClient } from "@/src/graphql/client.ts";
import { gql } from "graphql-request";
import { getUserId } from "@/src/utils/auth.utils.ts";
import { memoize } from "nextjs-better-unstable-cache";

/* Project Queries */

type ProjectPreviewQuery = {
  projects: Project[];
};

export const getProjectPreviews = memoize(
  async () => {
    const client = await getQueryClient();
    const userId = await getUserId();

    const res: ProjectPreviewQuery = await client.request(
      gql`
        query projects($userId: UUID!) {
          projects(userId: $userId) {
            id
            name
            description
            createdAt
            updatedAt
            tasks {
              id
              name
              dueDate
              status
              priority
            }
          }
        }
      `,
      { userId },
    );

    return res.projects;
  },
  {
    ...DEFAULT_MEMO_OPTS,
    revalidateTags: ["projects"],
  },
);

export const getProjectNames = memoize(
  async (): Promise<{ id: string; name: string }[]> => {
    const client = await getQueryClient();
    const userId = await getUserId();

    const res: ProjectPreviewQuery = await client.request(
      gql`
        query projects($userId: UUID!) {
          projects(userId: $userId) {
            id
            name
          }
        }
      `,
      { userId },
    );

    return res.projects;
  },
  {
    ...DEFAULT_MEMO_OPTS,
    revalidateTags: ["projects"],
  },
);

export const getProjectById = memoize(
  async (id: string): Promise<Project> => {
    const client = await getQueryClient();

    const res: { projectById: Project } = await client.request(
      gql`
        query project($id: UUID!) {
          projectById(id: $id) {
            id
            name
            description
            createdAt
            updatedAt
            tags {
              id
              name
            }
            tasks {
              id
              name
              description
              status
              priority
              dueDate
            }
          }
        }
      `,
      { id },
    );

    return res.projectById;
  },
  {
    ...DEFAULT_MEMO_OPTS,
    revalidateTags: (id) => ["projects", id],
  },
);

/* Task Queries */

type TasksQuery = {
  tasks: Task[];
};

export const getAllTasks = memoize(
  async (): Promise<Task[]> => {
    const client = await getQueryClient();
    const userId = await getUserId();

    const res: TasksQuery = await client.request(
      gql`
        query tasks($userId: UUID!) {
          tasks(userId: $userId) {
            id
            name
            project {
              id
              name
            }
            description
            status
            priority
            dueDate
            createdAt
            updatedAt
          }
        }
      `,
      { userId },
    );

    return res.tasks;
  },
  { ...DEFAULT_MEMO_OPTS, revalidateTags: ["tasks"] },
);
