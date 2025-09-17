import { createFileRoute, redirect } from '@tanstack/react-router'

import { DashboardLayout } from '@/components/layouts/dashboard-layout'
import { UserRole } from '@/types'

export const Route = createFileRoute('/admin')({
  beforeLoad: ({ context: { user } }) => {
    if (!user) throw redirect({ to: '/sign-in' })
    if (user.role !== UserRole.Admin) throw redirect({ to: '/' })
  },
  component: DashboardLayout,
})
