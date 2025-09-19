import { getCookie } from '@tanstack/react-start/server'
import { and, asc, eq, inArray } from 'drizzle-orm'

import type { CartLineItemSchema } from '@/lib/validations/cart'

import { db } from '@/server/db'
import { carts, categories, products, subcategories } from '@/server/db/schema'

export async function getCart(): Promise<CartLineItemSchema[]> {
  const cartId = getCookie('cartId')

  if (!cartId) return []

  try {
    const cart = await db.query.carts.findFirst({
      columns: {
        items: true,
      },
      where: eq(carts.id, cartId),
    })

    const productIds = cart?.items?.map((item) => item.productId) ?? []

    if (productIds.length === 0) return []

    const uniqueProductIds = [...new Set(productIds)]

    const cartLineItems = await db
      .select({
        id: products.id,
        name: products.name,
        images: products.images,
        category: categories.name,
        subcategory: subcategories.name,
        price: products.price,
        inventory: products.inventory,
      })
      .from(products)
      .leftJoin(categories, eq(categories.id, products.categoryId))
      .leftJoin(subcategories, eq(subcategories.id, products.subcategoryId))
      .where(inArray(products.id, uniqueProductIds))
      .groupBy(products.id, categories.name, subcategories.name)
      .orderBy(asc(products.createdAt))
      .execute()
      .then((items) => {
        return items.map((item) => {
          const quantity = cart?.items?.find(
            (cartItem) => cartItem.productId === item.id,
          )?.quantity

          return {
            ...item,
            quantity: quantity ?? 0,
          }
        })
      })

    return cartLineItems
  } catch (err) {
    console.error(err)
    return []
  }
}

export async function getCartItems(cartId: string) {
  try {
    const cart = await db.query.carts.findFirst({
      where: eq(carts.id, cartId),
    })

    return cart?.items
  } catch (err) {
    console.error(err)
    return []
  }
}

export async function getUserCartItemsCount() {
  const cartId = getCookie('cartId')
  try {
    if (!cartId) return 0

    const result = await db
      .select()
      .from(carts)
      .where(and(eq(carts.id, cartId), eq(carts.closed, false)))
    return result ? result[0]?.items?.length : 0
  } catch (error) {
    console.error('Error fetching favorites count:', error)
    return 0
  }
}
