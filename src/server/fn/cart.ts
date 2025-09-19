import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import { cartItemSchema } from '@/lib/validations/cart'

import { UserRole } from '@/types'
import {
  getCart,
  getCartItems,
  getUserCartItemsCount,
} from '../data-access/cart'
import { authed } from '../middlewares/auth'
import {
  addToCart,
  deleteCart,
  deleteCartItem,
  deleteCartItems,
  updateCartItem,
} from '../mutations/cart'

export const getCartFn = createServerFn({ method: 'GET' }).handler(async () => {
  return await getCart()
})

export const getCartItemsFn = createServerFn({ method: 'GET' })
  .validator(
    z.object({
      cartId: z.string().optional(),
    }),
  )
  .handler(async ({ data: { cartId } }) => {
    if (!cartId) return []
    return await getCartItems(cartId)
  })

export const getUserCartItemsCountFn = createServerFn({
  method: 'GET',
}).handler(async () => {
  return await getUserCartItemsCount()
})

export const addToCartFn = createServerFn({ method: 'POST' })
  .validator(cartItemSchema)
  .middleware([authed])
  .handler(async ({ data, context: { user } }) => {
    if (user.role !== UserRole.Admin) {
      throw new Error('You do not have permission to add a product')
    }
    return await addToCart(data)
  })

export const updateCartItemFn = createServerFn({ method: 'POST' })
  .validator(cartItemSchema)
  .middleware([authed])
  .handler(async ({ data, context: { user } }) => {
    if (user.role !== UserRole.Admin) {
      throw new Error('You do not have permission to update a cart item')
    }
    return await updateCartItem(data)
  })

export const deleteCartFn = createServerFn({ method: 'POST' })
  .middleware([authed])
  .handler(async ({ context: { user } }) => {
    if (user.role !== UserRole.Admin) {
      throw new Error('You do not have permission to delete the cart')
    }
    return await deleteCart()
  })

export const deleteCartItemFn = createServerFn({ method: 'POST' })
  .validator(
    z.object({
      productId: z.string(),
    }),
  )
  .middleware([authed])
  .handler(async ({ data, context: { user } }) => {
    if (user.role !== UserRole.Admin) {
      throw new Error('You do not have permission to delete a cart item')
    }
    return await deleteCartItem(data)
  })

export const deleteCartItemsFn = createServerFn({ method: 'POST' })
  .validator(
    z.object({
      productIds: z.array(z.string()),
    }),
  )
  .middleware([authed])
  .handler(async ({ data, context: { user } }) => {
    if (user.role !== UserRole.Admin) {
      throw new Error('You do not have permission to delete cart items')
    }
    return await deleteCartItems(data)
  })
