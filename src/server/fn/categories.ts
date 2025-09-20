import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import {
  createCategorySchema,
  getCategoriesSchema,
} from '@/lib/validations/categories'

import {
  getAllCategories,
  getCategories,
  getCategoryById,
  getCategoryBySlug,
  getCategorySlugFromId,
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

export const getCategoriesFn = createServerFn({ method: 'GET' })
  .validator(getCategoriesSchema)
  .handler(async ({ data }) => {
    return await getCategories(data)
  })

export const getCategoryByIdFn = createServerFn({ method: 'GET' })
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data: { id } }) => {
    const category = await getCategoryById(id)
    if (!category) {
      throw new Error('Category not found')
    }
    return category
  })

export const getCategorySlugFromIdFn = createServerFn({ method: 'GET' })
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data: { id } }) => {
    const slug = await getCategorySlugFromId({ id })
    if (!slug) {
      throw new Error('Category not found')
    }
    return slug
  })

export const getCategoryBySlugFn = createServerFn({ method: 'GET' })
  .validator(z.object({ slug: z.string() }))
  .handler(async ({ data: { slug } }) => {
    const category = await getCategoryBySlug(slug)
    if (!category) {
      throw new Error('Category not found')
    }
    return category
  })
