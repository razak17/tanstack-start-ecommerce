import { useSuspenseQuery } from '@tanstack/react-query'

import { useAuthentication } from '@/lib/auth/client'

import { Lobby } from './components/lobby'
import { getFeaturedCategoriesQuery } from '@/server/queries/categories'
import { getFeaturedProductsQuery } from '@/server/queries/products'

export default function LandingPage() {
  const { user } = useAuthentication()
  const { data: featuredCategories } = useSuspenseQuery(
    getFeaturedCategoriesQuery(),
  )
  const { data: featuredProducts } = useSuspenseQuery(
    getFeaturedProductsQuery(user?.id),
  )

  return <Lobby categories={featuredCategories} products={featuredProducts} />
}
