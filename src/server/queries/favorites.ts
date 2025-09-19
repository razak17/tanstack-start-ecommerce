import { queryOptions } from '@tanstack/react-query'

import { getUserFavoritesCountFn, getUserFavoritesFn } from '../fn/favorites'

export const favoritesQueryKey = ['favorites'] as const

export function getUserFavoritesQuery(userId?: string) {
  return queryOptions({
    queryKey: [...favoritesQueryKey, 'user-favorites'] as const,
    queryFn: () => getUserFavoritesFn({ data: { userId } }),
  })
}

export function getUserFavoritesCountQuery() {
  return queryOptions({
    queryKey: [...favoritesQueryKey, 'user-favorites-count'] as const,
    queryFn: () => getUserFavoritesCountFn(),
  })
}
