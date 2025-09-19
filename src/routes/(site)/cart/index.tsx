import { createFileRoute } from '@tanstack/react-router'

import { seo } from '@/lib/seo'

import ConsumerCart from '@/features/cart'

export const Route = createFileRoute('/(site)/cart/')({
  head: () => ({
    meta: seo({
      title: 'Cart',
      description: 'Checkout with your cart items',
    }),
  }),
  component: ConsumerCart,
})
