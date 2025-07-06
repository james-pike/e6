import { QwikAuth$ } from "@auth/qwik";
import Twitter from "@auth/qwik/providers/twitter";

export const { onRequest, useSession, useSignIn, useSignOut } = QwikAuth$(
  () => ({
    providers: [Twitter],
  }),
);
