import { createServerFn } from '@tanstack/react-start'
import type Stripe from 'stripe'
import { z } from 'zod'

import { getOrderLineItemsSchema } from '@/lib/validations/orders'

import type { SearchParams } from '@/types'
import {
  getCustomers,
  getDashboardStats,
  getOrderCount,
  getOrderLineItems,
  getSaleCount,
  getSales,
  getUserOrders,
} from '../data-access/orders'
import { adminOnly, authed } from '../middlewares/auth'

export const getUserOrdersFn = createServerFn({ method: 'GET' })
  .validator(
    z.object({
      input: z.custom<SearchParams>(),
      userEmail: z.string(),
    }),
  )
  .middleware([authed])
  .handler(async ({ data: { input, userEmail } }) => {
    return await getUserOrders(input, userEmail)
  })

export const getOrderLineItemsFn = createServerFn({ method: 'GET' })
  .validator(
    z.object({
      ...getOrderLineItemsSchema.shape,
      paymentIntent: z
        .custom<Stripe.Response<Stripe.PaymentIntent>>()
        .optional()
        .nullable(),
    }),
  )
  .middleware([authed])
  .handler(async ({ data }) => {
    return await getOrderLineItems(data)
  })

export const getOrderCountFn = createServerFn({ method: 'GET' })
  .validator(
    z.object({
      fromDay: z.date().optional(),
      toDay: z.date().optional(),
    }),
  )
  .middleware([adminOnly])
  .handler(async ({ data }) => {
    return await getOrderCount(data)
  })

export const getSaleCountFn = createServerFn({ method: 'GET' })
  .validator(
    z.object({
      fromDay: z.date().optional(),
      toDay: z.date().optional(),
    }),
  )
  .middleware([adminOnly])
  .handler(async ({ data }) => {
    return await getSaleCount(data)
  })

export const getSalesFn = createServerFn({ method: 'GET' })
  .validator(
    z.object({
      fromDay: z.date().optional(),
      toDay: z.date().optional(),
    }),
  )
  .middleware([adminOnly])
  .handler(async ({ data }) => {
    return await getSales(data)
  })

export const getCustomersFn = createServerFn({ method: 'GET' })
  .validator(
    z.object({
      limit: z.number(),
      offset: z.number(),
      fromDay: z.date().optional(),
      toDay: z.date().optional(),
    }),
  )
  .middleware([adminOnly])
  .handler(async ({ data }) => {
    return await getCustomers(data)
  })

export const getDashboardStatsFn = createServerFn({ method: 'GET' })
  .middleware([adminOnly])
  .handler(async () => {
    return await getDashboardStats()
  })
