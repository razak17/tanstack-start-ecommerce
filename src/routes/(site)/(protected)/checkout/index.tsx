import { createFileRoute, redirect } from '@tanstack/react-router'

import UserCheckout from '@/features/checkout'
import { CheckoutLoading } from '@/features/checkout/components/checkout-loading'

export const Route = createFileRoute('/(site)/(protected)/checkout/')({
  loader: ({ context: { user } }) => {
    if (!user || user?.isAnonymous) throw redirect({ to: '/sign-in' })
  },
  pendingComponent: CheckoutLoading,
  component: UserCheckout,
})
