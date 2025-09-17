import { queryOptions } from '@tanstack/react-query'

import {
  getAllProductsFn,
  getFeaturedProductsFn,
  getProductCountByCategoryFn,
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
