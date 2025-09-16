import { createFileRoute, redirect } from '@tanstack/react-router'

import SignUp from '@/features/auth/sign-up'

export const Route = createFileRoute('/(auth)/sign-up')({
  beforeLoad: async ({ context }) => {
    if (!context.user?.isAnonymous) {
      throw redirect({ to: '/' })
    }
  },
  component: SignUp,
})
