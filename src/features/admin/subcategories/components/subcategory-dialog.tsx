import { useState } from 'react'

import { SubcategoryForm } from './subcategory-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import type { SubcategoryForDropdown } from '@/server/db/schema'

interface SubcategoryDialogProps {
  trigger?: React.ReactNode
  subcategories?: SubcategoryForDropdown[]
}

export function SubcategoryDialog({
  trigger,
  subcategories,
}: SubcategoryDialogProps) {
  const [subcategory, setSubcategory] = useState<
    SubcategoryForDropdown | undefined
  >()
  const [open, setOpen] = useState(false)

  const handleSuccess = () => {
    setOpen(false)
  }

  return (
    <div className="space-x-4">
      {subcategories?.map((subcategory) => (
        <Button
          className="rounded-md border-none px-4 py-2 outline-none hover:bg-primary hover:text-background hover:dark:text-foreground"
          variant="outline"
          key={subcategory.id}
          onClick={() => {
            setSubcategory(subcategory)
            setOpen(true)
          }}
        >
          {subcategory.name}
          {subcategory.categoryName && (
            <span className="ml-2 text-xs opacity-70">
              ({subcategory.categoryName})
            </span>
          )}
        </Button>
      ))}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-md">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl">
              {subcategory ? 'Update' : 'Add New'} Subcategory
            </DialogTitle>
            <DialogDescription>
              Fill in the details below to{' '}
              {subcategory ? 'update' : 'create a new'} subcategory.
            </DialogDescription>
          </DialogHeader>
          <SubcategoryForm
            subcategory={subcategory}
            onSuccess={handleSuccess}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
