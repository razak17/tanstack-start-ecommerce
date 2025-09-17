import { Outlet } from '@tanstack/react-router'

import { useAuthenticatedUser } from '@/lib/auth/client'

import { DashboardHeader } from '@/components/layouts/dashboard-header'
import { DashboardSidebar } from '@/components/layouts/dashboard-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

export function DashboardLayout({ children }: { children?: React.ReactNode }) {
  const user = useAuthenticatedUser()

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <DashboardSidebar />
      <SidebarInset>
        <DashboardHeader user={user} />
        {children ? children : <Outlet />}
      </SidebarInset>
    </SidebarProvider>
  )
}
