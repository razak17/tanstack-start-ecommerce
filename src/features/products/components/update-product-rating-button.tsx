import { HeartIcon } from '@radix-ui/react-icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { cn } from '@/lib/utils'

import { Icons } from '@/components/icons'
import { Button, type ButtonProps } from '@/components/ui/button'
import { updateProductRatingFn } from '@/server/fn/products'
import { getProductQuery } from '@/server/queries/products'

interface UpdateProductRatingButtonProps extends ButtonProps {
  productId: string
  rating: number
}

export function UpdateProductRatingButton({
  productId,
  rating,
  className,
  ...props
}: UpdateProductRatingButtonProps) {
  const queryClient = useQueryClient()

  const { mutate: updateMutate, isPending: updateIsPending } = useMutation({
    mutationFn: (data: Parameters<typeof updateProductRatingFn>[0]['data']) =>
      updateProductRatingFn({ data }),
    onSuccess: async () => {
      queryClient.invalidateQueries(getProductQuery(productId))
      toast.success('Product rating updated')
    },
    onError: () => {
      toast.error('Failed to update product rating')
    },
  })

  return (
    <Button
      title="Favorite"
      variant="secondary"
      size="icon"
      className={cn('size-8 shrink-0', className)}
      onClick={async () => {
        updateMutate({ id: productId, rating: rating + 1 })
      }}
      disabled={updateIsPending}
      {...props}
    >
      {updateIsPending ? (
        <Icons.spinner className="size-4 animate-spin" aria-hidden="true" />
      ) : (
        <HeartIcon className="size-4" aria-hidden="true" />
      )}
      <span className="sr-only">Ratingg</span>
    </Button>
  )
}
