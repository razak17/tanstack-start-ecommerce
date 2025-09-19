import { createServerFn } from '@tanstack/react-start'

import { getDashboardStats } from '../data-access/orders'
import { adminOnly } from '../middlewares/auth'

export const getDashboardStatsFn = createServerFn({ method: 'GET' })
  .middleware([adminOnly])
  .handler(async () => {
    return await getDashboardStats()
  })
