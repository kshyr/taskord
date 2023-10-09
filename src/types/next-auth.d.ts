//@ts-ignore
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      username: string;
      email: string;
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
    user: {
      id: number;
      username: string;
      email: string;
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
