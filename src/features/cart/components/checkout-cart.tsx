import { Link } from '@tanstack/react-router'

import { cn, formatPrice } from '@/lib/utils'
import type { CartLineItemSchema } from '@/lib/validations/cart'

import { CartLineItems } from './cart-line-items'
import { buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface CheckoutCardProps {
  items: CartLineItemSchema[]
}

export async function CheckoutCard({ items }: CheckoutCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-x-4 py-4">
        <CardTitle className="line-clamp-1 flex-1">Items</CardTitle>
        <Link
          aria-label="Checkout"
          to="/checkout"
          className={cn(
            buttonVariants({
              size: 'sm',
            }),
          )}
        >
          Proceed To Checkout
        </Link>
      </CardHeader>
      <Separator className="mb-4" />
      <CardContent className="pr-0 pb-6 pl-6">
        <CartLineItems items={items} className="max-h-[280px]" />
      </CardContent>
      <Separator className="mb-4" />
      <CardFooter className="space-x-4">
        <span className="flex-1">
          Total ({items.reduce((acc, item) => acc + item.quantity, 0)})
        </span>
        <span>
          {formatPrice(
            items.reduce(
              (acc, item) => acc + Number(item.price) * item.quantity,
              0,
            ),
          )}
        </span>
      </CardFooter>
    </Card>
  )
}
