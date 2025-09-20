import { CheckIcon, EyeOpenIcon, PlusIcon } from '@radix-ui/react-icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import * as React from 'react'
import { toast } from 'sonner'

import { cn, formatPrice } from '@/lib/utils'

import { FavoriteButton } from './favorite-button'
import { Icons } from '@/components/icons'
import { PlaceholderImage } from '@/components/placeholder-image'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { FeaturedProduct } from '@/server/db/schema'
import { addToCartFn } from '@/server/fn/cart'
import {
  getCartItemsQuery,
  getCartQuery,
  getUserCartItemsCountQuery,
} from '@/server/queries/cart'

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: FeaturedProduct
  variant?: 'default' | 'switchable'
  isAddedToCart?: boolean
  onSwitch?: () => Promise<void>
}

export function ProductCard({
  product,
  variant = 'default',
  isAddedToCart = false,
  onSwitch,
  className,
  ...props
}: ProductCardProps) {
  const queryClient = useQueryClient()
  const [isUpdatePending, startUpdateTransition] = React.useTransition()

  const { mutate: addMutate, isPending: addIsPending } = useMutation({
    mutationFn: (data: Parameters<typeof addToCartFn>[0]['data']) =>
      addToCartFn({ data }),
    onSuccess: async () => {
      queryClient.invalidateQueries(getCartQuery())
      queryClient.invalidateQueries(getCartItemsQuery())
      queryClient.invalidateQueries(getUserCartItemsCountQuery())
      toast.success('Item added to cart')
    },
    onError: () => {
      toast.error('Failed to add item to cart')
    },
  })

  return (
    <Card
      className={cn(
        'size-full gap-0 overflow-hidden rounded-lg p-0',
        className,
      )}
      {...props}
    >
      <Link
        aria-label={product.name}
        to="/product/$productId"
        params={{ productId: product.id }}
      >
        <CardHeader className="relative gap-0 border-b p-0 [.border-b]:pb-0">
          <AspectRatio ratio={4 / 3}>
            {product.images?.length ? (
              <img
                src={
                  product.images[0]?.url ?? '/images/product-placeholder.webp'
                }
                alt={product.images[0]?.name ?? product.name}
                className="h-full w-full object-cover transition-colors hover:brightness-90"
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
                loading="lazy"
              />
            ) : (
              <PlaceholderImage className="rounded-none" asChild />
            )}
          </AspectRatio>
          <div className="absolute top-2 right-2">
            <FavoriteButton
              isFavorited={product.isFavorited}
              productId={product.id}
              size="icon"
              variant="secondary"
              className="size-8"
            />
          </div>
        </CardHeader>
        <span className="sr-only">{product.name}</span>
      </Link>
      <Link
        to="/product/$productId"
        params={{ productId: product.id }}
        tabIndex={-1}
      >
        <CardContent className="space-y-1.5 p-4">
          <CardTitle className="line-clamp-1">{product.name}</CardTitle>
          <CardDescription className="line-clamp-1">
            {formatPrice(product.price)}
          </CardDescription>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-1">
        {variant === 'default' ? (
          <div className="flex w-full items-center space-x-2">
            <Button
              aria-label="Add to cart"
              size="sm"
              className="h-8 w-full rounded-sm"
              onClick={async () => {
                addMutate({
                  productId: product.id,
                  quantity: 1,
                })
              }}
              disabled={addIsPending}
            >
              {addIsPending && (
                <Icons.spinner
                  className="mr-2 size-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Add to cart
            </Button>
            <Link
              to="/product/$productId"
              params={{ productId: product.id }}
              title="Preview"
              className={cn(
                buttonVariants({
                  variant: 'secondary',
                  size: 'icon',
                  className: 'h-8 w-8 shrink-0',
                }),
              )}
            >
              <EyeOpenIcon className="size-4" aria-hidden="true" />
              <span className="sr-only">Preview</span>
            </Link>
          </div>
        ) : (
          <Button
            aria-label={isAddedToCart ? 'Remove from cart' : 'Add to cart'}
            size="sm"
            className="h-8 w-full rounded-sm"
            onClick={async () => {
              startUpdateTransition(async () => {})
              await onSwitch?.()
            }}
            disabled={isUpdatePending}
          >
            {isUpdatePending ? (
              <Icons.spinner
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
            ) : isAddedToCart ? (
              <CheckIcon className="mr-2 size-4" aria-hidden="true" />
            ) : (
              <PlusIcon className="mr-2 size-4" aria-hidden="true" />
            )}
            {isAddedToCart ? 'Added' : 'Add to cart'}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
