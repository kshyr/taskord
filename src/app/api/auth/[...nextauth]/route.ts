import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { gql, GraphQLClient } from "graphql-request";
import { apiUrl, getPublicQueryClient } from "@/src/graphql/client";
import { JWT } from "next-auth/jwt";

async function refreshToken(token: JWT): Promise<JWT> {
  const graphQLClient = new GraphQLClient(apiUrl, {
    headers: {
      authorization: "Refresh " + token.user.accessToken.token,
    },
  });

  let res: any;

  try {
    res = await graphQLClient.request(
      gql`
        mutation refreshToken {
          refreshToken {
            token
            expiresIn
          }
        }
      `,
      { refreshToken: token.user.refreshToken },
    );
  } catch (e) {
    return token;
  }

  if (res.errors) {
    return token;
  } else {
    return res.refreshToken;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const { username, password } = credentials;

        let res: any;
        const graphQLClient = getPublicQueryClient();

        try {
          res = await graphQLClient.request(
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
        } catch (e) {
          return null;
        }

        if (res.errors) {
          return null;
        } else {
          return res.authorize;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      console.log(token.user);
      if (user) {
        return { ...token, ...user };
      }

      if (new Date() < token.user.accessToken.expiresIn) {
        return token;
      }

      return await refreshToken(token);
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
