import { and, eq, ne, or } from 'drizzle-orm'

import { getErrorMessage } from '@/lib/handle-error'
import type { CreateSubcategorySchema } from '@/lib/validations/subcategories'

import { db } from '@/server/db'
import { type Subcategory, subcategories } from '@/server/db/schema'

export async function addSubcategory(input: CreateSubcategorySchema) {
  try {
    const subcategoryWithSameNameOrSlug =
      await db.query.subcategories.findFirst({
        columns: {
          id: true,
        },
        where: or(
          eq(subcategories.name, input.name),
          eq(subcategories.slug, input.slug),
        ),
      })

    if (subcategoryWithSameNameOrSlug) {
      throw new Error('Subcategory name or slug already taken.')
    }

    await db.insert(subcategories).values({
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

export async function updateSubcategory(
  id: Subcategory['id'],
  input: CreateSubcategorySchema,
) {
  try {
    const subcategory = await db.query.subcategories.findFirst({
      where: eq(subcategories.id, id),
    })

    if (!subcategory) {
      throw new Error('Subcategory not found.')
    }

    const subcategoryWithSameNameOrSlug =
      await db.query.subcategories.findFirst({
        columns: {
          id: true,
        },
        where: and(
          ne(subcategories.id, id),
          or(
            eq(subcategories.name, input.name),
            eq(subcategories.slug, input.slug),
          ),
        ),
      })

    if (subcategoryWithSameNameOrSlug) {
      throw new Error('Subcategory name or slug already taken.')
    }

    await db
      .update(subcategories)
      .set({
        ...input,
      })
      .where(eq(subcategories.id, id))

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

export async function deleteSubcategory(id: Subcategory['id']) {
  try {
    const subcategory = await db.query.subcategories.findFirst({
      where: eq(subcategories.id, id),
    })

    if (!subcategory) {
      throw new Error('Subcategory not found.')
    }

    await db.delete(subcategories).where(eq(subcategories.id, id))

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
