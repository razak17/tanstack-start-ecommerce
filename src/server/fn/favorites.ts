import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import { authed } from '../middlewares/auth'
import { toggleFavorite } from '../mutations/favorites'

export const toggleFavoriteFn = createServerFn({ method: 'POST' })
  .validator(z.object({ productId: z.string() }))
  .middleware([authed])
  .handler(async ({ data: { productId }, context: { user } }) => {
    return await toggleFavorite(productId, user.id)
  })
