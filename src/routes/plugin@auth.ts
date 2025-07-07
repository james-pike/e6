import { QwikAuth$ } from "@auth/qwik";
import Twitter from "@auth/qwik/providers/twitter";
import Credentials from "@auth/qwik/providers/credentials";

export const { onRequest, useSession, useSignIn, useSignOut } = QwikAuth$(
  () => ({
    providers: [
      Twitter,
      Credentials({
        async authorize(credentials) {
          // Set your admin username and password here
          const adminUsername = "admin";
          const adminPassword = "Earthen";
          if (
            credentials.username === adminUsername &&
            credentials.password === adminPassword
          ) {
            return {
              id: "admin",
              name: "Admin User",
              email: "admin@example.com",
            };
          }
          return null;
        },
        credentials: {
          username: { label: "Username", type: "text" },
          password: { label: "Password", type: "password" },
        },
      }),
    ],
  }),
);
