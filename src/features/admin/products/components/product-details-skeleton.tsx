import { Shell } from '@/components/shell'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

export function ProductDetailsSkeleton() {
  return (
    <Shell className="flex flex-col">
      <div className="w-full">
        <div className="flex flex-col gap-8 md:flex-row md:gap-16">
          <div className="w-full md:w-1/2">
            <Skeleton className="aspect-square w-full rounded-lg" />
          </div>
          <Separator className="mt-4 md:hidden" />
          <div className="flex w-full flex-col gap-4 md:w-1/2">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between xl:gap-2">
              <div className="flex max-w-sm flex-col gap-2">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-48" />
              </div>
              <Skeleton className="h-10 w-32" />
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent className="space-y-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  )
}
