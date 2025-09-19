import { queryOptions } from '@tanstack/react-query'

import { getUserFn } from '../fn/users'

export const userQueryKey = ['auth', 'user'] as const

export function userQueryOptions() {
  return queryOptions({
    queryKey: [...userQueryKey, 'user'],
    queryFn: () => getUserFn(),
    staleTime: 5000,
  })
}
