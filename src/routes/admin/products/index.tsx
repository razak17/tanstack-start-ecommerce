import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/products/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_admin/admin/products/"!</div>
}
