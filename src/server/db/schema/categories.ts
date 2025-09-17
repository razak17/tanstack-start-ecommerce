import { relations } from 'drizzle-orm'
import { json, pgTable, text, varchar } from 'drizzle-orm/pg-core'

import { generateId } from '@/lib/id'

import { products } from './products'
import { subcategories } from './subcategories'
import { lifecycleDates } from './utils'
import type { getAllCategories } from '@/server/data-access/categories'
import type { StoredFile } from '@/types'

export const categories = pgTable('categories', {
  id: varchar('id', { length: 30 })
    .$defaultFn(() => generateId())
    .primaryKey(), // prefix_ + nanoid (12)
  name: text('name').notNull().unique(),
  slug: text('slug').notNull().unique(),
  image: json('image').$type<StoredFile | null>().default(null),
  description: text('description'),
  ...lifecycleDates,
})

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
  subcategories: many(subcategories),
}))

export type Category = typeof categories.$inferSelect
export type NewCategory = typeof categories.$inferInsert
export type CategoryForDropdown = Awaited<
  ReturnType<typeof getAllCategories>
>[0]
