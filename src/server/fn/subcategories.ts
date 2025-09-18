import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import { createSubcategorySchema } from '@/lib/validations/subcategories'

import { UserRole } from '@/types'
import {
  getAllSubcategories,
  getSubcategoryById,
} from '../data-access/subcategories'
import { authed } from '../middlewares/auth'
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
  .middleware([authed])
  .handler(async ({ data, context: { user } }) => {
    if (user.role !== UserRole.Admin) {
      throw new Error('You do not have permission to add a product')
    }
    return await addSubcategory(data)
  })

export const updateSubcategoryFn = createServerFn({ method: 'POST' })
  .middleware([authed])
  .validator(
    z.object({
      id: z.string(),
      data: createSubcategorySchema,
    }),
  )
  .handler(async ({ data: { id, data }, context: { user } }) => {
    const existingSubcategory = await getSubcategoryById(id)
    if (!existingSubcategory) {
      throw new Error('Subcategory not found')
    }
    if (user.role !== UserRole.Admin) {
      throw new Error('You do not have permission to add a product')
    }
    return await updateSubcategory(id, data)
  })

export const deleteSubcategoryFn = createServerFn({ method: 'POST' })
  .validator(z.object({ id: z.string() }))
  .middleware([authed])
  .handler(async ({ data: { id }, context: { user } }) => {
    const existingSubcategory = await getSubcategoryById(id)
    if (!existingSubcategory) {
      throw new Error('Subcategory not found')
    }
    if (user.role !== UserRole.Admin) {
      throw new Error('You do not have permission to delete a product')
    }
    return await deleteSubcategory(id)
  })
