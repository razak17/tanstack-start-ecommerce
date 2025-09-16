import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/(authed)/orders')({
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({ to: '/sign-in' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/orders"!</div>
}
