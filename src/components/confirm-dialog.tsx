import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { Icons } from './icons'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

interface ConfirmDialogProps {
  title?: string
  description?: string
  isLoading?: boolean
  onConfirm?: () => void
  children: React.ReactNode
}

export const ConfirmDialog = ({
  title = 'Delete Item',
  description = 'Are you sure you want to delete item? This action cannot be undone.',
  isLoading = false,
  onConfirm,
  children,
}: ConfirmDialogProps) => {
  return (
    <AlertDialog open={isLoading ? true : undefined}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={isLoading}
            onClick={onConfirm}
          >
            <LoadingTextSwap isLoading={isLoading}>Delete</LoadingTextSwap>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

function LoadingTextSwap({
  isLoading,
  children,
}: {
  isLoading: boolean
  children: ReactNode
}) {
  return (
    <div className="grid items-center justify-items-center">
      <div
        className={cn(
          'col-start-1 col-end-2 row-start-1 row-end-2',
          isLoading ? 'invisible' : 'visible',
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          'col-start-1 col-end-2 row-start-1 row-end-2 text-center',
          isLoading ? 'visible' : 'invisible',
        )}
      >
        <Icons.spinner className="animate-spin" />
      </div>
    </div>
  )
}
