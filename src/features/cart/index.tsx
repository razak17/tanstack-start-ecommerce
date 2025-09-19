import { useSuspenseQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { Suspense } from 'react'

import { cn } from '@/lib/utils'

import { CheckoutCardSkeleton } from './components/checkout-card-skeleton'
import { CheckoutCard } from './components/checkout-cart'
import { Icons } from '@/components/icons'
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { Shell } from '@/components/shell'
import { buttonVariants } from '@/components/ui/button'
import { getCartQuery } from '@/server/queries/cart'

export default function ConsumerCart() {
  return (
    <Shell>
      <PageHeader
        id="cart-page-header"
        aria-labelledby="cart-page-header-heading"
      >
        <PageHeaderHeading size="sm">Checkout</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Checkout with your cart items
        </PageHeaderDescription>
      </PageHeader>
      <Suspense fallback={<CheckoutCardSkeleton />}>
        <ConsumerCartContent />
      </Suspense>
    </Shell>
  )
}

function ConsumerCartContent() {
  const { data: cartLineItems, isFetching } = useSuspenseQuery(getCartQuery())

  if (isFetching) {
    return <CheckoutCardSkeleton />
  }

  if (cartLineItems.length === 0) {
    return (
      <section
        id="cart-page-empty-cart"
        aria-labelledby="cart-page-empty-cart-heading"
        className="flex h-full flex-col items-center justify-center space-y-1 pt-16"
      >
        <Icons.cart
          className="mb-4 size-16 text-muted-foreground"
          aria-hidden="true"
        />
        <div className="font-medium text-muted-foreground text-xl">
          Your cart is empty
        </div>
        <Link
          aria-label="Add items to your cart to checkout"
          to="/shop"
          className={cn(
            buttonVariants({
              variant: 'link',
              size: 'sm',
              className: 'text-muted-foreground text-sm',
            }),
          )}
        >
          Add items to your cart to checkout
        </Link>
      </section>
    )
  }
  return <CheckoutCard items={cartLineItems} />
}
