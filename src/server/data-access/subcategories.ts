import { and, asc, count, desc, eq, ilike, inArray } from 'drizzle-orm'
import type { z } from 'zod'

import type { getSubcategoriesSchema } from '@/lib/validations/subcategories'

import { db } from '@/server/db'
import { categories, type Subcategory, subcategories } from '@/server/db/schema'

export async function getSubcategories(
  search: z.infer<typeof getSubcategoriesSchema>,
) {
  try {
    const limit = search.per_page
    const offset = (search.page - 1) * limit

    const [column, order] = (search.sort?.split('.') as [
      keyof Subcategory | undefined,
      'asc' | 'desc' | undefined,
    ]) ?? ['createdAt', 'desc']
    const categoryIds = search.categoryId ? [search.categoryId] : []

    const data = await db
      .select({
        id: subcategories.id,
        name: subcategories.name,
        slug: subcategories.slug,
        description: subcategories.description,
        categoryId: subcategories.categoryId,
        categoryName: categories.name,
        createdAt: subcategories.createdAt,
        updatedAt: subcategories.updatedAt,
      })
      .from(subcategories)
      .limit(limit)
      .offset(offset)
      .leftJoin(categories, eq(subcategories.categoryId, categories.id))
      .where(
        and(
          search.name
            ? ilike(subcategories.name, `%${search.name}%`)
            : undefined,
          categoryIds.length > 0
            ? inArray(subcategories.categoryId, categoryIds)
            : undefined,
        ),
      )
      .orderBy(
        column && column in subcategories
          ? order === 'asc'
            ? asc(subcategories[column])
            : desc(subcategories[column])
          : desc(subcategories.createdAt),
      )

    const totalResult = await db
      .select({ count: count() })
      .from(subcategories)
      .leftJoin(categories, eq(subcategories.categoryId, categories.id))
      .where(
        and(
          search.name
            ? ilike(subcategories.name, `%${search.name}%`)
            : undefined,
          categoryIds.length > 0
            ? inArray(subcategories.categoryId, categoryIds)
            : undefined,
        ),
      )

    const total = totalResult[0]?.count ?? 0
    const pageCount = Math.ceil(total / limit)

    return {
      data,
      pageCount,
    }
  } catch (error) {
    console.error('Error fetching subcategories:', error)
    return {
      data: [],
      pageCount: 0,
    }
  }
}

export async function getAllSubcategories() {
  return await db
    .select({
      id: subcategories.id,
      name: subcategories.name,
      slug: subcategories.slug,
      description: subcategories.description,
      categoryId: subcategories.categoryId,
      categoryName: categories.name,
    })
    .from(subcategories)
    .leftJoin(categories, eq(subcategories.categoryId, categories.id))
    .orderBy(asc(categories.name), asc(subcategories.name))
}

export async function getSubcategoryById(id: string) {
  const subcategory = await db
    .select({
      id: subcategories.id,
      name: subcategories.name,
      slug: subcategories.slug,
      description: subcategories.description,
      categoryId: subcategories.categoryId,
      categoryName: categories.name,
    })
    .from(subcategories)
    .leftJoin(categories, eq(subcategories.categoryId, categories.id))
    .where(eq(subcategories.id, id))
    .limit(1)

  return subcategory[0] || null
}

export async function getSubcategorySlugFromId(id: string) {
  return await db
    .select({
      slug: subcategories.slug,
    })
    .from(subcategories)
    .where(eq(subcategories.id, id))
    .execute()
    .then((res) => res[0]?.slug)
}

export async function getSubcategoryBySlug(slug: string) {
  const subcategory = await db
    .select({
      id: subcategories.id,
      name: subcategories.name,
      slug: subcategories.slug,
      description: subcategories.description,
      categoryId: subcategories.categoryId,
      categoryName: categories.name,
      createdAt: subcategories.createdAt,
      updatedAt: subcategories.updatedAt,
    })
    .from(subcategories)
    .leftJoin(categories, eq(subcategories.categoryId, categories.id))
    .where(eq(subcategories.slug, slug))
    .limit(1)

  return subcategory[0] || null
}

export async function getSubcategoriesByCategory(categoryId: string) {
  return await db
    .select({
      id: subcategories.id,
      name: subcategories.name,
      slug: subcategories.slug,
      description: subcategories.description,
      categoryId: subcategories.categoryId,
    })
    .from(subcategories)
    .where(eq(subcategories.categoryId, categoryId))
    .orderBy(asc(subcategories.name))
}
