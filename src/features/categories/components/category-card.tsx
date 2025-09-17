import { useSuspenseQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import * as React from 'react'

import { Icons } from '@/components/icons'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import type { Category } from '@/server/db/schema'
import { getProductCountByCategoryQuery } from '@/server/queries/products'

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      to="/collections/$categorySlug"
      params={{ categorySlug: category.slug }}
    >
      <Card className="h-full rounded-lg transition-colors hover:bg-muted/25">
        <CardHeader className="flex-1">
          <CardTitle className="capitalize">{category.name}</CardTitle>
          <CardDescription className="line-clamp-3 text-balance">
            {category.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <React.Suspense fallback={<Skeleton className="h-4 w-20" />}>
            <ProductCount categoryId={category.id} />
          </React.Suspense>
        </CardContent>
      </Card>
    </Link>
  )
}

interface ProductCountProps {
  categoryId: string
}

function ProductCount({ categoryId }: ProductCountProps) {
  const { data: count } = useSuspenseQuery(
    getProductCountByCategoryQuery(categoryId),
  )

  return (
    <div className="flex w-fit items-center text-[0.8rem] text-muted-foreground">
      <Icons.product className="mr-1.5 size-3.5" aria-hidden="true" />
      {count} products
    </div>
  )
}
