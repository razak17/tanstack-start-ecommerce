import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import { createProductSchema } from '@/lib/validations/products'

import type { StoredFile } from '@/types'
import {
  getAllProducts,
  getFeaturedProducts,
  getProductById,
  getProductCountByCategory,
  getProductWithVariants,
} from '../data-access/products'
import { adminOnly } from '../middlewares/auth'
import { addProduct, deleteProduct, updateProduct } from '../mutations/products'

export const getFeaturedProductsFn = createServerFn({ method: 'GET' })
  .validator(
    z.object({
      currentUserId: z.string().optional(),
    }),
  )
  .handler(async ({ data: { currentUserId } }) => {
    return await getFeaturedProducts(currentUserId)
  })

export const getProductCountByCategoryFn = createServerFn({ method: 'GET' })
  .validator(z.object({ categoryId: z.string() }))
  .handler(async ({ data: { categoryId } }) => {
    return await getProductCountByCategory(categoryId)
  })

export const getAllProductsFn = createServerFn({ method: 'GET' })
  .middleware([adminOnly])
  .handler(async () => {
    return await getAllProducts()
  })

export const getProductWithVariantsFn = createServerFn({ method: 'GET' })
  .validator(
    z.object({
      productId: z.string(),
    }),
  )
  .handler(async ({ data: { productId } }) => {
    const product = await getProductWithVariants(productId)
    if (!product) {
      throw new Error('Product not found')
    }
    return product
  })

export const addProductFn = createServerFn({ method: 'POST' })
  .validator(
    z.object({
      ...createProductSchema.omit({ images: true }).shape,
      images: z.custom<StoredFile[]>(),
    }),
  )
  .middleware([adminOnly])
  .handler(async ({ data }) => {
    return await addProduct(data)
  })

export const updateProductFn = createServerFn({ method: 'POST' })
  .validator(
    z.object({
      id: z.string(),
      data: z.object({
        ...createProductSchema.omit({ images: true }).shape,
        images: z.custom<StoredFile[]>(),
      }),
    }),
  )
  .middleware([adminOnly])
  .handler(async ({ data: { id, data } }) => {
    const existingProduct = await getProductById(id)
    if (!existingProduct) {
      throw new Error('Product not found')
    }
    return await updateProduct(id, data)
  })

export const deleteProductFn = createServerFn({ method: 'POST' })
  .validator(z.object({ id: z.string() }))
  .middleware([adminOnly])
  .handler(async ({ data: { id } }) => {
    const existingProduct = await getProductById(id)
    if (!existingProduct) {
      throw new Error('Product not found')
    }
    return await deleteProduct(id)
  })
