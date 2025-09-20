import { zodResolver } from '@hookform/resolvers/zod'
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import * as React from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'

import { cn } from '@/lib/utils'
import { updateCartItemSchema } from '@/lib/validations/cart'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { addToCartFn } from '@/server/fn/cart'
import {
  getCartItemsQuery,
  getCartQuery,
  getUserCartItemsCountQuery,
} from '@/server/queries/cart'

interface AddToCartFormProps {
  productId: string
  showBuyNow?: boolean
}

type Inputs = z.infer<typeof updateCartItemSchema>

export function AddToCartForm({ productId, showBuyNow }: AddToCartFormProps) {
  const id = React.useId()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const form = useForm<Inputs>({
    resolver: zodResolver(updateCartItemSchema),
    defaultValues: {
      quantity: 1,
    },
  })

  const invalidateCartQueries = () => {
    queryClient.invalidateQueries(getCartQuery())
    queryClient.invalidateQueries(getCartItemsQuery())
    queryClient.invalidateQueries(getUserCartItemsCountQuery())
  }

  const { mutate: addToCartMutate, isPending: addToCartPending } = useMutation({
    mutationFn: (data: Parameters<typeof addToCartFn>[0]['data']) =>
      addToCartFn({ data }),
    onSuccess: async () => {
      invalidateCartQueries()
      toast.success('Item added to cart')
    },
    onError: () => {
      toast.error('Failed to add item to cart')
    },
  })

  const { mutate: buyNowMutate, isPending: buyNowPending } = useMutation({
    mutationFn: (data: Parameters<typeof addToCartFn>[0]['data']) =>
      addToCartFn({ data }),
    onSuccess: async () => {
      invalidateCartQueries()
      toast.success('Item added to cart')
      navigate({ to: '/cart' })
    },
    onError: () => {
      toast.error('Failed to add item to cart')
    },
  })

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    addToCartMutate({ productId, quantity: data.quantity })
  }

  const handleBuyNow = () => {
    const quantity = form.getValues('quantity')
    buyNowMutate({ productId, quantity })
  }

  return (
    <Form {...form}>
      <form
        className={cn(
          'flex max-w-[260px] gap-4',
          showBuyNow ? 'flex-col' : 'flex-row',
        )}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex items-center">
          <Button
            id={`${id}-decrement`}
            type="button"
            variant="outline"
            size="icon"
            className="size-8 shrink-0 rounded-r-none"
            onClick={() =>
              form.setValue(
                'quantity',
                Math.max(1, form.getValues('quantity') - 1),
              )
            }
            disabled={addToCartPending || buyNowPending}
          >
            <MinusIcon className="size-3" aria-hidden="true" />
            <span className="sr-only">Remove one item</span>
          </Button>
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className="sr-only">Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    inputMode="numeric"
                    min={1}
                    className="h-8 w-16 rounded-none border-x-0"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value
                      const parsedValue = parseInt(value, 10)
                      if (Number.isNaN(parsedValue)) return
                      field.onChange(parsedValue)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            id={`${id}-increment`}
            type="button"
            variant="outline"
            size="icon"
            className="size-8 shrink-0 rounded-l-none"
            onClick={() =>
              form.setValue('quantity', form.getValues('quantity') + 1)
            }
            disabled={addToCartPending || buyNowPending}
          >
            <PlusIcon className="size-3" aria-hidden="true" />
            <span className="sr-only">Add one item</span>
          </Button>
        </div>
        <div className="flex items-center space-x-2.5">
          {showBuyNow ? (
            <Button
              type="button"
              aria-label="Buy now"
              size="sm"
              className="w-full"
              onClick={handleBuyNow}
              disabled={buyNowPending}
            >
              {buyNowPending && (
                <Icons.spinner
                  className="mr-2 size-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Buy now
            </Button>
          ) : null}
          <Button
            aria-label="Add to cart"
            type="submit"
            variant={showBuyNow ? 'outline' : 'default'}
            size="sm"
            className="w-full"
            disabled={addToCartPending}
          >
            {addToCartPending && (
              <Icons.spinner
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Add to cart
          </Button>
        </div>
      </form>
    </Form>
  )
}
