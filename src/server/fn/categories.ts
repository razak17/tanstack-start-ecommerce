import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import { createCategorySchema } from '@/lib/validations/categories'

import { UserRole } from '@/types'
import {
  getAllCategories,
  getCategoryById,
  getFeaturedCategories,
} from '../data-access/categories'
import { authed } from '../middlewares/auth'
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
  .middleware([authed])
  .handler(async ({ data, context: { user } }) => {
    if (user.role !== UserRole.Admin) {
      throw new Error('You do not have permission to add a product')
    }
    return await addCategory(data)
  })

export const updateCategoryFn = createServerFn({ method: 'POST' })
  .middleware([authed])
  .validator(
    z.object({
      id: z.string(),
      data: createCategorySchema,
    }),
  )
  .handler(async ({ data: { id, data }, context: { user } }) => {
    const existingCategory = await getCategoryById(id)
    if (!existingCategory) {
      throw new Error('Category not found')
    }
    if (user.role !== UserRole.Admin) {
      throw new Error('You do not have permission to add a product')
    }
    return await updateCategory(id, data)
  })

export const deleteCategoryFn = createServerFn({ method: 'POST' })
  .validator(z.object({ id: z.string() }))
  .middleware([authed])
  .handler(async ({ data: { id }, context: { user } }) => {
    const existingCategory = await getCategoryById(id)
    if (!existingCategory) {
      throw new Error('Category not found')
    }
    if (user.role !== UserRole.Admin) {
      throw new Error('You do not have permission to add a product')
    }
    return await deleteCategory(id)
  })
