import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(site)/privacy/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(site)/privacy/"!</div>
}
