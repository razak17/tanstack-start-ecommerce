import { createFileRoute } from '@tanstack/react-router'

import { seo } from '@/lib/seo'

export const Route = createFileRoute('/(auth)/(public)/reset-password/')({
  head: () => ({
    meta: seo({
      title: 'Reset Password',
      description: 'Reset your password',
    }),
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(auth)/reset-password"!</div>
}
