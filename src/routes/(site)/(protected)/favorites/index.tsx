import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(site)/(protected)/favorites/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authed/favorites/"!</div>
}
