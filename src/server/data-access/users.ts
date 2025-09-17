import { desc, eq } from 'drizzle-orm'

import { db } from '@/server/db'
import { type User, user } from '@/server/db/schema'

export const getAllUsers = async () => {
  const users = await db.query.user.findMany({
    orderBy: desc(user.createdAt),
  })

  return users
}

export const getUser = async (userId: User['id']) => {
  const foundUser = await db.query.user.findFirst({
    where: eq(user.id, userId),
  })

  return foundUser
}
