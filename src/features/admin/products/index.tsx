import { IconPlus } from '@tabler/icons-react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { Suspense } from 'react'

import { ProductsTable } from './components/products-table'
import { ProductsTableSkeleton } from './components/products-table-skeleton'
import { Shell } from '@/components/shell'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getAllProductsQuery } from '@/server/queries/products'

export default function AdminProducts() {
  return (
    <Shell className="flex flex-col">
      <div className="w-full">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <CardTitle className="font-bold text-2xl">Products</CardTitle>
                <CardDescription>
                  Manage your product listings and inventory
                </CardDescription>
              </div>
              <Button asChild>
                <Link
                  className="flex items-center gap-2"
                  to="/admin/products/new"
                >
                  <IconPlus className="size-4" />
                  Add New Product
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<ProductsTableSkeleton />}>
              <AdminProductsContent />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </Shell>
  )
}

function AdminProductsContent() {
  const { data: products } = useSuspenseQuery(getAllProductsQuery())

  if (products.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-bold text-2xl">
            No products found
          </CardTitle>
          <CardDescription>
            You haven't created any products yet. Create your first product to
            get started.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Products ({products.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <ProductsTable products={products} />
      </CardContent>
    </Card>
  )
}
