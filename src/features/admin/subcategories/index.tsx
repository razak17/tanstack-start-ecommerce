import { useQuery } from '@tanstack/react-query'

import { SubcategoryDialog } from './components/subcategory-dialog'
import { SubcategoryForm } from './components/subcategory-form'
import { Shell } from '@/components/shell'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getAllSubcategoriesQuery } from '@/server/queries/subcategories'

export default function AdminSubcategories() {
  const { data: subcategories } = useQuery(getAllSubcategoriesQuery())

  return (
    <Shell>
      <div className="flex w-full flex-col gap-6">
        <div className="flex flex-col gap-6 md:flex-row">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="font-bold text-2xl">
                Create New Subcategory
              </CardTitle>
              <CardDescription>
                Add a new product subcategory to organize your products
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SubcategoryForm />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-bold text-2xl">
                Subcategories List
              </CardTitle>
              <CardDescription>
                Manage your product subcategories{' '}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <SubcategoryDialog subcategories={subcategories} />
          </CardContent>
        </Card>
      </div>
    </Shell>
  )
}
