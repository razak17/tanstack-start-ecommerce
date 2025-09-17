import { createFileRoute } from '@tanstack/react-router'

import AdminNewProduct from '@/features/admin/products/new'

export const Route = createFileRoute('/admin/products/new')({
  component: AdminNewProduct,
})
