import { createServerFn, json } from '@tanstack/react-start'

import { UserRole } from '@/types'
import { getDashboardStats } from '../data-access/orders'
import { authed } from '../middlewares/auth'

export const getDashboardStatsFn = createServerFn({ method: 'GET' })
  .middleware([authed])
  .handler(async ({ context: { user } }) => {
    if (user.role !== UserRole.Admin) {
      throw json(
        { message: 'You are not authorized to access this resource.' },
        { status: 403 },
      )
    }
    return await getDashboardStats()
  })
