import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import { createCategorySchema } from '@/lib/validations/categories'

import {
  getAllCategories,
  getCategoryById,
  getFeaturedCategories,
} from '../data-access/categories'
import { adminOnly } from '../middlewares/auth'
import {
  addCategory,
  deleteCategory,
  updateCategory,
} from '../mutations/categories'

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

export const addCategoryFn = createServerFn({ method: 'POST' })
  .validator(createCategorySchema)
  .middleware([adminOnly])
  .handler(async ({ data }) => {
    return await addCategory(data)
  })

export const updateCategoryFn = createServerFn({ method: 'POST' })
  .validator(
    z.object({
      id: z.string(),
      data: createCategorySchema,
    }),
  )
  .middleware([adminOnly])
  .handler(async ({ data: { id, data } }) => {
    const existingCategory = await getCategoryById(id)
    if (!existingCategory) {
      throw new Error('Category not found')
    }
    return await updateCategory(id, data)
  })

export const deleteCategoryFn = createServerFn({ method: 'POST' })
  .validator(z.object({ id: z.string() }))
  .middleware([adminOnly])
  .handler(async ({ data: { id } }) => {
    const existingCategory = await getCategoryById(id)
    if (!existingCategory) {
      throw new Error('Category not found')
    }
    return await deleteCategory(id)
  })
