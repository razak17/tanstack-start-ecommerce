import { createFileRoute } from '@tanstack/react-router'

import AdminEditProduct from '@/features/admin/products/edit'

export const Route = createFileRoute('/admin/products/$id/edit')({
  component: () => {
    const { id } = Route.useParams()
    return <AdminEditProduct productId={id} />
  },
})
