import { useQuery } from '@tanstack/react-query'
import {
  adminClient,
  anonymousClient,
  inferAdditionalFields,
} from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'

import { env } from '@/lib/env/client'

import type { auth } from './auth'
import { ac, admin, consumer } from './permissions'
import { authQueries } from '@/server/queries/auth'

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
      defaultRole: 'consumer',
    }),
    anonymousClient(),
  ],
})

export const useAuthentication = () => {
  const { data: userSession } = useQuery(authQueries.user())

  return { userSession, isAuthenticated: !!userSession }
}

export const useAuthenticatedUser = () => {
  const { userSession } = useAuthentication()

  if (!userSession) {
    throw new Error('User is not authenticated!')
  }

  return userSession
}
