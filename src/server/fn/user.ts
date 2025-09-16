import { createServerFn } from '@tanstack/react-start'
import { getWebRequest } from '@tanstack/react-start/server'

import { auth } from '@/lib/auth/auth'

export const userQueryKey = ['auth', 'user'] as const

export const getUserFn = createServerFn({ method: 'GET' }).handler(async () => {
  const { headers } = getWebRequest()

  if (!headers) {
    return null
  }

  const session = await auth.api.getSession({ headers })

  return session?.user ?? null
})
