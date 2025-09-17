import { useQuery } from '@tanstack/react-query'

import { CategoryDialog } from './components/category-dialog'
import { CategoryForm } from './components/category-form'
import { Shell } from '@/components/shell'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getAllCategoriesQuery } from '@/server/queries/categories'

export default function AdminCategories() {
  const { data: categories } = useQuery(getAllCategoriesQuery())

  return (
    <Shell>
      <div className="flex w-full flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-bold text-2xl">
              Create New Category
            </CardTitle>
            <CardDescription>
              Add a new product category to organize your products
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CategoryForm />
          </CardContent>
        </Card>
        <Card className="mx-auto w-full">
          <CardHeader>
            <CardTitle className="font-bold text-2xl">
              Categories List
            </CardTitle>
            <CardDescription>List of categories</CardDescription>
          </CardHeader>
          <CardContent>
            <CategoryDialog categories={categories} />
          </CardContent>
        </Card>
      </div>
    </Shell>
  )
}
