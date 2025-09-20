import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

import {
  type ProductsSearchParamsSchema,
  productsSearchParamsSchema,
} from '@/lib/validations/params'

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { PaginationButton } from '@/components/pagination-button'
import { Shell } from '@/components/shell'
import { ProductFilters } from '@/features/products/components/product-filters'
import { ProductsGrid } from '@/features/products/components/products-grid'
import { getAllCategoriesQuery } from '@/server/queries/categories'
import { getProductsQuery } from '@/server/queries/products'
import { getAllSubcategoriesQuery } from '@/server/queries/subcategories'

export const Route = createFileRoute('/(site)/shop/')({
  beforeLoad: async ({ context }) => {
    const [products, categories, subcategories] = await Promise.all([
      context.queryClient.ensureQueryData(
        getProductsQuery(
          productsSearchParamsSchema.parse({}),
          context?.user?.id,
        ),
      ),
      context.queryClient.ensureQueryData(getAllCategoriesQuery()),
      context.queryClient.ensureQueryData(getAllSubcategoriesQuery()),
    ])

    return { products, categories, subcategories }
  },
  validateSearch: productsSearchParamsSchema,
  component: RouteComponent,
})

function RouteComponent() {
  const ctx = Route.useRouteContext()
  const filters = Route.useSearch()

  const navigate = useNavigate()
  const setFilters = (newFilters: Partial<ProductsSearchParamsSchema>) => {
    navigate({ from: Route.fullPath, search: newFilters })
  }

  const { categories, subcategories, user } = ctx

  const { data: products } = useSuspenseQuery(
    getProductsQuery(filters, user?.id),
  )

  return (
    <Shell className="min-h-screen">
      <PageHeader>
        <PageHeaderHeading>Shop</PageHeaderHeading>
        <PageHeaderDescription>
          Discover our collection of products
        </PageHeaderDescription>
      </PageHeader>

      <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
        <aside className="w-full lg:w-72 lg:shrink-0">
          <ProductFilters
            categories={categories}
            subcategories={subcategories}
            filters={filters}
            onSetFilters={setFilters}
          />
        </aside>

        <main className="flex-1 space-y-6">
          <ProductsGrid products={products.data} />
          {products.pageCount > 1 && (
            <div className="flex justify-center">
              <PaginationButton
                pageCount={products.pageCount}
                page={filters.page}
                per_page={filters.per_page}
                sort={filters.sort}
                onSetFilters={setFilters}
              />
            </div>
          )}
        </main>
      </div>
    </Shell>
  )
}
