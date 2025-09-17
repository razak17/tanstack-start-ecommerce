import { createFileRoute, redirect } from '@tanstack/react-router'

import SignOutPage from '@/features/auth/sign-out'

export const Route = createFileRoute('/(auth)/sign-out/')({
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({ to: '/' })
    }
  },
  component: SignOutPage,
})
