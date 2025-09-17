import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/logout/')({
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({ to: '/' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(auth)/logout/"!</div>
}
