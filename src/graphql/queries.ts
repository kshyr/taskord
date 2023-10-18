import type { Project } from "@/src/types/types.ts";
import { getQueryClient } from "@/src/graphql/client.ts";
import { gql } from "graphql-request";

/* Project Queries */

type ProjectPreviewQuery = {
  projects: Project[];
};

export async function getProjectPreviews(userId: string) {
  const client = await getQueryClient();
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
}
