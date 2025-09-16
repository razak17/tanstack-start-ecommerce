import { Resend } from 'resend'

import { env } from '@/lib/env/server'

import ResetPasswordEmail from '@/components/reset-password-email'
import AccountVerificationEmail from '@/components/verification-email'
import { siteConfig } from '@/config/site'

export const resend = new Resend(env.RESEND_API_KEY)

// @see: https://github.com/notKamui/miniverso/blob/src/lib/utils/email.tsx
export type MailOptions = {
  to: string
  name?: string
  imageUrl?: string
}

export async function sendResetPasswordEmail(
  options: MailOptions & { url: string },
) {
  const name = options.name || options.to.split('@')[0]

  return await resend.emails.send({
    from: `Razak <app@${env.RESEND_MAIL_DOMAIN}>`,
    to: options.to,
    subject: 'Verify your email address',
    react: ResetPasswordEmail({
      name: name,
      resetUrl: options.url,
      userEmail: options.to,
    }),
  })
}

export async function sendVerificationEmail(
  options: MailOptions & { url: string },
) {
  return await resend.emails.send({
    from: `Razak <app@${env.RESEND_MAIL_DOMAIN}>`,
    to: options.to,
    subject: 'Verify your email address',
    react: AccountVerificationEmail({
      email: options.to,
      verificationUrl: options.url,
      companyName: siteConfig.name,
    }),
  })
}
