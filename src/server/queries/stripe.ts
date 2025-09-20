import { queryOptions } from '@tanstack/react-query'
import type { z } from 'zod'

import type {
  createPaymentIntentSchema,
  getPaymentIntentSchema,
} from '@/lib/validations/stripe'

import {
  createPaymentIntentFn,
  getClientSessionSecretFn,
  getPaymentIntentFn,
} from '../fn/stripe'

export const stripeQueryKey = ['stripe'] as const

export function createPaymentIntentQuery(
  data: z.infer<typeof createPaymentIntentSchema>,
) {
  return queryOptions({
    queryKey: [...stripeQueryKey, 'create-payment-intent'] as const,
    queryFn: () => createPaymentIntentFn({ data }),
  })
}

export function getPaymentIntentQuery(
  data: z.infer<typeof getPaymentIntentSchema>,
) {
  return queryOptions({
    queryKey: [...stripeQueryKey, 'get-payment-intent'] as const,
    queryFn: () => getPaymentIntentFn({ data }),
  })
}

export function getClientSessionSecretQuery(
  data: z.infer<typeof createPaymentIntentSchema>,
  email: string,
) {
  return queryOptions({
    queryKey: [...stripeQueryKey, 'get-client-session-secret'] as const,
    queryFn: () => getClientSessionSecretFn({ data: { data, email } }),
  })
}
