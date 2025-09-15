import { createFileRoute } from '@tanstack/react-router'

import LandingPage from '@/features/app/landing'

export const Route = createFileRoute('/')({
  component: LandingPage,
})
