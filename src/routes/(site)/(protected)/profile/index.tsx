import { createFileRoute } from '@tanstack/react-router'

import UserProfile from '@/features/profile'

export const Route = createFileRoute('/(site)/(protected)/profile/')({
  component: UserProfile,
})
