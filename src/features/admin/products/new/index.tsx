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
import { getAllSubcategoriesQuery } from '@/server/queries/subcategories'
import { ProductForm } from '../components/product-form'

export default function AdminNewProduct() {
  const { data: categories } = useQuery(getAllCategoriesQuery())
  const { data: subcategories } = useQuery(getAllSubcategoriesQuery())

  return (
    <Shell>
      <div className="w-full">
        <Card>
          <CardHeader>
            <CardTitle className="font-bold text-2xl">
              Create New Product
            </CardTitle>
            <CardDescription>
              Add a new product to your inventory
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProductForm
              categories={categories || []}
              subcategories={subcategories || []}
            />
          </CardContent>
        </Card>
      </div>
    </Shell>
  )
}
