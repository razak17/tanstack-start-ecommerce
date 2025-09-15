import { useQueryClient } from '@tanstack/react-query'
import { useNavigate, useRouter } from '@tanstack/react-router'
import * as React from 'react'
import { toast } from 'sonner'

import { authClient } from '@/lib/auth/client'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'

export function AnonymousSignIn() {
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const handleSignInAnonymous = async () => {
    await authClient.signIn.anonymous({
      fetchOptions: {
        onSuccess: () => {
          toast.success('Signed in successfully.')
          queryClient.resetQueries()
          router.invalidate()
          navigate({ to: '/' })
        },
        onError: (ctx) => {
          toast.error(ctx.error.message)
        },
        onRequest: () => setIsLoading(true),
        onResponse: () => setIsLoading(false),
      },
    })
  }

  return (
    <Button
      disabled={isLoading}
      variant="outline"
      className="w-full bg-background"
      onClick={handleSignInAnonymous}
    >
      {isLoading && (
        <Icons.spinner
          className="mr-2 size-4 animate-spin"
          aria-hidden="true"
        />
      )}
      Anonymous Login
    </Button>
  )
}
