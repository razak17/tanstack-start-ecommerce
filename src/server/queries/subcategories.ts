import { queryOptions } from '@tanstack/react-query'
import type { z } from 'zod'

import type { getSubcategoriesSchema } from '@/lib/validations/subcategories'

import {
  getAllSubcategoriesFn,
  getSubcategoriesByCategoryFn,
  getSubcategoriesFn,
  getSubcategoryByIdFn,
  getSubcategoryBySlugFn,
  getSubcategorySlugFromIdFn,
} from '../fn/subcategories'

export const subcategoriessQueryKey = ['subcategories'] as const

export function getAllSubcategoriesQuery() {
  return queryOptions({
    queryKey: [...subcategoriessQueryKey, 'all-subcategories'] as const,
    queryFn: () => getAllSubcategoriesFn(),
  })
}

export function getSubcategoriesQuery(
  search: z.infer<typeof getSubcategoriesSchema>,
) {
  return queryOptions({
    queryKey: [...subcategoriessQueryKey, 'subcategories', search] as const,
    queryFn: () => getSubcategoriesFn({ data: search }),
  })
}

export function getSubcategoriesByCategoryQuery(categoryId: string) {
  return queryOptions({
    queryKey: [...subcategoriessQueryKey, 'by-category', categoryId] as const,
    queryFn: () => getSubcategoriesByCategoryFn({ data: { categoryId } }),
  })
}

export function getSubcategoryByIdQuery(subcategoryId: string) {
  return queryOptions({
    queryKey: [...subcategoriessQueryKey, 'by-id', subcategoryId] as const,
    queryFn: () => getSubcategoryByIdFn({ data: { id: subcategoryId } }),
  })
}

export function getSubcategorySlugFromIdQuery(subcategoryId: string) {
  return queryOptions({
    queryKey: [
      ...subcategoriessQueryKey,
      'slug-from-id',
      subcategoryId,
    ] as const,
    queryFn: () => getSubcategorySlugFromIdFn({ data: { id: subcategoryId } }),
  })
}

export function getSubcategoryBySlugQuery(slug: string) {
  return queryOptions({
    queryKey: [...subcategoriessQueryKey, 'by-slug', slug] as const,
    queryFn: () => getSubcategoryBySlugFn({ data: { slug } }),
  })
}
