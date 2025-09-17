import { createFileRoute } from '@tanstack/react-router'

import AuthLayout from '@/components/layouts/auth-layout'

export const Route = createFileRoute('/(auth)')({
  component: AuthLayout,
})
