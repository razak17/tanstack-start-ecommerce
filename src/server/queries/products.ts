import { queryOptions } from '@tanstack/react-query'

import {
  getFeaturedProductsFn,
  getProductCountByCategoryFn,
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
