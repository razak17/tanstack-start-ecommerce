import { GemIcon, PackageCheckIcon, TruckIcon } from 'lucide-react'

import { ContentSection } from './content-section'
import { Shell } from '@/components/shell'
import { CategoryCard } from '@/features/categories/components/category-card'
import { ProductCard } from '@/features/products/components/product-card'
import type { Category, FeaturedProduct } from '@/server/db/schema'

interface LobbyProps {
  categories: Category[]
  products: FeaturedProduct[]
}

export function Lobby({ categories, products }: LobbyProps) {
  const infoSection = [
    {
      title: 'Fast & free shipping',
      description:
        'Every single order ships for free. No minimums, no tiers, no fine print whatsoever.',
      icon: TruckIcon,
    },
    {
      title: 'Quality guarantee',
      description:
        'All products undergo rigorous testing to ensure the highest quality and reliability standards.',
      icon: PackageCheckIcon,
    },
    {
      title: 'Premium support',
      description:
        'Get expert technical support and guidance from our dedicated customer service team.',
      icon: GemIcon,
    },
  ]

  return (
    <>
      <Shell className="max-w-6xl gap-0">
        <section className="space-y-6 pt-14 md:pt-20 lg:pt-24">
          <div className="mb-4 flex max-w-6xl flex-col items-center gap-1 text-center">
            <h2 className="font-bold text-2xl leading-[1.1] tracking-wide md:text-3xl">
              Shop by Category
            </h2>
            <p className="max-w-4xl text-balance text-muted-foreground text-sm leading-normal sm:text-base sm:leading-7">
              Explore our diverse range of product categories to find exactly
              what you're looking for.
            </p>
          </div>
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 md:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard key={category.name} category={category} />
            ))}
          </div>
        </section>

        <ContentSection
          title="Featured products"
          description="Discover our hand-picked selection of premium products."
          href="/shop"
          linkText="View all products"
          className="pt-14 md:pt-20 lg:pt-24"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ContentSection>
      </Shell>

      <section className="container space-y-6 bg-primary py-14">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h2 className="max-w-5xl font-bold text-2xl text-primary-foreground leading-[1.1] tracking-wide md:text-3xl">
            We're tackling the biggest challenges in laptops and electronic
            products.
          </h2>
          <p className="max-w-3xl text-lg text-primary-foreground/80">
            Delivering innovative solutions for modern technology needs with
            quality, reliability, and exceptional customer experience.
          </p>
        </div>

        <div className="container grid max-w-6xl grid-cols-1 gap-6 pt-6 sm:grid-cols-2 md:grid-cols-3">
          {infoSection.map((section, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-2 text-center"
            >
              <section.icon className="size-12 text-primary-foreground" />
              <div className="font-semibold text-lg text-primary-foreground">
                {section.title}
              </div>
              <p className="mt-3 text-primary-foreground/80 text-sm">
                {section.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
