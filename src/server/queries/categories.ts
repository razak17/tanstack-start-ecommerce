import { queryOptions } from '@tanstack/react-query'

import { getFeaturedCategoriesFn } from '../fn/categories'

export const categoriessQueryKey = ['categories'] as const

export function getFeaturedCategoriesQuery(limit?: number) {
  return queryOptions({
    queryKey: [...categoriessQueryKey, 'featured-categories'],
    queryFn: () => getFeaturedCategoriesFn({ data: { limit } }),
  })
}
