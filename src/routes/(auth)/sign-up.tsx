import { createFileRoute, redirect } from '@tanstack/react-router'

import { seo } from '@/lib/seo'

import SignUp from '@/features/auth/sign-up'

export const Route = createFileRoute('/(auth)/sign-up')({
  beforeLoad: async ({ context }) => {
    if (!context.user?.isAnonymous) {
      throw redirect({ to: '/' })
    }
  },
  meta: seo({
    title: 'Sign Up',
    description: 'Sign up for an account',
  }),
  component: SignUp,
})
