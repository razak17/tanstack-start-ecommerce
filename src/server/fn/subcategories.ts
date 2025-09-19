import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import { createSubcategorySchema } from '@/lib/validations/subcategories'

import {
  getAllSubcategories,
  getSubcategoryById,
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
