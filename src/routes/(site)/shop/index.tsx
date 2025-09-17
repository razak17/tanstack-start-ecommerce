import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(site)/shop/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <h1>Hello "/(site)/shop/"!</h1>
    </div>
  )
}
