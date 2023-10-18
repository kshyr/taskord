import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  refreshToken as refreshTokenMutation,
  authorize,
} from "@/src/graphql/mutations";
import { JWT } from "next-auth/jwt";

async function refreshToken(token: JWT): Promise<JWT> {
  let res;
  try {
    res = await refreshTokenMutation(token);
  } catch (e) {
    console.error(e);
    return token;
  }
  return res;
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

        let res;
        try {
          res = await authorize(username, password);
        } catch (e) {
          console.error(e);
          return null;
        }
        return res;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...user, ...token };
      }

      if (new Date() < token.accessToken.expiresIn) {
        return token;
      }

      return await refreshToken(token);
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },

  pages: {
    signIn: "/signin",
    signOut: "/signout",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
