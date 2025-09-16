import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  server: {
    APP_ENV: z.string().min(1),
    DATABASE_URL: z.url().min(1),
    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_URL: z.string().min(1),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    GITHUB_CLIENT_ID: z.string().min(1),
    GITHUB_CLIENT_SECRET: z.string().min(1),
    UPLOADTHING_TOKEN: z.string().min(1),
    UPLOADTHING_SECRET: z.string().min(1),
    UPSTASH_REDIS_REST_URL: z.string().min(1),
    UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
    RESEND_MAIL_DOMAIN: z.string().min(1),
    PAYPAL_CLIENT_SECRET: z.string().min(1),
    PAYPAL_API_URL: z.string().min(1),
    STRIPE_SECRET_KEY: z.string().min(1),
    STRIPE_WEBHOOK_SECRET: z.string().min(1),
  },
  extends: [],
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
})
