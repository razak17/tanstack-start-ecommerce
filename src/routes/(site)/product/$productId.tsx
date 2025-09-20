import { createFileRoute } from '@tanstack/react-router'

import ProductDetails from '@/features/products/details'
import { ProductLoading } from '@/features/products/details/components/product-loading'

export const Route = createFileRoute('/(site)/product/$productId')({
  pendingComponent: ProductLoading,
  component: RouteComponent,
})

function RouteComponent() {
  const { productId } = Route.useParams()
  return <ProductDetails productId={productId} />
}
