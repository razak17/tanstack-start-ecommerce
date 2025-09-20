import { and, asc, count, desc, eq, ilike } from 'drizzle-orm'

import { getCategoriesSchema } from '@/lib/validations/categories'

import { db } from '@/server/db'
import { type Category, categories } from '@/server/db/schema'
import { products } from '@/server/db/schema/products'
import type { SearchParams } from '@/types'

export async function getFeaturedCategories(limit: number = 4) {
  return await db
    .select({
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
      description: categories.description,
      image: categories.image,
      createdAt: categories.createdAt,
      updatedAt: categories.updatedAt,
      productCount: count(products.id),
    })
    .from(categories)
    .leftJoin(products, eq(categories.id, products.categoryId))
    .groupBy(categories.id)
    .limit(limit)
    .orderBy(desc(categories.name))
}

export async function getCategories(input: SearchParams) {
  try {
    const search = getCategoriesSchema.parse(input)

    const limit = search.per_page
    const offset = (search.page - 1) * limit

    const [column, order] = (search.sort?.split('.') as [
      keyof Category | undefined,
      'asc' | 'desc' | undefined,
    ]) ?? ['createdAt', 'desc']

    const data = await db
      .select({
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
        description: categories.description,
        image: categories.image,
        createdAt: categories.createdAt,
        updatedAt: categories.updatedAt,
      })
      .from(categories)
      .limit(limit)
      .offset(offset)
      .where(
        and(
          search.name ? ilike(categories.name, `%${search.name}%`) : undefined,
        ),
      )
      .orderBy(
        column && column in categories
          ? order === 'asc'
            ? asc(categories[column])
            : desc(categories[column])
          : desc(categories.createdAt),
      )

    const totalResult = await db
      .select({ count: count() })
      .from(categories)
      .where(
        and(
          search.name ? ilike(categories.name, `%${search.name}%`) : undefined,
        ),
      )

    const total = totalResult[0]?.count ?? 0
    const pageCount = Math.ceil(total / limit)

    return {
      data,
      pageCount,
    }
  } catch (error) {
    console.error('Error fetching categories:', error)
    return {
      data: [],
      pageCount: 0,
    }
  }
}

export async function getAllCategories() {
  return await db
    .select({
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
      description: categories.description,
    })
    .from(categories)
    .orderBy(desc(categories.name))
}

export async function getCategoryById(id: string) {
  const category = await db
    .select({
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
      description: categories.description,
    })
    .from(categories)
    .where(eq(categories.id, id))
    .limit(1)

  return category[0] || null
}

export async function getCategorySlugFromId({ id }: { id: string }) {
  return await db
    .select({
      slug: categories.slug,
    })
    .from(categories)
    .where(eq(categories.id, id))
    .execute()
    .then((res) => res[0]?.slug)
}

export async function getCategoryBySlug(slug: string) {
  const category = await db
    .select()
    .from(categories)
    .where(eq(categories.slug, slug))
    .limit(1)

  return category[0] || null
}
