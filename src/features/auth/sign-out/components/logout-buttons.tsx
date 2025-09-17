import { useQueryClient } from '@tanstack/react-query'
import { useNavigate, useRouter } from '@tanstack/react-router'

import { authClient } from '@/lib/auth/client'
import { useMounted } from '@/lib/hooks/use-mounted'
import { cn } from '@/lib/utils'

import { Button, buttonVariants } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

export function LogOutButtons() {
  const router = useRouter()
  const navigate = useNavigate()
  const mounted = useMounted()
  const queryClient = useQueryClient()

  return (
    <div className="flex w-full flex-col-reverse items-center gap-2 sm:flex-row">
      <Button
        variant="secondary"
        size="sm"
        className="w-full"
        onClick={() => router.history.back()}
      >
        Go back
        <span className="sr-only">Previous page</span>
      </Button>
      {mounted ? (
        <Button
          size="sm"
          className="w-full"
          onClick={async () => {
            await authClient.signOut()
            queryClient.resetQueries()
            navigate({ to: '/' })
          }}
        >
          Log out
          <span className="sr-only">Log out</span>
        </Button>
      ) : (
        <Skeleton
          className={cn(
            buttonVariants({ size: 'sm' }),
            'w-full bg-muted text-muted-foreground',
          )}
        >
          Log out
        </Skeleton>
      )}
    </div>
  )
}
