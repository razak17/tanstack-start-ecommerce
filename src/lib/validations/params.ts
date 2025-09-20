import * as z from 'zod'

export const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  from: z.string().optional().nullable(),
  to: z.string().optional().nullable(),
  sort: z.string().optional().default('createdAt.desc'),
})

export const productsSearchParamsSchema = searchParamsSchema
  .omit({ from: true, to: true })
  .extend({
    categories: z.string().optional().nullable(),
    subcategory: z.string().optional().nullable(),
    subcategories: z.string().optional().nullable(),
    price_range: z.string().optional().nullable(),
    active: z.string().optional().default('true'),
  })

export const purchasesSearchParamsSchema = searchParamsSchema
  .omit({ from: true, to: true })
  .extend({
    status: z.string().optional(),
  })

export const ordersSearchParamsSchema = searchParamsSchema.extend({
  id: z.string().optional(),
  customer: z.string().optional(),
  status: z.string().optional(),
})

export const customersSearchParamsSchema = searchParamsSchema.extend({
  email: z.string().optional(),
})

export const customerSearchParamsSchema = searchParamsSchema.extend({
  status: z.string().optional(),
})

export type ProductsSearchParamsSchema = z.infer<
  typeof productsSearchParamsSchema
>
