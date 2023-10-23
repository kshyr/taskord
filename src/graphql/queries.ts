import type { Project, Task } from "@/src/types/types.ts";
import { DEFAULT_MEMO_OPTS, getQueryClient } from "@/src/graphql/client.ts";
import { gql } from "graphql-request";
import { getUserId } from "@/src/utils/auth.utils.ts";
import { memoize } from "nextjs-better-unstable-cache";
import { Session } from "next-auth";

/* Project Queries */

type ProjectPreviewQuery = {
  projects: Project[];
};

export const getProjectPreviews = memoize(
  async (session: Session) => {
    const client = await getQueryClient(session);
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
  async (session: Session): Promise<{ id: string; name: string }[]> => {
    const client = await getQueryClient(session);
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
  async (session: Session, id: string): Promise<Project | null> => {
    const client = await getQueryClient(session);

    const projects = await getProjectPreviews(session);

    if (!projects.find((project) => project.id === id)) {
      return null;
    }

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
    revalidateTags: (_, id) => ["projects", id],
  },
);

/* Task Queries */

type TasksQuery = {
  tasks: Task[];
};

export const getAllTasks = memoize(
  async (session: Session): Promise<Task[]> => {
    const client = await getQueryClient(session);
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
