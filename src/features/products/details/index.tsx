import { useSuspenseQuery } from '@tanstack/react-query'

import { useAuthentication } from '@/lib/auth/client'
import { formatPrice } from '@/lib/utils'

import { ProductImageCarousel } from '@/components/product-image-carousel'
import { Rating } from '@/components/rating'
import { Shell } from '@/components/shell'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  getOtherProductsQuery,
  getProductQuery,
} from '@/server/queries/products'
import { AddToCartForm } from '../components/add-to-cart-form'
import { ProductCard } from '../components/product-card'
import { UpdateProductRatingButton } from '../components/update-product-rating-button'

export default function ProductDetails({ productId }: { productId: string }) {
  const { user } = useAuthentication()

  const { data: product } = useSuspenseQuery(
    getProductQuery(productId, user?.id),
  )

  const { data: otherProducts } = useSuspenseQuery(
    getOtherProductsQuery(productId, user?.id),
  )

  return (
    <Shell className="pb-12 md:pb-14">
      <div className="flex flex-col gap-8 md:flex-row md:gap-16">
        <ProductImageCarousel
          className="w-full md:w-1/2"
          images={product.images ?? []}
          options={{
            loop: true,
          }}
        />
        <Separator className="mt-4 md:hidden" />
        <div className="flex w-full flex-col gap-4 md:w-1/2">
          <div className="space-y-2">
            <h2 className="line-clamp-1 font-bold text-2xl">{product.name}</h2>
            <p className="text-base text-muted-foreground">
              {formatPrice(product.price)}
            </p>
          </div>
          <Separator className="my-1.5" />
          <p className="text-base text-muted-foreground">
            {product.inventory} in stock
          </p>
          <div className="flex items-center justify-between">
            <Rating rating={Math.round(product.rating / 5)} />
            <UpdateProductRatingButton
              productId={product.id}
              rating={product.rating}
            />
          </div>
          <AddToCartForm productId={productId} showBuyNow={true} />
          <Separator className="mt-5" />
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="description"
          >
            <AccordionItem value="description" className="border-none">
              <AccordionTrigger>Description</AccordionTrigger>
              <AccordionContent>
                {product.description ??
                  'No description is available for this product.'}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Separator className="md:hidden" />
        </div>
      </div>
      {otherProducts && otherProducts?.length > 0 ? (
        <div className="space-y-6 overflow-hidden">
          <h2 className="line-clamp-1 flex-1 font-bold text-2xl">
            More products
          </h2>
          <ScrollArea className="pb-3.5">
            <div className="flex gap-4">
              {otherProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  className="min-w-[260px]"
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      ) : null}
    </Shell>
  )
}
