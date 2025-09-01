import { QwikAuth$ } from "@auth/qwik";
import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import Credentials from "@auth/core/providers/credentials";

export const { onRequest, useSession, useSignIn, useSignOut } =
  QwikAuth$(() => ({
    secret: process.env.AUTH_SECRET,
    providers: [
      // GitHub OAuth
      GitHub({
        clientId: process.env.GITHUB_ID!,
        clientSecret: process.env.GITHUB_SECRET!,
      }),
      // Google OAuth
      Google({
        clientId: process.env.GOOGLE_ID!,
        clientSecret: process.env.GOOGLE_SECRET!,
      }),
      // Custom username/password credentials
      Credentials({
        name: "Credentials",
        credentials: {
          username: { label: "Username", type: "text" },
          password: { label: "Password", type: "password" },
        },
        authorize: async (credentials) => {
          // Replace this with your own auth logic
          if (
            credentials?.username === "admin" &&
            credentials?.password === "secret123"
          ) {
            return { id: "1", name: "Admin User" };
          }
          return null;
        },
      }),
    ],
    // Optional: session settings, callbacks, etc.
  }));
