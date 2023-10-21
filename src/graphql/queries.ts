import type { Project } from "@/src/types/types.ts";
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

export const getProjectNameById = async (id: string) => {
  const client = await getQueryClient();
  const userId = await getUserId();

  const res: ProjectPreviewQuery = await client.request(
    gql`
      query project($id: UUID!) {
        projects(userId: $id) {
          name
        }
      }
    `,
    { userId },
  );

  return res.projects[0].name;
};