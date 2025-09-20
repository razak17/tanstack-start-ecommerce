import { loadStripe, type Stripe } from '@stripe/stripe-js'

import { env } from './env/client'

let stripePromise: Promise<Stripe | null>
export function getStripe(stripeAccountId?: string) {
  if (!stripePromise) {
    stripePromise = loadStripe(
      env.VITE_STRIPE_PUBLISHABLE_KEY,
      stripeAccountId ? { stripeAccount: stripeAccountId } : undefined,
    )
  }
  return stripePromise
}
