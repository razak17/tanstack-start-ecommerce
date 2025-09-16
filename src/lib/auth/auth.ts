import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { admin as adminPlugin, anonymous } from 'better-auth/plugins'

import { env } from '@/lib/env/server'

import { ac, admin, consumer } from './permissions'
import { linkAnonymousUserFavorites } from '@/server/data-access/anonymous'
import { db } from '@/server/db'
import * as schema from '@/server/db/schema'
import { sendResetPasswordEmail, sendVerificationEmail } from '../email'

export const auth = betterAuth({
  user: {
    additionalFields: {
      firstName: {
        type: 'string',
        required: false,
        defaultValue: null,
        input: true,
      },
      lastName: {
        type: 'string',
        required: false,
        defaultValue: null,
        input: true,
      },
      gender: {
        type: 'string',
        required: false,
        defaultValue: null,
        input: true,
      },
      phone: {
        type: 'string',
        required: false,
        defaultValue: null,
        input: true,
      },
    },
  },
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  emailVerification: {
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      const response = await sendVerificationEmail({
        to: user.email,
        url,
        name: user.name,
        imageUrl: user.image ?? undefined,
      })
      if (response.error) {
        console.error(
          'Error sending verification email:',
          response.error,
          response.data,
        )
      }
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    sendResetPassword: async ({ user, url }) => {
      const response = await sendResetPasswordEmail({
        to: user.email,
        url,
        name: user.name,
        imageUrl: user.image ?? undefined,
      })
      if (response.error) {
        console.error(
          'Error sending reset password email:',
          response.error,
          response.data,
        )
      }
    },
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },
  plugins: [
    anonymous({
      onLinkAccount: async ({ anonymousUser, newUser }) => {
        // perform actions like moving the cart items from anonymous user to the new user
        await linkAnonymousUserFavorites(anonymousUser.user.id, newUser.user.id)
      },
    }),
    adminPlugin({
      ac,
      roles: {
        admin,
        consumer,
      },
      adminRoles: ['admin'],
      defaultRole: 'consumer',
    }),
    nextCookies(), // make sure this is the last plugin in the array
  ],
})
