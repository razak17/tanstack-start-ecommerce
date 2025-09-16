import { createFileRoute, redirect } from '@tanstack/react-router'

import { UserRole } from '@/types'

export const Route = createFileRoute('/admin/dashboard/')({
  beforeLoad: async ({ context }) => {
    if (context.user?.role !== UserRole.ADMIN) {
      throw redirect({ to: '/' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/dashboard/"!</div>
}
