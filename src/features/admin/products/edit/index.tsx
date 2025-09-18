import { useSuspenseQuery } from '@tanstack/react-query'
import { Suspense } from 'react'

import { Shell } from '@/components/shell'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getProductWithVariantsQuery } from '@/server/queries/products'
import { ProductForm } from '../components/product-form'

export default function AdminEditProduct({ productId }: { productId: string }) {
  return (
    <Shell className="flex flex-col">
      <div className="w-full">
        <Card>
          <CardHeader>
            <CardTitle className="font-bold text-2xl">Edit Product</CardTitle>
            <CardDescription>Update your product information</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading...</div>}>
              <AdminEditProductsContent productId={productId} />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </Shell>
  )
}

function AdminEditProductsContent({ productId }: { productId: string }) {
  const { data: product } = useSuspenseQuery(
    getProductWithVariantsQuery(productId),
  )
  return <ProductForm product={product} />
}
