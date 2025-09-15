import { defineConfig } from 'drizzle-kit'

import { env } from '@/lib/env/server'

export default defineConfig({
  schema: './src/db/schema',
  out: './src/db/migrations',
  dialect: 'postgresql',
  strict: true,
  verbose: true,
  dbCredentials: { url: env.DATABASE_URL },
})
