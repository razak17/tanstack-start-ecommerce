import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
  type CreateCategorySchema,
  createCategorySchema,
} from '@/lib/validations/categories'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { CategoryForDropdown } from '@/server/db/schema'
import {
  addCategoryFn,
  deleteCategoryFn,
  updateCategoryFn,
} from '@/server/fn/categories'
import { getAllCategoriesQuery } from '@/server/queries/categories'

interface CategoryFormProps {
  category?: CategoryForDropdown
  onSuccess?: () => void
}

export function CategoryForm({ category, onSuccess }: CategoryFormProps) {
  const queryClient = useQueryClient()

  const form = useForm<CreateCategorySchema>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: category?.name ?? '',
      slug: category?.slug ?? '',
      description: category?.description ?? '',
    },
  })

  const { mutate: addMutate, isPending: addIsPending } = useMutation({
    mutationFn: (data: Parameters<typeof addCategoryFn>[0]['data']) =>
      addCategoryFn({ data }),
    onSuccess: async () => {
      form.reset()
      queryClient.invalidateQueries(getAllCategoriesQuery())
      toast.success('Category added successfully')
      onSuccess?.()
    },
    onError: () => {
      toast.error('Failed to add category')
    },
  })

  const { mutate: updateMutate, isPending: updateIsPending } = useMutation({
    mutationFn: (data: Parameters<typeof updateCategoryFn>[0]['data']) =>
      updateCategoryFn({ data }),
    onSuccess: async () => {
      form.reset()
      queryClient.invalidateQueries(getAllCategoriesQuery())
      toast.success('Category updated successfully')
      onSuccess?.()
    },
    onError: () => {
      toast.error('Failed to update category')
    },
  })

  const { mutate: deleteMutate, isPending: deleteIsPending } = useMutation({
    mutationFn: (data: Parameters<typeof deleteCategoryFn>[0]['data']) =>
      deleteCategoryFn({ data }),
    onSuccess: async () => {
      queryClient.invalidateQueries(getAllCategoriesQuery())
      toast.success('Category deleted successfully')
      onSuccess?.()
    },
    onError: () => {
      toast.error('Failed to delete category')
    },
  })

  async function onSubmit(input: CreateCategorySchema) {
    if (category) {
      updateMutate({
        id: category.id,
        data: input,
      })
    } else {
      addMutate({
        ...input,
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter category name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug *</FormLabel>
                <FormControl>
                  <Input placeholder="category-slug" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter category description"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-fit"
          disabled={addIsPending || updateIsPending}
        >
          {(addIsPending || updateIsPending) && (
            <Icons.spinner className="mr-2 size-4 animate-spin" />
          )}
          {category ? 'Update Category' : 'Add Category'}
        </Button>
        {category && (
          <Button
            variant="destructive"
            type="button"
            className="ml-2 w-fit"
            disabled={addIsPending || updateIsPending || deleteIsPending}
            onClick={() => deleteMutate({ id: category.id })}
          >
            {deleteIsPending && (
              <Icons.spinner className="mr-2 size-4 animate-spin" />
            )}
            Delete Category
          </Button>
        )}
      </form>
    </Form>
  )
}
