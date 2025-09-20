/** biome-ignore-all lint/correctness/useExhaustiveDependencies: false */
import { ChevronDownIcon } from '@radix-ui/react-icons'
import * as React from 'react'

import { cn, toTitleCase } from '@/lib/utils'
import {
  type ProductsSearchParamsSchema,
  productsSearchParamsSchema,
} from '@/lib/validations/params'

import { ProductCard } from './product-card'
import { MultiSelect } from '@/components/multi-select'
import { PaginationButton } from '@/components/pagination-button'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Slider } from '@/components/ui/slider'
import { queryConfig } from '@/config/query'
import type { Category, FeaturedProduct, Subcategory } from '@/server/db/schema'
import type { Option } from '@/types'
import { useProductsFilter } from '../hooks/use-products-filter'

interface ProductsProps {
  products: FeaturedProduct[]
  pageCount: number
  categories?: string[]
  category?: Category
  subcategories?: Subcategory[]
  filters: Partial<ProductsSearchParamsSchema>
  onSetFilters: (newFilters: Partial<ProductsSearchParamsSchema>) => void
}

export function Products({
  products,
  pageCount,
  category,
  categories,
  subcategories,
  filters,
  onSetFilters,
}: ProductsProps) {
  const [isPending, startTransition] = React.useTransition()

  const { priceRange, setPriceRange, setFilter } = useProductsFilter(
    filters,
    onSetFilters,
  )

  const clearFilters = () => {
    onSetFilters(productsSearchParamsSchema.parse({}))
    setPriceRange([0, 500])
  }

  // Category filter
  const [selectedCategories, setSelectedCategories] = React.useState<
    Option[] | null
  >(
    filters?.categories
      ? filters?.categories.split('.').map((c) => ({
          label: toTitleCase(c),
          value: c,
        }))
      : null,
  )

  React.useEffect(() => {
    onSetFilters({
      categories: selectedCategories?.length
        ? // Join categories with a dot to make search params prettier
          selectedCategories
            .map((c) => c.value)
            .join('.')
        : null,
    })
  }, [selectedCategories])

  // Subcategory filter
  const [selectedSubcategories, setSelectedSubcategories] = React.useState<
    Option[] | null
  >(
    filters?.subcategories
      ? filters?.subcategories?.split('.').map((c) => ({
          label: toTitleCase(c),
          value: c,
        }))
      : null,
  )

  React.useEffect(() => {
    onSetFilters({
      subcategories: selectedSubcategories?.length
        ? selectedSubcategories.map((s) => s.value).join('.')
        : null,
    })
  }, [selectedSubcategories])

  return (
    <section className="flex flex-col space-y-6">
      <div className="flex items-center space-x-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button aria-label="Filter products" size="sm" disabled={isPending}>
              Filter
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col">
            <SheetHeader className="px-1">
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <Separator />
            <div className="flex flex-1 flex-col gap-5 overflow-hidden p-1">
              <Card className="space-y-4 rounded-lg p-3">
                <h3 className="font-medium text-foreground text-sm tracking-wide">
                  Price range ($)
                </h3>
                <Slider
                  defaultValue={[0, 500]}
                  max={500}
                  step={1}
                  value={priceRange}
                  onValueChange={(value: typeof priceRange) =>
                    setPriceRange(value)
                  }
                  className="w-full"
                />
                <div className="flex items-center space-x-4">
                  <Input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={priceRange[1]}
                    value={priceRange[0]}
                    onChange={(e) => {
                      const value = Number(e.target.value)
                      setPriceRange([value, priceRange[1]])
                    }}
                  />
                  <span className="text-muted-foreground">-</span>
                  <Input
                    type="number"
                    inputMode="numeric"
                    min={priceRange[0]}
                    max={500}
                    value={priceRange[1]}
                    onChange={(e) => {
                      const value = Number(e.target.value)
                      setPriceRange([priceRange[0], value])
                    }}
                  />
                </div>
              </Card>
              {categories?.length ? (
                <Card className="space-y-4 rounded-lg p-3">
                  <h3 className="font-medium text-foreground text-sm tracking-wide">
                    Categories
                  </h3>
                  <MultiSelect
                    placeholder="Select categories"
                    selected={selectedCategories}
                    setSelected={setSelectedCategories}
                    options={categories.map((c) => ({
                      label: toTitleCase(c),
                      value: c,
                    }))}
                  />
                </Card>
              ) : null}
              {category ? (
                <Card className="space-y-4 rounded-lg p-3">
                  <h3 className="font-medium text-foreground text-sm tracking-wide">
                    Subcategories
                  </h3>
                  <MultiSelect
                    placeholder="Select subcategories"
                    selected={selectedSubcategories}
                    setSelected={setSelectedSubcategories}
                    options={
                      subcategories?.map((c) => ({
                        label: c.name,
                        value: c.id,
                      })) ?? []
                    }
                  />
                </Card>
              ) : null}
            </div>
            <div>
              <Separator className="my-4" />
              <SheetFooter>
                <Button
                  aria-label="Clear filters"
                  size="sm"
                  className="w-full"
                  onClick={clearFilters}
                  disabled={isPending}
                >
                  Clear Filters
                </Button>
              </SheetFooter>
            </div>
          </SheetContent>
        </Sheet>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-label="Sort products" size="sm" disabled={isPending}>
              Sort
              <ChevronDownIcon className="ml-2 size-4" aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {queryConfig.product.sortOptions.map((option) => (
              <DropdownMenuItem
                key={option.label}
                className={cn(
                  option.value === filters?.sort && 'bg-accent font-bold',
                )}
                onClick={() => {
                  startTransition(() => {
                    setFilter('sort', option.value)
                  })
                }}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {!isPending && !products.length ? (
        <div className="mx-auto flex max-w-xs flex-col space-y-1.5">
          <h1 className="text-center font-bold text-2xl">No products found</h1>
          <p className="text-center text-muted-foreground">
            Try changing your filters, or check back later for new products
          </p>
        </div>
      ) : null}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {products.length ? (
        <PaginationButton
          pageCount={pageCount}
          page={filters?.page}
          per_page={filters?.per_page}
          sort={filters?.sort}
          onSetFilters={onSetFilters}
        />
      ) : null}
    </section>
  )
}
