import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import {
  getUserFavorites,
  getUserFavoritesCount,
} from '../data-access/favorites'
import { authed } from '../middlewares/auth'
import { toggleFavorite } from '../mutations/favorites'

export const toggleFavoriteFn = createServerFn({ method: 'POST' })
  .validator(z.object({ productId: z.string() }))
  .middleware([authed])
  .handler(async ({ data: { productId }, context: { user } }) => {
    return await toggleFavorite(productId, user.id)
  })

export const getUserFavoritesFn = createServerFn({ method: 'GET' })
  .validator(z.object({ userId: z.string().optional() }))
  .handler(async ({ data: { userId } }) => {
    if (!userId) return []
    return await getUserFavorites(userId)
  })

export const getUserFavoritesCountFn = createServerFn({ method: 'GET' })
  .middleware([authed])
  .handler(async ({ context: { user } }) => {
    return await getUserFavoritesCount(user.id)
  })
