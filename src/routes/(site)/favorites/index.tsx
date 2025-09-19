import { createFileRoute } from '@tanstack/react-router'

import ConsumerFavorites from '@/features/favorites'

export const Route = createFileRoute('/(site)/favorites/')({
  component: ConsumerFavorites,
})
