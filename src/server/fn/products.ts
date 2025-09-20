import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import {
  createProductSchema,
  updateProductRatingSchema,
} from '@/lib/validations/products'

import type { SearchParams, StoredFile } from '@/types'
import {
  getAllProducts,
  getFeaturedProducts,
  getOtherProducts,
  getProduct,
  getProductById,
  getProductCountByCategory,
  getProducts,
  getProductWithVariants,
} from '../data-access/products'
import { adminOnly } from '../middlewares/auth'
import {
  addProduct,
  deleteProduct,
  updateProduct,
  updateProductRating,
} from '../mutations/products'

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

export const getProductByIdFn = createServerFn({ method: 'GET' })
  .validator(z.object({ productId: z.string() }))
  .handler(async ({ data: { productId } }) => {
    const product = await getProductById(productId)
    if (!product) {
      throw new Error('Product not found')
    }
    return product
  })

export const updateProductRatingFn = createServerFn({ method: 'POST' })
  .validator(updateProductRatingSchema)
  .handler(async ({ data }) => {
    return await updateProductRating(data)
  })

export const getProductsFn = createServerFn({ method: 'GET' })
  .validator(
    z.object({
      input: z.custom<SearchParams>(),
      currentUserId: z.string().optional(),
    }),
  )
  .handler(async ({ data: { input, currentUserId } }) => {
    return await getProducts(input, currentUserId)
  })

export const getProductFn = createServerFn({ method: 'GET' })
  .validator(
    z.object({
      productId: z.string(),
      currentUserId: z.string().optional(),
    }),
  )
  .handler(async ({ data: { productId, currentUserId } }) => {
    const product = await getProduct(productId, currentUserId)
    if (!product) {
      throw new Error('Product not found')
    }
    return product
  })

export const getOtherProductsFn = createServerFn({ method: 'GET' })
  .validator(
    z.object({
      productId: z.string(),
      currentUserId: z.string().optional(),
    }),
  )
  .handler(async ({ data: { productId, currentUserId } }) => {
    return await getOtherProducts(productId, currentUserId)
  })
