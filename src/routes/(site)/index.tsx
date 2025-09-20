import { createFileRoute } from '@tanstack/react-router'
import React from 'react'

import { siteConfig } from '@/config/site'
import LandingPage from '@/features/app/landing'
import BannerCarousel from '@/features/app/landing/components/banner-carousel'
import { LobbySkeleton } from '@/features/app/landing/components/lobby-skeleton'

export const Route = createFileRoute('/(site)/')({
  pendingComponent: LobbySkeleton,
  component: Home,
})

function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <BannerCarousel items={siteConfig.bannerSlides} />
      <React.Suspense fallback={<LobbySkeleton />}>
        <LandingPage />
      </React.Suspense>
    </div>
  )
}
