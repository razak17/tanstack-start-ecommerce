import { queryOptions } from '@tanstack/react-query'

import { getUserFn } from '../fn/user'

export const userQueryKey = ['auth'] as const

export function userQueryOptions() {
  return queryOptions({
    queryKey: [...userQueryKey, 'user'],
    queryFn: () => getUserFn(),
    staleTime: 5000,
  })
}
