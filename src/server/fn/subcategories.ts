import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import {
  createSubcategorySchema,
  getSubcategoriesSchema,
} from '@/lib/validations/subcategories'

import {
  getAllSubcategories,
  getSubcategories,
  getSubcategoriesByCategory,
  getSubcategoryById,
  getSubcategoryBySlug,
  getSubcategorySlugFromId,
} from '../data-access/subcategories'
import { adminOnly } from '../middlewares/auth'
import {
  addSubcategory,
  deleteSubcategory,
  updateSubcategory,
} from '../mutations/subcategories'

export const getAllSubcategoriesFn = createServerFn({ method: 'GET' }).handler(
  async () => {
    return await getAllSubcategories()
  },
)

export const addSubcategoryFn = createServerFn({ method: 'POST' })
  .validator(createSubcategorySchema)
  .middleware([adminOnly])
  .handler(async ({ data }) => {
    return await addSubcategory(data)
  })

export const updateSubcategoryFn = createServerFn({ method: 'POST' })
  .middleware([adminOnly])
  .validator(
    z.object({
      id: z.string(),
      data: createSubcategorySchema,
    }),
  )
  .handler(async ({ data: { id, data } }) => {
    const existingSubcategory = await getSubcategoryById(id)
    if (!existingSubcategory) {
      throw new Error('Subcategory not found')
    }
    return await updateSubcategory(id, data)
  })

export const deleteSubcategoryFn = createServerFn({ method: 'POST' })
  .validator(z.object({ id: z.string() }))
  .middleware([adminOnly])
  .handler(async ({ data: { id } }) => {
    const existingSubcategory = await getSubcategoryById(id)
    if (!existingSubcategory) {
      throw new Error('Subcategory not found')
    }
    return await deleteSubcategory(id)
  })

export const getSubcategoriesFn = createServerFn({ method: 'GET' })
  .validator(getSubcategoriesSchema)
  .handler(async ({ data }) => {
    return await getSubcategories(data)
  })

export const getSubcategoriesByCategoryFn = createServerFn({ method: 'GET' })
  .validator(z.object({ categoryId: z.string() }))
  .handler(async ({ data: { categoryId } }) => {
    return await getSubcategoriesByCategory(categoryId)
  })

export const getSubcategorySlugFromIdFn = createServerFn({ method: 'GET' })
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data: { id } }) => {
    return await getSubcategorySlugFromId(id)
  })

export const getSubcategoryByIdFn = createServerFn({ method: 'GET' })
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data: { id } }) => {
    const subcategory = await getSubcategoryById(id)
    return subcategory
  })

export const getSubcategoryBySlugFn = createServerFn({ method: 'GET' })
  .validator(z.object({ slug: z.string() }))
  .handler(async ({ data: { slug } }) => {
    console.warn('DEBUGPRINT[1260]: subcategories.ts:92: slug=', slug)
    const subcategory = await getSubcategoryBySlug(slug)
    return subcategory
  })
