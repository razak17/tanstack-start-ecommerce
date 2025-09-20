import { queryOptions } from '@tanstack/react-query'

import type { SearchParams } from '@/types'
import {
  getAllProductsFn,
  getFeaturedProductsFn,
  getOtherProductsFn,
  getProductCountByCategoryFn,
  getProductFn,
  getProductsFn,
  getProductWithVariantsFn,
} from '../fn/products'

export const productsQueryKey = ['products'] as const

export function getFeaturedProductsQuery(currentUserId?: string) {
  return queryOptions({
    queryKey: [...productsQueryKey, 'featured-products'] as const,
    queryFn: () => getFeaturedProductsFn({ data: { currentUserId } }),
  })
}

export function getProductCountByCategoryQuery(categoryId: string) {
  return queryOptions({
    queryKey: [...productsQueryKey, 'products-count-by-category'] as const,
    queryFn: () => getProductCountByCategoryFn({ data: { categoryId } }),
  })
}

export function getAllProductsQuery() {
  return queryOptions({
    queryKey: [...productsQueryKey, 'all-products'] as const,
    queryFn: () => getAllProductsFn(),
  })
}

export function getProductWithVariantsQuery(productId: string) {
  return queryOptions({
    queryKey: [
      ...productsQueryKey,
      'product-with-variants',
      productId,
    ] as const,
    queryFn: () => getProductWithVariantsFn({ data: { productId } }),
  })
}

export function getProductQuery(productId: string, currentUserId?: string) {
  return queryOptions({
    queryKey: [...productsQueryKey, 'product', productId] as const,
    queryFn: () => getProductFn({ data: { productId, currentUserId } }),
  })
}

export function getProductsQuery(
  searchParams: SearchParams,
  currentUserId?: string,
) {
  return queryOptions({
    queryKey: [...productsQueryKey, 'products', { currentUserId }] as const,
    queryFn: () =>
      getProductsFn({ data: { input: searchParams, currentUserId } }),
  })
}

export function getOtherProductsQuery(
  productId: string,
  currentUserId?: string,
) {
  return queryOptions({
    queryKey: [...productsQueryKey, 'other-products', productId] as const,
    queryFn: () =>
      getOtherProductsFn({
        data: { productId, currentUserId },
      }),
  })
}
