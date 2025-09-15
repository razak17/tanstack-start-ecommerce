import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import * as React from 'react'
import { toast } from 'sonner'

import { authClient } from '@/lib/auth/client'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'

type OAuthStrategy = 'google' | 'github'

const oauthProviders = [
  { name: 'Google', strategy: 'google', icon: 'google' },
  { name: 'GitHub', strategy: 'github', icon: 'gitHub' },
] satisfies {
  name: string
  icon: keyof typeof Icons
  strategy: OAuthStrategy
}[]

export function OAuthSignIn() {
  const [isLoading, setIsLoading] = React.useState<OAuthStrategy | null>(null)
  const router = useRouter()
  const queryClient = useQueryClient()

  async function oauthSignIn(provider: OAuthStrategy) {
    await authClient.signIn.social(
      {
        provider: provider,
        callbackURL: '/',
      },
      {
        onSuccess: () => {
          toast.success('Signed in successfully.')
          queryClient.resetQueries()
          router.invalidate()
        },
        onError: (ctx) => {
          toast.error(ctx.error.message)
        },
        onRequest: () => setIsLoading(provider),
        onResponse: () => setIsLoading(null),
      },
    )
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      {oauthProviders.map((provider) => {
        const Icon = Icons[provider.icon]

        return (
          <Button
            key={provider.strategy}
            variant="outline"
            className="w-full bg-background"
            onClick={() => void oauthSignIn(provider.strategy)}
            disabled={isLoading !== null}
          >
            {isLoading === provider.strategy ? (
              <Icons.spinner
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
            ) : (
              <Icon className="mr-2 size-4" aria-hidden="true" />
            )}
            {provider.name}
            <span className="sr-only">{provider.name}</span>
          </Button>
        )
      })}
    </div>
  )
}
