import { MinusIcon, PlusIcon, TrashIcon } from '@radix-ui/react-icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as React from 'react'
import { toast } from 'sonner'

import type { CartLineItemSchema } from '@/lib/validations/cart'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { deleteCartItemFn, updateCartItemFn } from '@/server/fn/cart'
import {
  getCartItemsQuery,
  getCartQuery,
  getUserCartItemsCountQuery,
} from '@/server/queries/cart'

interface UpdateCartProps {
  cartLineItem: CartLineItemSchema
}

export function UpdateCart({ cartLineItem }: UpdateCartProps) {
  const id = React.useId()
  const queryClient = useQueryClient()

  const { mutate: updateMutate, isPending: updateIsPending } = useMutation({
    mutationFn: (data: Parameters<typeof updateCartItemFn>[0]['data']) =>
      updateCartItemFn({ data }),
    onSuccess: async () => {
      queryClient.invalidateQueries(getCartQuery())
      queryClient.invalidateQueries(getCartItemsQuery())
      queryClient.invalidateQueries(getUserCartItemsCountQuery())
    },
    onError: () => {
      toast.error('Failed to update product')
    },
  })

  const { mutate: deleteMutate, isPending: deleteIsPending } = useMutation({
    mutationFn: (data: Parameters<typeof deleteCartItemFn>[0]['data']) =>
      deleteCartItemFn({ data }),
    onSuccess: async () => {
      queryClient.invalidateQueries(getCartQuery())
      queryClient.invalidateQueries(getCartItemsQuery())
      queryClient.invalidateQueries(getUserCartItemsCountQuery())
    },
    onError: () => {
      toast.error('Failed to delete category')
    },
  })

  return (
    <div className="flex w-full xs:w-auto items-center xs:justify-normal justify-between space-x-2">
      <div className="flex items-center">
        <Button
          id={`${id}-decrement`}
          variant="outline"
          size="icon"
          className="size-8 rounded-r-none"
          onClick={() => {
            updateMutate({
              productId: cartLineItem.id,
              quantity: Number(cartLineItem.quantity) - 1,
            })
          }}
          disabled={updateIsPending || deleteIsPending}
        >
          <MinusIcon className="size-3" aria-hidden="true" />
          <span className="sr-only">Remove one item</span>
        </Button>
        <Input
          id={`${id}-quantity`}
          min="0"
          className="h-8 w-14 rounded-none border-x-0 text-center"
          value={cartLineItem.quantity}
          onChange={(e) => {
            const value = e.target.value
            if (value === '' || /^\d+$/.test(value)) {
              updateMutate({
                productId: cartLineItem.id,
                quantity: Number(value) || 0,
              })
            }
          }}
          disabled={updateIsPending || deleteIsPending}
        />
        <Button
          id={`${id}-increment`}
          variant="outline"
          size="icon"
          className="size-8 rounded-l-none"
          onClick={() => {
            updateMutate({
              productId: cartLineItem.id,
              quantity: Number(cartLineItem.quantity) + 1,
            })
          }}
          disabled={updateIsPending || deleteIsPending}
        >
          <PlusIcon className="size-3" aria-hidden="true" />
          <span className="sr-only">Add one item</span>
        </Button>
      </div>
      <Button
        id={`${id}-delete`}
        variant="outline"
        size="icon"
        className="size-8"
        onClick={() => {
          deleteMutate({
            productId: cartLineItem.id,
          })
        }}
        disabled={deleteIsPending || updateIsPending}
      >
        <TrashIcon className="size-3" aria-hidden="true" />
        <span className="sr-only">Delete item</span>
      </Button>
    </div>
  )
}
