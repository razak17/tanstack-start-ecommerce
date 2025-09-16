import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import { toggleFavorite } from '../data-access/favorites'
import { authed } from '../middlewares/auth'

export const toggleFavoriteFn = createServerFn({ method: 'POST' })
  .validator(z.object({ productId: z.string() }))
  .middleware([authed])
  .handler(async ({ data: { productId }, context: { user } }) => {
    return await toggleFavorite(productId, user.id)
  })
