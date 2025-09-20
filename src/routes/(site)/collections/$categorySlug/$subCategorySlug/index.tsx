import { useSuspenseQuery } from '@tanstack/react-query'
import {
  createFileRoute,
  getRouteApi,
  useNavigate,
} from '@tanstack/react-router'
import React from 'react'

import { toTitleCase, unslugify } from '@/lib/utils'
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
import { getSubcategoryBySlugQuery } from '@/server/queries/subcategories'

export const Route = createFileRoute(
  '/(site)/collections/$categorySlug/$subCategorySlug/',
)({
  component: RouteComponent,
  validateSearch: productsSearchParamsSchema,
})

function RouteComponent() {
  const { categorySlug, subCategorySlug } = Route.useParams()
  const ctx = Route.useRouteContext()

  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading size="sm">
          {toTitleCase(categorySlug)}
        </PageHeaderHeading>
        <PageHeaderDescription size="sm">
          {`Buy the best ${unslugify(subCategorySlug)} ${categorySlug}`}
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
        <ProductsList
          categorySlug={categorySlug}
          subCategorySlug={subCategorySlug}
          userId={ctx?.user?.id}
        />
      </React.Suspense>
    </Shell>
  )
}

function ProductsList({
  categorySlug,
  subCategorySlug,
  userId,
}: {
  categorySlug: string
  subCategorySlug: string
  userId?: string
}) {
  const filters = getRouteApi(
    '/(site)/collections/$categorySlug/$subCategorySlug/',
  ).useSearch()

  const navigate = useNavigate()
  const setFilters = (newFilters: Partial<ProductsSearchParamsSchema>) => {
    navigate({ from: Route.fullPath, search: newFilters })
  }

  const { data: categoryData } = useSuspenseQuery(
    getCategoryBySlugQuery(categorySlug),
  )

  const { data: subcategoryData } = useSuspenseQuery(
    getSubcategoryBySlugQuery(subCategorySlug),
  )

  const searchParamsWithFilters = {
    ...filters,
    ...(categoryData && { categories: categoryData.id }),
    ...(subcategoryData && { subcategories: subcategoryData.id }),
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
