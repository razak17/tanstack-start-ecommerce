import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

export function CheckoutCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-x-4 py-4">
        <Skeleton className="h-6 w-16 flex-1" />
        <Skeleton className="h-9 w-40" />
      </CardHeader>
      <Separator className="mb-4" />
      <CardContent className="pr-0 pb-6 pl-6">
        <div className="max-h-[280px] space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-16 w-16 rounded-md" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <Separator className="mb-4" />
      <CardFooter className="space-x-4">
        <Skeleton className="h-4 w-20 flex-1" />
        <Skeleton className="h-4 w-16" />
      </CardFooter>
    </Card>
  )
}
