import { createFileRoute } from '@tanstack/react-router'
import React from 'react'

import { MainLayout } from '@/components/layouts/main-layout'
import { siteConfig } from '@/config/site'
import LandingPage from '@/features/app/landing'
import BannerCarousel from '@/features/app/landing/components/banner-carousel'
import { LobbySkeleton } from '@/features/app/landing/components/lobby-skeleton'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <MainLayout>
      <div className="flex min-h-screen flex-col">
        <BannerCarousel items={siteConfig.bannerSlides} />
        <React.Suspense fallback={<LobbySkeleton />}>
          <LandingPage />
        </React.Suspense>
      </div>
    </MainLayout>
  )
}
