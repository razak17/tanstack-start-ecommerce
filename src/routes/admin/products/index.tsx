import { createFileRoute } from '@tanstack/react-router'

import AdminProducts from '@/features/admin/products'

export const Route = createFileRoute('/admin/products/')({
  component: AdminProducts,
})
