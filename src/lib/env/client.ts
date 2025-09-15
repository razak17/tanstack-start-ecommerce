import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  clientPrefix: 'VITE_',
  client: {
    VITE_APP_URL: z.url(),
    VITE_SERVER_URL: z.string().min(1),
    VITE_APP_ENV: z.enum(['development', 'test', 'production']),
    VITE_PAYPAL_CLIENT_ID: z.string().min(1),
    VITE_STRIPE_PUBLISHABLE_KEY: z.string().min(1),
  },
  extends: [],
  runtimeEnv: import.meta.env,
  emptyStringAsUndefined: true,
})
