import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/(authed)/favorites/')({
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({ to: '/sign-in' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/favorites"!</div>
}
