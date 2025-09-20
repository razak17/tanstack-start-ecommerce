import { FilterIcon } from 'lucide-react'
import { useMemo, useState } from 'react'

import {
  type ProductsSearchParamsSchema,
  productsSearchParamsSchema,
} from '@/lib/validations/params'

import { PriceRangeForm } from './price-range-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

interface ProductFiltersProps {
  filters: Partial<ProductsSearchParamsSchema>
  onSetFilters: (newFilters: Partial<ProductsSearchParamsSchema>) => void
  categories: Array<{ id: string; name: string }>
  subcategories: Array<{ id: string; name: string; categoryId: string }>
}

export function ProductFilters({
  filters,
  onSetFilters,
  categories,
  subcategories,
}: ProductFiltersProps) {
  const selectedCategories = filters?.categories?.split('.') || []
  const selectedSubcategories = filters?.subcategories?.split('.') || []
  const [minPrice, maxPrice] = filters?.price_range?.split('-').map(Number) || [
    0, 50000,
  ]

  const [isOpen, setIsOpen] = useState(false)

  const filteredSubcategories = useMemo(() => {
    if (selectedCategories.length === 0) return subcategories
    return subcategories.filter((sub) =>
      selectedCategories.includes(sub.categoryId),
    )
  }, [subcategories, selectedCategories])

  const toggleCategory = (categoryId: string) => {
    const newSelected = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId]

    onSetFilters({
      categories: newSelected.length > 0 ? newSelected.join('.') : null,
    })

    if (!selectedCategories.includes(categoryId)) {
      const relevantSubcategories = selectedSubcategories.filter((subId) =>
        subcategories.find(
          (sub) => sub.id === subId && sub.categoryId === categoryId,
        ),
      )
      if (relevantSubcategories.length !== selectedSubcategories.length) {
        onSetFilters({
          subcategories:
            selectedSubcategories
              .filter(
                (subId) =>
                  !subcategories.find(
                    (sub) => sub.id === subId && sub.categoryId === categoryId,
                  ),
              )
              .join('.') || null,
        })
      }
    }
  }

  const toggleSubcategory = (subcategoryId: string) => {
    const newSelected = selectedSubcategories.includes(subcategoryId)
      ? selectedSubcategories.filter((id) => id !== subcategoryId)
      : [...selectedSubcategories, subcategoryId]

    onSetFilters({
      subcategories: newSelected.length > 0 ? newSelected.join('.') : null,
    })
  }

  const clearFilters = () => {
    onSetFilters(productsSearchParamsSchema.parse({}))
  }

  const FilterContent = () => (
    <Card>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">Filters</h3>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear all
              </Button>
            </div>
            <Separator />
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Categories</h4>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={() => toggleCategory(category.id)}
                  />
                  <Label
                    htmlFor={`category-${category.id}`}
                    className="cursor-pointer font-normal text-sm"
                  >
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {filteredSubcategories.length > 0 && (
            <>
              <Separator />
              <div className="space-y-4">
                <h4 className="font-medium">Subcategories</h4>
                <div className="space-y-3">
                  {filteredSubcategories.map((subcategory) => (
                    <div
                      key={subcategory.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`subcategory-${subcategory.id}`}
                        checked={selectedSubcategories.includes(subcategory.id)}
                        onCheckedChange={() =>
                          toggleSubcategory(subcategory.id)
                        }
                      />
                      <Label
                        htmlFor={`subcategory-${subcategory.id}`}
                        className="cursor-pointer font-normal text-sm"
                      >
                        {subcategory.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium">Price Range</h4>
            <PriceRangeForm
              minPrice={minPrice}
              maxPrice={maxPrice}
              updateFilters={(range) => {
                onSetFilters({ price_range: range })
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <>
      <div className="hidden lg:block">
        <FilterContent />
      </div>

      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <FilterIcon className="h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 px-4">
            <SheetHeader>
              <SheetTitle></SheetTitle>
            </SheetHeader>
            <div className="mt-6 overflow-y-auto">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
