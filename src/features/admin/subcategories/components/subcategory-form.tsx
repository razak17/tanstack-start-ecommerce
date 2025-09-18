import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
  type CreateSubcategorySchema,
  createSubcategorySchema,
} from '@/lib/validations/subcategories'

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import type { SubcategoryForDropdown } from '@/server/db/schema'
import {
  addSubcategoryFn,
  deleteSubcategoryFn,
  updateSubcategoryFn,
} from '@/server/fn/subcategories'
import { getAllCategoriesQuery } from '@/server/queries/categories'
import { getAllSubcategoriesQuery } from '@/server/queries/subcategories'

interface SubcategoryFormProps {
  subcategory?: SubcategoryForDropdown
  onSuccess?: () => void
}

export function SubcategoryForm({
  subcategory,
  onSuccess,
}: SubcategoryFormProps) {
  const queryClient = useQueryClient()
  const { data: categories } = useQuery(getAllCategoriesQuery())

  const form = useForm<CreateSubcategorySchema>({
    resolver: zodResolver(createSubcategorySchema),
    defaultValues: {
      name: subcategory?.name ?? '',
      slug: subcategory?.slug ?? '',
      description: subcategory?.description ?? '',
      categoryId: subcategory?.categoryId ?? '',
    },
  })

  const { mutate: addMutate, isPending: addIsPending } = useMutation({
    mutationFn: (data: Parameters<typeof addSubcategoryFn>[0]['data']) =>
      addSubcategoryFn({ data }),
    onSuccess: async () => {
      form.reset()
      queryClient.invalidateQueries(getAllSubcategoriesQuery())
      toast.success('Subcategory added successfully')
      onSuccess?.()
    },
    onError: () => {
      toast.error('Failed to add subcategory')
    },
  })

  const { mutate: updateMutate, isPending: updateIsPending } = useMutation({
    mutationFn: (data: Parameters<typeof updateSubcategoryFn>[0]['data']) =>
      updateSubcategoryFn({ data }),
    onSuccess: async () => {
      form.reset()
      queryClient.invalidateQueries(getAllSubcategoriesQuery())
      toast.success('Subcategory updated successfully')
      onSuccess?.()
    },
    onError: () => {
      toast.error('Failed to update subcategory')
    },
  })

  const { mutate: deleteMutate, isPending: deleteIsPending } = useMutation({
    mutationFn: (data: Parameters<typeof deleteSubcategoryFn>[0]['data']) =>
      deleteSubcategoryFn({ data }),
    onSuccess: async () => {
      queryClient.invalidateQueries(getAllSubcategoriesQuery())
      toast.success('Subcategory deleted successfully')
      onSuccess?.()
    },
    onError: () => {
      toast.error('Failed to delete subcategory')
    },
  })

  async function onSubmit(input: CreateSubcategorySchema) {
    if (subcategory) {
      updateMutate({
        id: subcategory.id,
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
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category *</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories?.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subcategory Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter subcategory name" {...field} />
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
                  <Input placeholder="subcategory-slug" {...field} />
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
                  placeholder="Enter subcategory description"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <Button
            type="submit"
            className="w-fit"
            disabled={addIsPending || updateIsPending}
          >
            {(addIsPending || updateIsPending) && (
              <Icons.spinner className="mr-2 size-4 animate-spin" />
            )}
            {subcategory ? 'Update Subcategory' : 'Add Subcategory'}
          </Button>

          {subcategory && (
            <Button
              variant="destructive"
              type="button"
              className="w-fit"
              disabled={addIsPending || updateIsPending || deleteIsPending}
              onClick={() => deleteMutate({ id: subcategory.id })}
            >
              {deleteIsPending && (
                <Icons.spinner className="mr-2 size-4 animate-spin" />
              )}
              Delete Subcategory
            </Button>
          )}
        </div>
      </form>
    </Form>
  )
}
