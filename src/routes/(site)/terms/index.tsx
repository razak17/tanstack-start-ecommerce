import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(site)/terms/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(site)/terms/"!</div>
}
