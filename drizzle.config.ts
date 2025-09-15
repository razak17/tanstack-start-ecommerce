import { defineConfig } from 'drizzle-kit'

import { env } from '@/lib/env/server'

export default defineConfig({
  schema: './src/server/db/schema',
  out: './.drizzle',
  dialect: 'postgresql',
  strict: true,
  verbose: true,
  dbCredentials: { url: env.DATABASE_URL },
})
