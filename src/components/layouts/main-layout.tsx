import { useAuthenticatedUser } from '@/lib/auth/client'

import { SiteFooter } from '@/components/layouts/site-footer'
import { SiteHeader } from '@/components/layouts/site-header'

interface MainLayoutProps {
  cartItemsCount?: number
  favoritesCount?: number
  children?: React.ReactNode
}

export function MainLayout({
  cartItemsCount,
  favoritesCount,
  children,
}: MainLayoutProps) {
  const user = useAuthenticatedUser()

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader
        user={user}
        cartItemsCount={cartItemsCount}
        favoritesCount={favoritesCount}
      />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
