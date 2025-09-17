import { createFileRoute } from '@tanstack/react-router'
import React from 'react'

import AdminDashboard from '@/features/admin/dashboard'
import { DashboardSkeleton } from '@/features/admin/dashboard/components/dashboard-skeleton'

export const Route = createFileRoute('/admin/dashboard/')({
  component: AdminDasboard,
})

function AdminDasboard() {
  return (
    <React.Suspense fallback={<DashboardSkeleton />}>
      <AdminDashboard />
    </React.Suspense>
  )
}
