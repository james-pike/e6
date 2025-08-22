import { QwikAuth$ } from "@auth/qwik";
import GitHub from "@auth/core/providers/github";

export const { onRequest, useSession, useSignIn, useSignOut } =
  QwikAuth$(() => ({
    secret: process.env.AUTH_SECRET,
    providers: [
      GitHub({ clientId: process.env.GITHUB_ID!, clientSecret: process.env.GITHUB_SECRET! })
    ]
  }));


