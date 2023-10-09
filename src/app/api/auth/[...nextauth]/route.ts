import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { gql } from "graphql-request";
import { getPublicQueryClient } from "@/src/graphql/client";

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
                  token
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
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
