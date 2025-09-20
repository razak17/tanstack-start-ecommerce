import { Elements } from '@stripe/react-stripe-js'
import type { StripeElementsOptions } from '@stripe/stripe-js'
import { useSuspenseQuery } from '@tanstack/react-query'
import type * as React from 'react'

import { getStripe } from '@/lib/get-stripe'
import { cn } from '@/lib/utils'
import type { CartLineItemSchema } from '@/lib/validations/cart'

import { createPaymentIntentQuery } from '@/server/queries/stripe'

interface CheckoutShellProps
  extends React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
  items: CartLineItemSchema[]
}

export function CheckoutShell({
  children,
  items,
  className,
  ...props
}: CheckoutShellProps) {
  const stripePromise = getStripe()

  /**
   * Calling createPaymentIntentAction at the client component to avoid stripe authentication error in server action
   */
  const {
    data: { data: intent, error },
  } = useSuspenseQuery(createPaymentIntentQuery({ items }))

  if (!intent?.clientSecret || error) {
    return (
      <section className={cn('size-full', className)} {...props}>
        <div className="size-full bg-white" />
      </section>
    )
  }

  const options: StripeElementsOptions = {
    clientSecret: intent.clientSecret,
    appearance: {
      theme: 'stripe',
    },
  }

  return (
    <section className={cn('size-full', className)} {...props}>
      <Elements options={options} stripe={stripePromise}>
        {children}
      </Elements>
    </section>
  )
}
