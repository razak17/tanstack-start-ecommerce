import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import { authenticatedMiddleware } from './middleware'
import { toggleFavorite } from '../data-access/favorites'

export const toggleFavoriteFn = createServerFn({ method: 'POST' })
  .validator(z.object({ productId: z.string() }))
  .middleware([authenticatedMiddleware])
  .handler(async ({ data, context }) => {
    return await toggleFavorite(data.productId, context.userId as string)
  })
