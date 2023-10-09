import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import request, { gql } from "graphql-request";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const { username, password } = credentials;

        let res: any;
        try {
          res = await request(
            process.env.DEV_API_URL as string,
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
