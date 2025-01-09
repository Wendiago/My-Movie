import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { jwtDecode } from "jwt-decode";

import {
  INVALID_LOGIN_ERROR_MESSAGE,
  ACCOUNT_NOT_VERIFIED_ERROR_MESSAGE,
  Providers,
  HttpStatus,
  ErrorCode,
} from "@/constants/data";
import { ApiResponse, LoginReponse } from "@/types/auth";
import { customFetch } from "./lib/api-client";

class AccountNotVerifiedError extends CredentialsSignin {
  code = ACCOUNT_NOT_VERIFIED_ERROR_MESSAGE;
}

class InvalidLoginError extends CredentialsSignin {
  code = INVALID_LOGIN_ERROR_MESSAGE;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          const response = await customFetch.post<ApiResponse<LoginReponse>>(
            "/api/v1/auth/login",
            {
              email,
              password,
            }
          );

          // If the response does not contain the user data, throw an error
          if (!response.data) {
            throw new CredentialsSignin();
          }

          const { user, accessToken, refreshToken } = response.data;
          const decodedToken = jwtDecode<any>(accessToken);
          const expiresAt = decodedToken?.exp;

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            photo: user.photo,
            accessToken,
            refreshToken,
            expiresAt,
          };
        } catch (error: any) {
          const { status, code } = error?.json || {};

          if (status === HttpStatus.CONFLICT) {
            if (code === ErrorCode.ACCOUNT_NOT_VERIFIED) {
              throw new AccountNotVerifiedError();
            } else if (
              code === ErrorCode.EMAIL_NOT_FOUND ||
              code === ErrorCode.INCORRECT_PASSWORD
            ) {
              throw new InvalidLoginError();
            }
          }

          throw error;
        }
      },
    }),
    Google,
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === Providers.Google) {
        try {
          const response = await customFetch.post<ApiResponse<LoginReponse>>(
            "/api/v1/auth/google/auth",
            {
              id_token: account.id_token,
            }
          );

          // If the response does not contain the user data, throw an error
          if (!response.data) {
            throw new CredentialsSignin();
          }

          const { accessToken, refreshToken } = response.data;
          const decodedToken = jwtDecode<any>(accessToken);
          const expiresAt = decodedToken?.exp;

          // Update the user object with the response from the backend API
          user.id = response.data.user.id;
          user.email = response.data.user.email;
          user.name = response.data.user.name;
          user.photo = response.data.user.photo;
          user.accessToken = accessToken;
          user.refreshToken = refreshToken;
          user.expiresAt = expiresAt;
        } catch (error) {
          console.error("Failed to call backend API:", error);
          return false; // Return false to indicate sign in failure
        }
      }
      return true; // Return true to indicate sign in success
    },
    async jwt({ token, user }) {
      if (user) {
        // First-time login, save the `accessToken`, its expiry and the `refreshToken`
        token.id = user.id as string;
        token.email = user.email as string;
        token.name = user.name;
        token.photo = user.photo as string;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.expiresAt = user.expiresAt;
      } else if (Date.now() < token.expiresAt * 1000) {
        // Subsequent logins, but the `access_token` is still valid
        return token;
      } else {
        // Subsequent logins, but the `access_token` has expired, try to refresh it
        if (!token.refreshToken) throw new TypeError("Missing refresh_token");

        try {
          const headers = {
            Authorization: `Bearer ${token.accessToken}`,
            "x-client-id": token.id,
          };

          const response = await customFetch.post<ApiResponse<LoginReponse>>(
            "/api/v1/auth/invoke-new-tokens",
            {
              refreshToken: token.refreshToken,
            },
            {
              headers: headers,
            }
          );

          if (response.data) {
            const { accessToken, refreshToken } = response.data;
            const decodedToken = jwtDecode<any>(accessToken);
            const expiresAt = decodedToken?.exp;

            token.accessToken = accessToken;
            token.refreshToken = refreshToken;
            token.expiresAt = expiresAt;
          }

          return token;
        } catch (error: any) {
          token.error = "RefreshTokenError";
          return token;
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.name = token.name as string;
      session.user.photo = token.photo as string;
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      session.error = token.error;
      return session;
    },
  },
});
