import { useQuery } from '@tanstack/react-query'

import { Shell } from '@/components/shell'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getAllCategoriesQuery } from '@/server/queries/categories'
import { getProductWithVariantsQuery } from '@/server/queries/products'
import { getAllSubcategoriesQuery } from '@/server/queries/subcategories'
import { ProductForm } from '../components/product-form'

export default function AdminEditProduct({
  productId,
}: {
  productId: string
}) {
  const { data: categories } = useQuery(getAllCategoriesQuery())
  const { data: subcategories } = useQuery(getAllSubcategoriesQuery())
  const { data: product } = useQuery(getProductWithVariantsQuery(productId))

  return (
    <Shell className="flex flex-col">
      <div className="w-full">
        <Card>
          <CardHeader>
            <CardTitle className="font-bold text-2xl">Edit Product</CardTitle>
            <CardDescription>Update your product information</CardDescription>
          </CardHeader>
          <CardContent>
            <ProductForm
              product={product}
              categories={categories || []}
              subcategories={subcategories || []}
            />
          </CardContent>
        </Card>
      </div>
    </Shell>
  )
}
