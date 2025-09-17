import { createFileRoute } from '@tanstack/react-router'

import AdminCategories from '@/features/admin/categories'

export const Route = createFileRoute('/admin/categories/')({
  component: AdminCategories,
})
