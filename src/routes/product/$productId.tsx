import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/product/$productId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/product/$id"!</div>
}
