import { useSuspenseQuery } from '@tanstack/react-query'
import {
  createFileRoute,
  getRouteApi,
  useNavigate,
} from '@tanstack/react-router'
import React from 'react'

import { toTitleCase } from '@/lib/utils'
import {
  type ProductsSearchParamsSchema,
  productsSearchParamsSchema,
} from '@/lib/validations/params'

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { Shell } from '@/components/shell'
import { ProductCardSkeleton } from '@/features/products/components/product-card-skeleton'
import { Products } from '@/features/products/components/products'
import { getCategoryBySlugQuery } from '@/server/queries/categories'
import { getProductsQuery } from '@/server/queries/products'

export const Route = createFileRoute('/(site)/collections/$categorySlug/')({
  beforeLoad: async ({ context }) => {
    await context.queryClient.ensureQueryData(
      getProductsQuery(productsSearchParamsSchema.parse({}), context?.user?.id),
    )
  },
  component: RouteComponent,
  validateSearch: productsSearchParamsSchema,
})

function RouteComponent() {
  const { categorySlug } = Route.useParams()
  const ctx = Route.useRouteContext()

  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading size="sm">
          {toTitleCase(categorySlug)}
        </PageHeaderHeading>
        <PageHeaderDescription size="sm">
          {`Buy the best ${categorySlug}`}
        </PageHeaderDescription>
      </PageHeader>
      <React.Suspense
        fallback={
          <div className="grid xs:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        }
      >
        <ProductsList categorySlug={categorySlug} userId={ctx?.user?.id} />
      </React.Suspense>
    </Shell>
  )
}

function ProductsList({
  categorySlug,
  userId,
}: {
  categorySlug: string
  userId?: string
}) {
  const filters = getRouteApi('/(site)/collections/$categorySlug/').useSearch()

  const navigate = useNavigate()
  const setFilters = (newFilters: Partial<ProductsSearchParamsSchema>) => {
    navigate({ from: Route.fullPath, search: newFilters })
  }

  const { data: categoryData } = useSuspenseQuery(
    getCategoryBySlugQuery(categorySlug),
  )

  const searchParamsWithFilters = {
    ...filters,
    ...(categoryData && { categories: categoryData.id }),
  }

  const { data: products } = useSuspenseQuery(
    getProductsQuery(searchParamsWithFilters, userId),
  )

  return (
    <Products
      products={products.data}
      pageCount={products.pageCount}
      filters={filters}
      onSetFilters={setFilters}
    />
  )
}
