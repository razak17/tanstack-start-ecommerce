import { createFileRoute } from '@tanstack/react-router'

import Terms from '@/features/app/terms'

export const Route = createFileRoute('/(site)/terms/')({
  component: Terms,
})
