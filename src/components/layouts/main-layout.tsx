import { Outlet } from '@tanstack/react-router'

import { SiteFooter } from '@/components/layouts/site-footer'
import { SiteHeader } from '@/components/layouts/site-header'

interface MainLayoutProps {
  children?: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children ? children : <Outlet />}</main>
      <SiteFooter />
    </div>
  )
}
