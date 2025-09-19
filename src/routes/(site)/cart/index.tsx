import { createFileRoute } from '@tanstack/react-router'

import ConsumerCart from '@/features/cart'

export const Route = createFileRoute('/(site)/cart/')({
  component: ConsumerCart,
})
