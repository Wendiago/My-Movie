import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      photo: string;
    };
    accessToken: string;
    refreshToken: string;
    error?: "RefreshTokenError";
  }

  interface User {
    id: string;
    email: string;
    name: string;
    photo: string;
    expiresAt: number;
    accessToken: string;
    refreshToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    name: string;
    photo: string;
    accessToken: string;
    expiresAt: number;
    refreshToken?: string;
    error?: "RefreshTokenError";
  }
}
