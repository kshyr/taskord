import { getPublicQueryClient } from "@/src/graphql/client.ts";
import { gql } from "graphql-request";
import { JWT } from "next-auth/jwt";
import { User } from "next-auth";

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
    ...res.refreshToken,
  };
}
