import { createFileRoute, redirect } from '@tanstack/react-router'

import SignIn from '@/features/auth/sign-in'

export const Route = createFileRoute('/(auth)/sign-in')({
  beforeLoad: async ({ context }) => {
    if (context.user && !context.user.isAnonymous) {
      throw redirect({ to: '/' })
    }
  },
  component: SignIn,
})
