import BannerCarousel from './components/banner-carousel'
import { MainLayout } from '@/components/layouts/main-layout'
import { siteConfig } from '@/config/site'

export default function LandingPage() {
  return (
    <MainLayout>
      <div className="flex min-h-screen flex-col">
        <BannerCarousel items={siteConfig.bannerSlides} />
      </div>
    </MainLayout>
  )
}
