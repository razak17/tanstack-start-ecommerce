import { queryOptions } from '@tanstack/react-query'

import { getDashboardStatsFn } from '../fn/orders'

export const ordersQueryKey = ['orders'] as const

export function getDashboardOrdersQuery() {
  return queryOptions({
    queryKey: [...ordersQueryKey, 'dashboard-orders'],
    queryFn: () => getDashboardStatsFn(),
  })
}
