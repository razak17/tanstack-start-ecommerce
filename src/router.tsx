import { QueryClient } from '@tanstack/react-query'
import { createRouter as createTanstackRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'

import { DefaultCatchBoundary } from './components/default-catch-boundary'
import { NotFound } from './components/not-found'
// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
export const createRouter = () => {
  const queryClient = new QueryClient()

  const router = createTanstackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    context: { queryClient },
    defaultPreload: 'intent',
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => <NotFound />,
  })

  setupRouterSsrQueryIntegration({
    router,
    queryClient,
  })

  return router
}

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
