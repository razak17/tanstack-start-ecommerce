import { createServerFn } from '@tanstack/react-start'
import { getWebRequest } from '@tanstack/react-start/server'

import { auth } from '@/lib/auth/auth'
import { updateProfileSchema } from '@/lib/validations/auth'

import { getUserById } from '../data-access/users'
import { authed } from '../middlewares/auth'
import { updateProfile } from '../mutations/users'

export const userQueryKey = ['auth', 'user'] as const

export const getUserFn = createServerFn({ method: 'GET' }).handler(async () => {
  const { headers } = getWebRequest()

  if (!headers) {
    return null
  }

  const session = await auth.api.getSession({ headers })

  return session?.user ?? null
})

export const updateProfileFn = createServerFn({ method: 'POST' })
  .validator(updateProfileSchema)
  .middleware([authed])
  .handler(async ({ data, context: { user } }) => {
    const existingUser = await getUserById(user.id)
    if (!existingUser) {
      throw new Error('User not found')
    }
    return await updateProfile(user.id, data)
  })
