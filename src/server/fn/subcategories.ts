import { createServerFn } from '@tanstack/react-start'

import { getAllSubcategories } from '../data-access/subcategories'

export const getAllSubcategoriesFn = createServerFn({ method: 'GET' }).handler(
  async () => {
    return await getAllSubcategories()
  },
)
