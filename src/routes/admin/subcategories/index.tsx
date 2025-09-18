import { createFileRoute } from '@tanstack/react-router'

import AdminSubcategories from '@/features/admin/subcategories'

export const Route = createFileRoute('/admin/subcategories/')({
  component: AdminSubcategories,
})
