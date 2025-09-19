import { createMiddleware } from '@tanstack/react-start'
import { getWebRequest } from '@tanstack/react-start/server'

import { auth } from '@/lib/auth/auth'
import { badRequest } from '@/lib/response'

import { UserRole } from '@/types'

export const authed = createMiddleware({ type: 'function' }).server(
  async ({ next }) => {
    const { headers } = getWebRequest()
    const session = await auth.api.getSession({
      headers,
      query: { disableCookieCache: true },
    })

    if (!session) {
      badRequest('Unauthorized', 401)
    }

    return await next({ context: { user: session.user } })
  },
)

export const adminOnly = createMiddleware({ type: 'function' }).server(
  async ({ next }) => {
    const { headers } = getWebRequest()
    const session = await auth.api.getSession({
      headers,
      query: { disableCookieCache: true },
    })

    if (!session) {
      badRequest('Unauthorized', 401)
    }

    if (session.user.role !== UserRole.Admin) {
      badRequest('Forbidden', 403)
    }

    return await next({ context: { user: session.user } })
  },
)
