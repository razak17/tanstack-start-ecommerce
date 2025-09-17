import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(site)/cart/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(site)/cart/"!</div>
}
