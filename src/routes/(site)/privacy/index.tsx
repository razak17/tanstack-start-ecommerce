import { createFileRoute } from '@tanstack/react-router'

import Privacy from '@/features/app/privacy'

export const Route = createFileRoute('/(site)/privacy/')({
  component: Privacy,
})
