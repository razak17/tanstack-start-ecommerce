import {
  adminClient,
  anonymousClient,
  inferAdditionalFields,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import type { auth } from "./auth";
import { ac, admin, consumer } from "./permissions";
import { env } from "@/config/env";

export const authClient = createAuthClient({
  baseURL: env.VITE_APP_URL,
  plugins: [
    inferAdditionalFields<typeof auth>(),
    adminClient({
      ac,
      roles: {
        admin,
        consumer,
      },
      defaultRole: "consumer",
    }),
    anonymousClient(),
  ],
});
