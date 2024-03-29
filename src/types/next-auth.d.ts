//@ts-ignore
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
      avatarUrl: string;
      createdAt: Date;
      updatedAt: Date;
      accessToken: {
        token: string;
        expiresIn: Date;
      };
      refreshToken: string;
    };
  }
}

//@ts-ignore
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    email: string;
    avatarUrl: string;
    createdAt: Date;
    updatedAt: Date;
    accessToken: {
      token: string;
      expiresIn: Date;
    };
    refreshToken: string;
  }
}
