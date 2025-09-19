import { queryOptions } from '@tanstack/react-query'

import { getCartFn, getCartItemsFn, getUserCartItemsCountFn } from '../fn/cart'

export const cartQueryKey = ['cart'] as const

export function getCartQuery() {
  return queryOptions({
    queryKey: [...cartQueryKey, 'cart'] as const,
    queryFn: () => getCartFn(),
  })
}

export function getCartItemsQuery(cartId?: string) {
  return queryOptions({
    queryKey: [...cartQueryKey, 'cart-items', cartId] as const,
    queryFn: () => getCartItemsFn({ data: { cartId } }),
    enabled: !!cartId,
  })
}

export function getUserCartItemsCountQuery() {
  return queryOptions({
    queryKey: [...cartQueryKey, 'user-cart-item-count'] as const,
    queryFn: () => getUserCartItemsCountFn(),
  })
}
