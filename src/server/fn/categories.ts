import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import {
  getAllCategories,
  getFeaturedCategories,
} from '../data-access/categories'

export const getFeaturedCategoriesFn = createServerFn({ method: 'GET' })
  .validator(
    z.object({
      limit: z.number().optional().default(4),
    }),
  )
  .handler(async ({ data }) => {
    return await getFeaturedCategories(data.limit)
  })

export const getAllCategoriesFn = createServerFn({ method: 'GET' }).handler(
  async () => {
    return await getAllCategories()
  },
)
