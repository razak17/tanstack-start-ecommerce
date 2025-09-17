import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/(site)/(protected)')({
  loader: ({ context: { user } }) => {
    if (!user) throw redirect({ to: '/sign-in' })
  },
  component: () => {
    return <Outlet />
  },
})
