import { createFileRoute, redirect } from '@tanstack/react-router'

import SignUp from '@/features/auth/sign-up'

export const Route = createFileRoute('/(auth)/(public)/sign-up/')({
  beforeLoad: async ({ context: { user } }) => {
    if (user && !user.isAnonymous) {
      throw redirect({ to: '/' })
    }
  },
  component: SignUp,
})
