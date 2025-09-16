import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/collections/$categorySlug')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/collections/categorySlug"!</div>
}
