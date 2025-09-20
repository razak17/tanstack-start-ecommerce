import { queryOptions } from '@tanstack/react-query'
import type Stripe from 'stripe'
import type { z } from 'zod'

import type { getOrderLineItemsSchema } from '@/lib/validations/orders'

import type { SearchParams } from '@/types'
import {
  getCustomersFn,
  getDashboardStatsFn,
  getOrderCountFn,
  getOrderLineItemsFn,
  getSaleCountFn,
  getSalesFn,
  getUserOrdersFn,
} from '../fn/orders'

export const ordersQueryKey = ['orders'] as const

export function getUserOrdersQuery(input: SearchParams, userEmail: string) {
  return queryOptions({
    queryKey: [...ordersQueryKey, 'user-orders', userEmail],
    queryFn: () => getUserOrdersFn({ data: { input, userEmail } }),
  })
}

export function getOrderLineItemsQuery(
  input: z.infer<typeof getOrderLineItemsSchema> & {
    paymentIntent?: Stripe.Response<Stripe.PaymentIntent> | null
  },
) {
  return queryOptions({
    queryKey: [...ordersQueryKey, 'order-line-items'],
    queryFn: () => getOrderLineItemsFn({ data: { ...input } }),
  })
}

export function getOrderCountQuery(input: { fromDay?: Date; toDay?: Date }) {
  return queryOptions({
    queryKey: [...ordersQueryKey, 'order-count'],
    queryFn: () => getOrderCountFn({ data: { ...input } }),
  })
}

export function getSaleCountQuery(input: { fromDay?: Date; toDay?: Date }) {
  return queryOptions({
    queryKey: [...ordersQueryKey, 'sale-count'],
    queryFn: () => getSaleCountFn({ data: { ...input } }),
  })
}

export function getSalesQuery(input: { fromDay?: Date; toDay?: Date }) {
  return queryOptions({
    queryKey: [...ordersQueryKey, 'sales'],
    queryFn: () => getSalesFn({ data: { ...input } }),
  })
}

export function getCustomersQuery(
  limit: number,
  offset: number,
  fromDay?: Date,
  toDay?: Date,
) {
  return queryOptions({
    queryKey: [...ordersQueryKey, 'customers'],
    queryFn: () => getCustomersFn({ data: { limit, offset, fromDay, toDay } }),
  })
}

export function getDashboardOrdersQuery() {
  return queryOptions({
    queryKey: [...ordersQueryKey, 'dashboard-orders'],
    queryFn: () => getDashboardStatsFn(),
  })
}
