import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/subcategories/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_admin/admin/subcategories/"!</div>
}
