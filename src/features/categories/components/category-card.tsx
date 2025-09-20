import { Link } from '@tanstack/react-router'

import { Icons } from '@/components/icons'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface CategoryCardProps {
  category: {
    id: string
    name: string
    slug: string
    description: string | null
    productCount?: number
  }
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
          <div className="flex w-fit items-center text-[0.8rem] text-muted-foreground">
            <Icons.product className="mr-1.5 size-3.5" aria-hidden="true" />
            {category.productCount ?? 0} products
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
