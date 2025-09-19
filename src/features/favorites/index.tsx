import { useSuspenseQuery } from '@tanstack/react-query'
import { Suspense } from 'react'

import { useAuthentication } from '@/lib/auth/client'

import { FavoritesSkeleton } from './components/favorites-skeleton'
import { Shell } from '@/components/shell'
import { getUserFavoritesQuery } from '@/server/queries/favorites'
import { ProductCard } from '../products/components/product-card'

export default function ConsumerFavorites() {
  return (
    <Suspense fallback={<FavoritesSkeleton />}>
      <FavoritesContent />
    </Suspense>
  )
}

function FavoritesContent() {
  const { user } = useAuthentication()
  const { data: favorites, isFetching } = useSuspenseQuery(
    getUserFavoritesQuery(user?.id),
  )
  if (isFetching) {
    return <FavoritesSkeleton />
  }

  if (favorites?.length === 0) {
    return (
      <Shell className="flex h-dvh flex-col items-center justify-center">
        <section className="flex flex-col items-center text-center">
          <h1 className="mb-4 font-bold text-4xl">Your Favorites</h1>
          <p className="mb-6 text-lg text-muted-foreground">
            You haven't added any products to your favorites yet.
          </p>
          <p className="text-muted-foreground">
            Browse our products and click the heart icon to add items to your
            favorites!
          </p>
        </section>
      </Shell>
    )
  }

  return (
    <Shell>
      <section className="space-y-6">
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-3xl">Your Favorites</h1>
          <p className="text-muted-foreground">
            {favorites?.length} {favorites?.length === 1 ? 'item' : 'items'} in
            your favorites
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favorites?.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                images: product.images,
                category: product.category,
                inventory: product.inventory,
                isFavorited: true,
              }}
            />
          ))}
        </div>
      </section>
    </Shell>
  )
}
