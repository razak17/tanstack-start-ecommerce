import { queryOptions } from '@tanstack/react-query'

import { getAllCategoriesFn, getFeaturedCategoriesFn } from '../fn/categories'

export const categoriessQueryKey = ['categories'] as const

export function getFeaturedCategoriesQuery(limit?: number) {
  return queryOptions({
    queryKey: [...categoriessQueryKey, 'featured-categories'],
    queryFn: () => getFeaturedCategoriesFn({ data: { limit } }),
  })
}

export function getAllCategoriesQuery() {
  return queryOptions({
    queryKey: [...categoriessQueryKey, 'all-categories'],
    queryFn: () => getAllCategoriesFn(),
  })
}
