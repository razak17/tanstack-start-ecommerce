import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

import ResetPassword from '@/features/auth/reset-password'

export const Route = createFileRoute('/(auth)/(public)/reset-password/')({
  validateSearch: z.object({
    token: z.string().optional(),
  }),
  component: ResetPassword,
})
