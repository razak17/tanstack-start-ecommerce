import { eq } from 'drizzle-orm'
import type { z } from 'zod'

import { getErrorMessage } from '@/lib/handle-error'
import type { updateProfileSchema } from '@/lib/validations/auth'

import { db } from '@/server/db'
import { type User, user } from '@/server/db/schema'

export async function updateProfile(
  userId: User['id'],
  input: z.infer<typeof updateProfileSchema>,
) {
  try {
    await db
      .update(user)
      .set({
        ...input,
        name: `${input.firstName} ${input.lastName}`,
      })
      .where(eq(user.id, userId))

    return {
      success: true,
      error: null,
    }
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    }
  }
}
