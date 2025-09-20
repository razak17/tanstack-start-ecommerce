import { queryOptions } from '@tanstack/react-query'
import type { z } from 'zod'

import type { getCategoriesSchema } from '@/lib/validations/categories'

import {
  getAllCategoriesFn,
  getCategoriesFn,
  getCategoryByIdFn,
  getCategoryBySlugFn,
  getCategorySlugFromIdFn,
  getFeaturedCategoriesFn,
} from '../fn/categories'

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

export function getCategoriesQuery(
  searchParams: Partial<z.infer<typeof getCategoriesSchema>>,
) {
  return queryOptions({
    queryKey: [...categoriessQueryKey, 'categories', searchParams] as const,
    queryFn: () => getCategoriesFn({ data: searchParams }),
  })
}

export function getCategoryByIdQuery(categoryId: string) {
  return queryOptions({
    queryKey: [...categoriessQueryKey, 'category-by-id', categoryId] as const,
    queryFn: () => getCategoryByIdFn({ data: { id: categoryId } }),
  })
}

export function getCategoryBySlugQuery(categorySlug: string) {
  return queryOptions({
    queryKey: [
      ...categoriessQueryKey,
      'category-by-slug',
      categorySlug,
    ] as const,
    queryFn: () => getCategoryBySlugFn({ data: { slug: categorySlug } }),
  })
}

export function getCategorySlugFromIdQuery(categoryId: string) {
  return queryOptions({
    queryKey: [
      ...categoriessQueryKey,
      'category-slug-from-id',
      categoryId,
    ] as const,
    queryFn: () => getCategorySlugFromIdFn({ data: { id: categoryId } }),
  })
}
