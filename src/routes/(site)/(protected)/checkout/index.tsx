import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/(site)/(protected)/checkout/')({
  loader: ({ context: { user } }) => {
    if (!user || user?.isAnonymous) throw redirect({ to: '/sign-in' })
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(site)/(protected)/checkout/"!</div>
}
