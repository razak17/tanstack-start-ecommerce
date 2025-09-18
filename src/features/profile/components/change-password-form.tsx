import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'

import { authClient } from '@/lib/auth/client'
import { changePasswordSchema } from '@/lib/validations/auth'

import { Icons } from '@/components/icons'
import { PasswordInput } from '@/components/password-input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

interface ChangePasswordFormProps {
  isAnonymousUser?: boolean | null
}

export function ChangePasswordForm({
  isAnonymousUser = false,
}: ChangePasswordFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(values: z.infer<typeof changePasswordSchema>) {
    await authClient.changePassword(
      {
        newPassword: values.newPassword,
        currentPassword: values.currentPassword,
        revokeOtherSessions: true,
      },
      {
        onSuccess: () => {
          form.reset()
          toast.success('Password changed successfully.')
        },
        onError: (ctx) => {
          toast.error(ctx.error.message)
        },
        onRequest: () => setIsLoading(true),
        onResponse: () => setIsLoading(false),
      },
    )
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <PasswordInput
                  disabled={isAnonymousUser ?? false}
                  placeholder="Enter current password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <PasswordInput
                  disabled={isAnonymousUser ?? false}
                  placeholder="Enter new password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <PasswordInput
                  disabled={isAnonymousUser ?? false}
                  placeholder="Confirm new password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isAnonymousUser ?? isLoading}
          className="w-full"
        >
          {isLoading && (
            <Icons.spinner
              className="mr-2 size-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Change Password
        </Button>
      </form>
    </Form>
  )
}
