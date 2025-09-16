import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import {
  getFeaturedProducts,
  getProductCountByCategory,
} from '../data-access/products'

export const getFeaturedProductsFn = createServerFn({ method: 'GET' })
  .validator(
    z.object({
      currentUserId: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    return await getFeaturedProducts(data.currentUserId)
  })

export const getProductCountByCategoryFn = createServerFn({ method: 'GET' })
  .validator(
    z.object({
      categoryId: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    return await getProductCountByCategory(data.categoryId)
  })
