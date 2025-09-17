import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(site)/collections/$categorySlug')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(site)/collection/$categorySlug"!</div>
}
