import { CheckIcon, PlusIcon } from '@radix-ui/react-icons'
// import { addToCart } from "@/features/cart/actions/cart";
import { Link } from '@tanstack/react-router'
import * as React from 'react'

// import { toast } from 'sonner'

import { cn, formatPrice } from '@/lib/utils'

import { FavoriteButton } from './favorite-button'
import { Icons } from '@/components/icons'
import { PlaceholderImage } from '@/components/placeholder-image'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { FeaturedProduct } from '@/server/db/schema'

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
  const [isUpdatePending, startUpdateTransition] = React.useTransition()

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
                className="object-cover"
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
                // startUpdateTransition(() => {});
                // const { error } = await addToCart({
                //   productId: product.id,
                //   quantity: 1,
                // });
                //
                // if (error) {
                //   toast.error(error);
                //   return;
                // }
                // toast.success("Item added to cart");
              }}
              disabled={isUpdatePending}
            >
              {isUpdatePending && (
                <Icons.spinner
                  className="mr-2 size-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Add to cart
            </Button>
            {/* <Link */}
            {/*   to={`/preview/product/${product.id}`} */}
            {/*   title="Preview" */}
            {/*   className={cn( */}
            {/*     buttonVariants({ */}
            {/*       variant: "secondary", */}
            {/*       size: "icon", */}
            {/*       className: "h-8 w-8 shrink-0", */}
            {/*     }), */}
            {/*   )} */}
            {/* > */}
            {/*   <EyeOpenIcon className="size-4" aria-hidden="true" /> */}
            {/*   <span className="sr-only">Preview</span> */}
            {/* </Link> */}
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
