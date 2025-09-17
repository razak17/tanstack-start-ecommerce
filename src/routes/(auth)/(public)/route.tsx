import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { UserRole } from '@/types'

export const Route = createFileRoute('/(auth)/(public)')({
  beforeLoad: ({ context: { user } }) => {
    if (user && !user.isAnonymous && user.role === UserRole.Admin)
      throw redirect({ to: '/admin/dashboard' })
    if (user && !user.isAnonymous && user.role !== UserRole.Admin)
      throw redirect({ to: '/' })
  },
  component: () => {
    return <Outlet />
  },
})
