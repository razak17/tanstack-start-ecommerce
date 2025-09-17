import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type * as React from 'react'
import { toast } from 'sonner'

import { cn } from '@/lib/utils'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { toggleFavoriteFn } from '@/server/fn/favorites'
import { getFeaturedProductsQuery } from '@/server/queries/products'

interface FavoriteButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  productId: string
  isFavorited?: boolean
  size?: 'default' | 'sm' | 'lg' | 'icon'
  variant?:
    | 'default'
    | 'secondary'
    | 'ghost'
    | 'link'
    | 'destructive'
    | 'outline'
}

export function FavoriteButton({
  productId,
  isFavorited,
  size = 'icon',
  variant = 'ghost',
  className,
  ...props
}: FavoriteButtonProps) {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: (data: Parameters<typeof toggleFavoriteFn>[0]['data']) =>
      toggleFavoriteFn({ data }),
    onSuccess: async ({ isFavorited: newFavoriteState }) => {
      queryClient.invalidateQueries(getFeaturedProductsQuery())
      toast.success(
        newFavoriteState ? 'Added to favorites' : 'Removed from favorites',
      )
    },
  })

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    mutate({
      productId,
    })
  }

  return (
    <Button
      aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
      size={size}
      variant={variant}
      className={cn('shrink-0', className)}
      onClick={handleToggleFavorite}
      disabled={isPending}
      {...props}
    >
      {isPending ? (
        <Icons.spinner className="size-4 animate-spin" aria-hidden="true" />
      ) : isFavorited ? (
        <HeartFilledIcon className="size-4 text-red-500" aria-hidden="true" />
      ) : (
        <HeartIcon className="size-4" aria-hidden="true" />
      )}
      <span className="sr-only">
        {isFavorited ? 'Remove from favorites' : 'Add to favorites'}
      </span>
    </Button>
  )
}
