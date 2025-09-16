import { createFileRoute, redirect } from '@tanstack/react-router'
import React from 'react'

import { DashboardLayout } from '@/components/layouts/dashboard-layout'
import AdminDashboard from '@/features/admin/dashboard'
import { DashboardSkeleton } from '@/features/admin/dashboard/components/dashboard-skeleton'
import { UserRole } from '@/types'

export const Route = createFileRoute('/admin/dashboard')({
  beforeLoad: async ({ context }) => {
    if (context.user?.role !== UserRole.Admin) {
      throw redirect({ to: '/' })
    }
  },
  component: AdminDasboard,
})

function AdminDasboard() {
  return (
    <DashboardLayout>
      <React.Suspense fallback={<DashboardSkeleton />}>
        <AdminDashboard />
      </React.Suspense>
    </DashboardLayout>
  )
}
