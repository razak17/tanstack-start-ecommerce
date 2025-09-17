import { createFileRoute } from '@tanstack/react-router'

import AdminProductDetails from '@/features/admin/products/details'

export const Route = createFileRoute('/admin/products/$id/')({
  component: () => {
    const { id } = Route.useParams()
    return <AdminProductDetails productId={id} />
  },
})
