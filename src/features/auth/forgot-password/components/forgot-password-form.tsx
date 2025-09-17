import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'

import { authClient } from '@/lib/auth/client'
import { forgotPasswordSchema } from '@/lib/validations/auth'

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

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  async function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    await authClient.forgetPassword(
      {
        email: values.email,
        redirectTo: '/reset-password',
      },
      {
        onSuccess: () => {
          toast.success('Password reset email sent.')
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
      <form
        className="grid w-full gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading}>
          {isLoading && (
            <Icons.spinner
              className="mr-2 size-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Send Reset Link
        </Button>
      </form>
    </Form>
  )
}
