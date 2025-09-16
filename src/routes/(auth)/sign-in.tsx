import { createFileRoute, redirect } from '@tanstack/react-router'

import { seo } from '@/lib/seo'

import SignIn from '@/features/auth/sign-in'

export const Route = createFileRoute('/(auth)/sign-in')({
  beforeLoad: async ({ context }) => {
    if (context.user && !context.user.isAnonymous) {
      throw redirect({ to: '/' })
    }
  },
  head: () => ({
    meta: seo({
      title: 'Sign In',
      description: 'Sign in to your account',
    }),
  }),
  component: SignIn,
})
