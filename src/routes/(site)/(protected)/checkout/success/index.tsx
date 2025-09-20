import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

import OrderSuccessPage from '@/features/checkout/success'
import { CheckoutSuccessLoading } from '@/features/checkout/success/components/sucess-loading'

const paramsSchema = z.object({
  payment_intent: z.string().catch(''),
  payment_intent_client_secret: z.string().catch(''),
  redirect_status: z.string().catch(''),
  delivery_postal_code: z.string().catch(''),
})

export const Route = createFileRoute('/(site)/(protected)/checkout/success/')({
  validateSearch: paramsSchema,
  pendingComponent: CheckoutSuccessLoading,
  component: OrderSuccessPage,
})
