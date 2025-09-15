import { relations } from 'drizzle-orm'
import { index, integer, pgTable, varchar } from 'drizzle-orm/pg-core'

import { generateId } from '@/lib/id'

import { lifecycleDates } from './utils'
import { productVariants } from './variants'

export const stocks = pgTable(
  'stocks',
  {
    id: varchar('id', { length: 30 })
      .$defaultFn(() => generateId())
      .primaryKey(),
    productVariantId: varchar('product_variant_id', { length: 30 })
      .references(() => productVariants.id, { onDelete: 'cascade' })
      .notNull(),
    quantity: integer('quantity').notNull().default(0),
    ...lifecycleDates,
  },
  (table) => [
    index('stocks_product_variant_id_idx').on(table.productVariantId),
  ],
)

export const stocksRelations = relations(stocks, ({ one }) => ({
  productVariant: one(productVariants, {
    fields: [stocks.productVariantId],
    references: [productVariants.id],
  }),
}))

export type Stock = typeof stocks.$inferSelect
export type NewStock = typeof stocks.$inferInsert
