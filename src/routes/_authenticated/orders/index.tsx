import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/orders/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/orders"!</div>
}
