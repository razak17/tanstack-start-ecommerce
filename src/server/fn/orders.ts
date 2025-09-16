import { createServerFn, json } from '@tanstack/react-start'

import { authenticatedMiddleware } from './middleware'
import { UserRole } from '@/types'
import { getDashboardStats } from '../data-access/orders'

export const getDashboardStatsFn = createServerFn({ method: 'GET' })
  .middleware([authenticatedMiddleware])
  .handler(async ({ context }) => {
    if (context.role !== UserRole.Admin) {
      throw json(
        { message: 'You are not authorized to access this resource.' },
        { status: 403 },
      )
    }
    return await getDashboardStats()
  })
