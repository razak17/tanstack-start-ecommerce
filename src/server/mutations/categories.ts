import { and, eq, ne, or } from 'drizzle-orm'

import { getErrorMessage } from '@/lib/handle-error'
import type { CreateCategorySchema } from '@/lib/validations/categories'

import { db } from '@/server/db'
import { type Category, categories } from '@/server/db/schema'

export async function addCategory(input: CreateCategorySchema) {
  try {
    const categoryWithSameNameOrSlug = await db.query.categories.findFirst({
      columns: {
        id: true,
      },
      where: eq(categories.name, input.name) || eq(categories.slug, input.slug),
    })

    if (categoryWithSameNameOrSlug) {
      throw new Error('Category name or slug already taken.')
    }

    await db.insert(categories).values({
      ...input,
    })

    return {
      success: true,
      error: null,
    }
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    }
  }
}

export async function updateCategory(
  id: Category['id'],
  input: CreateCategorySchema,
) {
  try {
    const category = await db.query.categories.findFirst({
      where: eq(categories.id, categories.id),
    })

    if (!category) {
      throw new Error('Category not found.')
    }

    const categoryWithSameNameOrSlug = await db.query.categories.findFirst({
      columns: {
        id: true,
      },
      where: and(
        ne(categories.id, id),
        or(eq(categories.name, input.name), eq(categories.slug, input.slug)),
      ),
    })

    if (categoryWithSameNameOrSlug) {
      throw new Error('Category name or slug already taken.')
    }

    await db
      .update(categories)
      .set({
        ...input,
      })
      .where(eq(categories.id, id))

    return {
      success: true,
      error: null,
    }
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    }
  }
}

export async function deleteCategory(id: Category['id']) {
  try {
    const category = await db.query.categories.findFirst({
      where: eq(categories.id, categories.id),
    })

    if (!category) {
      throw new Error('Category not found.')
    }

    await db.delete(categories).where(eq(categories.id, id))

    return {
      success: true,
      error: null,
    }
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    }
  }
}
