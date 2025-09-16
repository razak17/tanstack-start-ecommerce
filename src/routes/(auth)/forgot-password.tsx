import { createFileRoute } from '@tanstack/react-router'

import { seo } from '@/lib/seo'

export const Route = createFileRoute('/(auth)/forgot-password')({
  head: () => ({
    meta: seo({
      title: 'Forgot Password',
      description: 'Enter your email to reset your password',
    }),
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(auth)/forgot-password"!</div>
}
