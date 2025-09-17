import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(site)/product/$productId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/product/$id"!</div>
}
