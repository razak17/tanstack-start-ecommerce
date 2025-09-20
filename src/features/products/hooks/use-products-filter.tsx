/** biome-ignore-all lint/correctness/useExhaustiveDependencies: false */

import * as React from 'react'

import { useDebounce } from '@/lib/hooks/use-debounce'
import type { ProductsSearchParamsSchema } from '@/lib/validations/params'

const PRICE_RANGE = [0, 500]

export const useProductsFilter = (
  filters: Partial<ProductsSearchParamsSchema>,
  onSetFilters: (newFilters: Partial<ProductsSearchParamsSchema>) => void,
) => {
  const [priceRange, setPriceRange] = React.useState<[number, number]>(() => {
    if (filters?.price_range) {
      const [min, max] = filters.price_range.split('-').map(Number)
      return [min || PRICE_RANGE[0], max || PRICE_RANGE[1]]
    }
    return [0, 500]
  })

  const setFilter = <K extends keyof ProductsSearchParamsSchema>(
    key: K,
    value: ProductsSearchParamsSchema[K],
  ) => {
    onSetFilters({ ...filters, [key]: value })
  }

  const debouncedPrice = useDebounce(priceRange, 200)

  React.useEffect(() => {
    const [min, max] = debouncedPrice
    setFilter('price_range', min === 0 && max === 500 ? null : `${min}-${max}`)
  }, [debouncedPrice])

  return {
    priceRange,
    setPriceRange,
    setFilter,
  }
}
