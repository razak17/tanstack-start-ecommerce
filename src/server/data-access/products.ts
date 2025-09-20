import {
  and,
  asc,
  count,
  desc,
  eq,
  gte,
  inArray,
  lte,
  not,
  sql,
} from 'drizzle-orm'

import { getProductsSchema } from '@/lib/validations/products'

import { db } from '@/server/db'
import {
  categories,
  favorites,
  type Product,
  products,
  subcategories,
} from '@/server/db/schema'
import type { SearchParams } from '@/types'

// See the unstable_cache API docs: https://nextjs.org/docs/app/api-reference/functions/unstable_cache
export async function getFeaturedProducts(currentUserId?: string) {
  let query = db
    .select({
      id: products.id,
      name: products.name,
      images: products.images,
      category: categories.name,
      price: products.price,
      inventory: products.inventory,
      isFavorited: currentUserId
        ? sql<boolean>`${favorites.productId} IS NOT NULL`
        : sql<boolean>`FALSE`,
    })
    .from(products)
    .limit(8)
    .leftJoin(categories, eq(products.categoryId, categories.id))

  if (currentUserId) {
    query = query.leftJoin(
      favorites,
      and(
        eq(favorites.productId, products.id),
        eq(favorites.userId, currentUserId),
      ),
    )

    return await query
      .groupBy(products.id, categories.name, favorites.productId)
      .orderBy(desc(count(products.images)), desc(products.createdAt))
  } else {
    return await query
      .groupBy(products.id, categories.name)
      .orderBy(desc(count(products.images)), desc(products.createdAt))
  }
}

// See the unstable_noStore API docs: https://nextjs.org/docs/app/api-reference/functions/unstable_noStore
export async function getProducts(input: SearchParams, currentUserId?: string) {
  try {
    const search = getProductsSchema.parse(input)

    const limit = search.per_page
    const offset = (search.page - 1) * limit

    const [column, order] = (search.sort?.split('.') as [
      keyof Product | undefined,
      'asc' | 'desc' | undefined,
    ]) ?? ['createdAt', 'desc']
    const [minPrice, maxPrice] = search.price_range?.split('-') ?? []
    const categoryIds = search.categories?.split('.') ?? []
    const subcategoryIds = search.subcategories?.split('.') ?? []

    let dataQuery = db
      .select({
        id: products.id,
        name: products.name,
        description: products.description,
        images: products.images,
        category: categories.name,
        subcategory: subcategories.name,
        price: products.price,
        inventory: products.inventory,
        rating: products.rating,
        isFavorited: currentUserId
          ? sql<boolean>`${favorites.productId} IS NOT NULL`
          : sql<boolean>`FALSE`,
        createdAt: products.createdAt,
        updatedAt: products.updatedAt,
      })
      .from(products)
      .limit(limit)
      .offset(offset)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .leftJoin(subcategories, eq(products.subcategoryId, subcategories.id))

    if (currentUserId) {
      dataQuery = dataQuery.leftJoin(
        favorites,
        and(
          eq(favorites.productId, products.id),
          eq(favorites.userId, currentUserId),
        ),
      )
    }

    const data = await dataQuery
      .where(
        and(
          categoryIds.length > 0
            ? inArray(products.categoryId, categoryIds)
            : undefined,
          subcategoryIds.length > 0
            ? inArray(products.subcategoryId, subcategoryIds)
            : undefined,
          minPrice ? gte(products.price, minPrice) : undefined,
          maxPrice ? lte(products.price, maxPrice) : undefined,
        ),
      )
      .groupBy(
        products.id,
        categories.name,
        subcategories.name,
        ...(currentUserId ? [favorites.productId] : []),
      )
      .orderBy(
        column && column in products
          ? order === 'asc'
            ? asc(products[column])
            : desc(products[column])
          : desc(products.createdAt),
      )

    const total = await db
      .select({
        count: count(products.id),
      })
      .from(products)
      .where(
        and(
          categoryIds.length > 0
            ? inArray(products.categoryId, categoryIds)
            : undefined,
          subcategoryIds.length > 0
            ? inArray(products.subcategoryId, subcategoryIds)
            : undefined,
          minPrice ? gte(products.price, minPrice) : undefined,
          maxPrice ? lte(products.price, maxPrice) : undefined,
        ),
      )
      .then((res) => res[0]?.count ?? 0)

    const pageCount = Math.ceil(total / limit)

    return {
      data,
      pageCount,
    }
  } catch (error) {
    console.error('Error fetching products:', error)
    return {
      data: [],
      pageCount: 0,
    }
  }
}

export async function getProductCountByCategory(categoryId: string) {
  return await db
    .select({
      count: count(products.id),
    })
    .from(products)
    .where(eq(products.categoryId, categoryId))
    .execute()
    .then((res) => res[0]?.count ?? 0)
}

export async function getProduct(productId: string, currentUserId?: string) {
  try {
    let query = db
      .select({
        id: products.id,
        name: products.name,
        description: products.description,
        images: products.images,
        price: products.price,
        inventory: products.inventory,
        rating: products.rating,
        createdAt: products.createdAt,
        updatedAt: products.updatedAt,
        categoryId: products.categoryId,
        subcategoryId: products.subcategoryId,
        category: categories,
        subcategory: subcategories,
        isFavorited: currentUserId
          ? sql<boolean>`${favorites.productId} IS NOT NULL`
          : sql<boolean>`FALSE`,
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .leftJoin(subcategories, eq(products.subcategoryId, subcategories.id))

    if (currentUserId) {
      query = query.leftJoin(
        favorites,
        and(
          eq(favorites.productId, products.id),
          eq(favorites.userId, currentUserId),
        ),
      )
    }

    const product = await query
      .where(eq(products.id, productId))
      .limit(1)
      .then((res) => res[0] ?? null)

    return product
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export async function getProductForMetaData(productId: string) {
  try {
    const product = await db.query.products.findFirst({
      columns: {
        name: true,
        description: true,
      },
      where: eq(products.id, productId),
    })

    return product
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export async function getOtherProducts(
  productId: string,
  currentUserId?: string,
) {
  try {
    const otherProducts = await db
      .select({
        id: products.id,
        name: products.name,
        price: products.price,
        images: products.images,
        category: categories.name,
        inventory: products.inventory,
        rating: products.rating,
        isFavorited: currentUserId
          ? sql<boolean>`${favorites.productId} IS NOT NULL`
          : sql<boolean>`FALSE`,
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .limit(4)
      .where(not(eq(products.id, productId)))
      .orderBy(desc(products.inventory))

    return otherProducts
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export async function getProductWithVariants(id: string) {
  try {
    const product = await db.query.products.findFirst({
      columns: {
        id: true,
        name: true,
        description: true,
        images: true,
        price: true,
        inventory: true,
        rating: true,
        categoryId: true,
        subcategoryId: true,
      },
      where: eq(products.id, id),
      with: {
        category: {
          columns: { name: true },
        },
        subcategory: { columns: { name: true } },
        variants: {
          columns: { id: true },
          with: {
            variant: { columns: { name: true } },
            productVariantValues: {
              columns: {
                value: true,
                price: true,
              },
              with: {
                stock: {
                  columns: {
                    quantity: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    return product
  } catch (error) {
    console.error('Error fetching product with variants:', error)
    return null
  }
}

export async function getAllProducts() {
  return await db
    .select({
      id: products.id,
      name: products.name,
      description: products.description,
      images: products.images,
      category: categories.name,
      subcategory: subcategories.name,
      price: products.price,
      inventory: products.inventory,
      rating: products.rating,
      createdAt: products.createdAt,
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .leftJoin(subcategories, eq(products.subcategoryId, subcategories.id))
    .orderBy(desc(products.createdAt))
}

export async function getProductById(id: Product['id']) {
  return await db.query.products.findFirst({
    where: eq(products.id, id),
  })
}
