import { and, eq } from 'drizzle-orm'

import { db } from '@/server/db'
import { favorites, type Product } from '@/server/db/schema'

export async function toggleFavorite(productId: Product['id'], userId: string) {
  const existingFavorite = await db.query.favorites.findFirst({
    where: and(
      eq(favorites.userId, userId),
      eq(favorites.productId, productId),
    ),
  })

  if (existingFavorite) {
    await db
      .delete(favorites)
      .where(
        and(eq(favorites.userId, userId), eq(favorites.productId, productId)),
      )
  } else {
    await db.insert(favorites).values({
      userId: userId,
      productId,
    })
  }

  return {
    success: true,
    isFavorited: !existingFavorite,
    error: null,
  }
}
