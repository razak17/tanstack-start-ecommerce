import { useSuspenseQuery } from '@tanstack/react-query'
import { Link, useSearch } from '@tanstack/react-router'

import { cn, formatPrice } from '@/lib/utils'

import { VerifyOderForm } from './components/verify-order-form'
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { buttonVariants } from '@/components/ui/button'
import { CartLineItems } from '@/features/cart/components/cart-line-items'
import { getOrderLineItemsQuery } from '@/server/queries/orders'
import { getPaymentIntentQuery } from '@/server/queries/stripe'

export default function OrderSuccessPage() {
  const { payment_intent, delivery_postal_code } = useSearch({
    from: '/(site)/(protected)/checkout/success/',
  })
  const {
    data: { isVerified, paymentIntent },
  } = useSuspenseQuery(
    getPaymentIntentQuery({
      paymentIntentId: typeof payment_intent === 'string' ? payment_intent : '',
      deliveryPostalCode:
        typeof delivery_postal_code === 'string' ? delivery_postal_code : '',
    }),
  )

  const { data: lineItems } = useSuspenseQuery(
    getOrderLineItemsQuery({
      items: paymentIntent?.metadata?.items
        ? JSON.parse(paymentIntent.metadata.items)
        : [],
      paymentIntent,
    }),
  )

  return (
    <div className="flex size-full max-h-dvh flex-col gap-10 overflow-hidden pt-6 pb-8 md:py-8">
      {isVerified ? (
        <div className="grid gap-10 overflow-auto">
          <PageHeader
            id="order-success-page-header"
            aria-labelledby="order-success-page-header-heading"
            className="container flex max-w-7xl flex-col"
          >
            <PageHeaderHeading>Thank you for your order</PageHeaderHeading>
            <PageHeaderDescription>
              We will be in touch with you shortly
            </PageHeaderDescription>
          </PageHeader>
          <section
            id="order-success-cart-line-items"
            aria-labelledby="order-success-cart-line-items-heading"
            className="flex flex-col space-y-6 overflow-auto"
          >
            <CartLineItems
              items={lineItems}
              isEditable={false}
              className="container max-w-7xl"
            />
            <div className="container flex w-full max-w-7xl items-center">
              <span className="flex-1">
                Total (
                {lineItems.reduce(
                  (acc, item) => acc + Number(item.quantity),
                  0,
                )}
                )
              </span>
              <span>
                {formatPrice(
                  lineItems.reduce(
                    (acc, item) =>
                      acc + Number(item.price) * Number(item.quantity),
                    0,
                  ),
                )}
              </span>
            </div>
          </section>
          <section
            id="order-success-actions"
            aria-labelledby="order-success-actions-heading"
            className="container flex max-w-7xl items-center justify-center space-x-2.5"
          >
            <Link
              aria-label="Continue shopping"
              to="/shop"
              className={cn(
                buttonVariants({
                  size: 'sm',
                  className: 'text-center',
                }),
              )}
            >
              Continue shopping
            </Link>
            <Link
              aria-label="Back to cart"
              to="/cart"
              className={cn(
                buttonVariants({
                  variant: 'outline',
                  size: 'sm',
                  className: 'text-center',
                }),
              )}
            >
              Back to cart
            </Link>
          </section>
        </div>
      ) : (
        <div className="container grid max-w-7xl gap-10">
          <PageHeader
            id="order-success-page-header"
            aria-labelledby="order-success-page-header-heading"
          >
            <PageHeaderHeading>Thank you for your order</PageHeaderHeading>
            <PageHeaderDescription>
              Please enter your delivery postal code to verify your order
            </PageHeaderDescription>
          </PageHeader>
          <VerifyOderForm
            id="order-success-verify-order-form"
            aria-labelledby="order-success-verify-order-form-heading"
            className="mx-auto w-full max-w-md pt-40"
          />
        </div>
      )}
    </div>
  )
}
