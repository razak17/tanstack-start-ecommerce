import { useSuspenseQuery } from '@tanstack/react-query'
import {
  adminClient,
  anonymousClient,
  inferAdditionalFields,
} from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'

import { env } from '@/lib/env/client'

import type { auth } from './auth'
import { ac, admin, consumer } from './permissions'
import { userQueryOptions } from '@/server/queries/users'

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
  const { data: user } = useSuspenseQuery(userQueryOptions())

  return { user, isAuthenticated: !!user }
}

export const useAuthenticatedUser = () => {
  const { user } = useAuthentication()

  if (!user) {
    throw new Error('User is not authenticated!')
  }

  return user
}
