import { getPublicQueryClient, getQueryClient } from "@/src/graphql/client.ts";
import { gql } from "graphql-request";
import { JWT } from "next-auth/jwt";
import { User } from "next-auth";
import { getUserId } from "@/src/utils/auth.utils.ts";
import { Task } from "@/src/types/types.ts";

/* Auth Mutations */

type AuthorizeMutation = {
  authorize: User;
};

export async function authorize(username: string, password: string) {
  const client = getPublicQueryClient();
  const res: AuthorizeMutation = await client.request(
    gql`
      mutation login($username: String!, $password: String!) {
        authorize(username: $username, password: $password) {
          id
          username
          email
          createdAt
          updatedAt
          accessToken {
            token
            expiresIn
          }
          refreshToken
        }
      }
    `,
    { username, password },
  );

  return res.authorize;
}

type RegisterMutation = {
  register: {
    createdAt: Date;
  };
};

export async function register(
  email: string,
  username: string,
  password: string,
) {
  const client = getPublicQueryClient();
  const res: RegisterMutation = await client.request(
    gql`
      mutation register(
        $email: String!
        $username: String!
        $password: String!
      ) {
        register(email: $email, username: $username, password: $password) {
          createdAt
        }
      }
    `,
    {
      email,
      username,
      password,
    },
  );

  return res.register;
}

type RefreshTokenMutation = {
  refreshToken: {
    token: string;
    expiresIn: Date;
  };
};

export async function refreshToken(token: JWT): Promise<JWT> {
  const client = getPublicQueryClient();
  client.setHeader("authorization", "Refresh " + token.refreshToken);

  let res: RefreshTokenMutation = await client.request(
    gql`
      mutation refreshToken {
        refreshToken {
          token
          expiresIn
        }
      }
    `,
    { refreshToken: token.refreshToken },
  );

  return {
    ...token,
    accessToken: {
      token: res.refreshToken.token,
      expiresIn: res.refreshToken.expiresIn,
    },
  };
}

/* Project Mutations */

type CreateProjectMutation = {
  createProject: {
    name: string;
    description: string;
  };
};

type CreateProjectInput = {
  name: string;
  description: string;
};

export async function createProject({
  name,
  description,
}: CreateProjectInput): Promise<{ name: string; description: string }> {
  const client = await getQueryClient();
  const userId = await getUserId();
  const res: CreateProjectMutation = await client.request(
    gql`
      mutation createProject(
        $name: String!
        $description: String!
        $userId: UUID!
      ) {
        createProject(name: $name, description: $description, userId: $userId) {
          name
          description
        }
      }
    `,
    {
      name,
      description,
      userId,
    },
  );

  return res.createProject;
}

export async function deleteProject(id: string) {
  const client = await getQueryClient();
  const userId = await getUserId();
  await client.request(
    gql`
      mutation deleteProject($id: UUID!) {
        deleteProject(id: $id) {
          id
        }
      }
    `,
    { id },
  );
}

/* Task Mutations */

type CreateTaskInput = {
  name: string;
  description?: string;
  projectId?: string;
  priority: number;
  status: number;
  dueDate?: Date;
};

export const createTask = async ({
  name,
  description,
  projectId,
  priority,
  status,
  dueDate,
}: CreateTaskInput): Promise<Task> => {
  const client = await getQueryClient();
  const userId = await getUserId();
  const res: { createTask: Task } = await client.request(
    gql`
      mutation createTask(
        $name: String!
        $description: String
        $userId: UUID!
        $projectId: UUID
        $priority: Int!
        $status: Int!
        $dueDate: DateTime
      ) {
        createTask(
          name: $name
          description: $description
          userId: $userId
          projectId: $projectId
          priority: $priority
          status: $status
          dueDate: $dueDate
        ) {
          name
          description
          project {
            id
            name
          }
          priority
          status
          dueDate
          createdAt
          updatedAt
        }
      }
    `,
    {
      name,
      description,
      userId,
      projectId,
      priority,
      status,
      dueDate,
    },
  );

  return res.createTask;
};

export const deleteTask = async (id: string) => {
  const client = await getQueryClient();
  const userId = await getUserId();
  await client.request(
    gql`
      mutation deleteTask($id: UUID!) {
        deleteTask(id: $id) {
          id
        }
      }
    `,
    { id },
  );
};
