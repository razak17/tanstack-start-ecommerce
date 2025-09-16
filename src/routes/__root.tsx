import type { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { env } from '@/lib/env/client'

import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { userQueryOptions } from '@/server/queries/user'
import appCss from '@/styles/app.css?url'
import { siteConfig } from '../config/site'
import { seo } from '../lib/seo'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.fetchQuery(userQueryOptions())

    return { user }
  },
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
      ...seo({
        title: siteConfig.name,
        description: siteConfig.description,
        keywords: 'ecommerce, online store, shopping, electronics',
        disableTitleSuffix: true,
      }),
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider>
          <div className="min-h-screen bg-background">
            <main>{children}</main>
          </div>
          {env.VITE_APP_ENV === 'development' && (
            <>
              <TanStackRouterDevtools position="bottom-right" />
              <ReactQueryDevtools buttonPosition="bottom-left" />
            </>
          )}
          <Toaster />
          <Scripts />
        </ThemeProvider>
      </body>
    </html>
  )
}
