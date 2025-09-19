import { Outlet } from '@tanstack/react-router'

import { useAuthentication } from '@/lib/auth/client'

import { SiteFooter } from '@/components/layouts/site-footer'
import { SiteHeader } from '@/components/layouts/site-header'

interface MainLayoutProps {
  favoritesCount?: number
  children?: React.ReactNode
}

export function MainLayout({ favoritesCount, children }: MainLayoutProps) {
  const { user } = useAuthentication()

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader user={user} favoritesCount={favoritesCount} />
      <main className="flex-1">{children ? children : <Outlet />}</main>
      <SiteFooter />
    </div>
  )
}
