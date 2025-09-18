import { useState } from 'react'
import { toast } from 'sonner'

import { authClient } from '@/lib/auth/client'

import { Button } from '@/components/ui/button'

interface EmailVerificationFormProps {
  userEmail: string
  isAnonymousUser?: boolean | null
}

export function EmailVerificationForm({
  userEmail,
  isAnonymousUser = false,
}: EmailVerificationFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  async function handleSendVerification() {
    await authClient.sendVerificationEmail(
      {
        email: userEmail,
        callbackURL: '/profile', // The redirect URL after verification
      },
      {
        onSuccess: () => {
          toast.success('Verification email sent successfully.')
          setEmailSent(true)
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
    <div className="space-y-3">
      <p className="text-muted-foreground text-sm">
        Your email address is not verified. Verify your email to access all
        features.
      </p>
      <Button
        onClick={handleSendVerification}
        disabled={isAnonymousUser || isLoading || emailSent}
        size="sm"
        variant="outline"
      >
        {isLoading
          ? 'Sending...'
          : emailSent
            ? 'Email Sent'
            : 'Send Verification Email'}
      </Button>
      {emailSent && (
        <p className="text-muted-foreground text-xs">
          Check your email for the verification link.
        </p>
      )}
    </div>
  )
}
