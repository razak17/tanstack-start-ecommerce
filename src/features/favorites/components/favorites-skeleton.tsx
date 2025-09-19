import { Skeleton } from '@/components/ui/skeleton'
import { Shell } from '@/components/shell'

export function FavoritesSkeleton() {
  return (
    <Shell>
      <section className="space-y-6">
        <div className="flex flex-col gap-4">
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-5 w-32" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-[4/3] w-full rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="flex items-center justify-between">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Shell>
  )
}
