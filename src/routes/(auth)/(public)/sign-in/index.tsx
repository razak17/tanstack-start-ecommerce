import { createFileRoute, redirect } from '@tanstack/react-router'

import SignIn from '@/features/auth/sign-in'

export const Route = createFileRoute('/(auth)/(public)/sign-in/')({
  beforeLoad: async ({ context: { user } }) => {
    if (user && !user.isAnonymous) {
      throw redirect({ to: '/' })
    }
  },
  component: SignIn,
})
