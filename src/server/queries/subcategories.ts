import { queryOptions } from '@tanstack/react-query'

import { getAllSubcategoriesFn } from '../fn/subcategories'

export const subcategoriessQueryKey = ['subcategories'] as const

export function getAllSubcategoriesQuery() {
  return queryOptions({
    queryKey: [...subcategoriessQueryKey, 'all-subcategories'] as const,
    queryFn: () => getAllSubcategoriesFn(),
  })
}
