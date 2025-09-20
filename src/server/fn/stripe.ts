import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import {
  createPaymentIntentSchema,
  getPaymentIntentSchema,
} from '@/lib/validations/stripe'

import {
  createPaymentIntent,
  getClientSessionSecret,
  getPaymentIntent,
} from '../mutations/stripe'

export const createPaymentIntentFn = createServerFn({ method: 'POST' })
  .validator(createPaymentIntentSchema)
  .handler(async ({ data }) => {
    return await createPaymentIntent(data)
  })

export const getPaymentIntentFn = createServerFn({ method: 'POST' })
  .validator(getPaymentIntentSchema)
  .handler(async ({ data }) => {
    return await getPaymentIntent(data)
  })

export const getClientSessionSecretFn = createServerFn({ method: 'POST' })
  .validator(
    z.object({
      data: z.object({
        ...createPaymentIntentSchema.shape,
      }),
      email: z.email(),
    }),
  )
  .handler(async ({ data: { data, email } }) => {
    return await getClientSessionSecret(data, email)
  })
