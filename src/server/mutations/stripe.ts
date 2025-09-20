import { getCookie } from '@tanstack/react-start/server'
import { eq } from 'drizzle-orm'
import type Stripe from 'stripe'
import type { z } from 'zod'

import { calculateOrderAmount } from '@/lib/checkout'
import { env } from '@/lib/env/client'
import { getErrorMessage } from '@/lib/handle-error'
import { stripe } from '@/lib/stripe'
import type { CheckoutItemSchema } from '@/lib/validations/cart'
import type {
  createPaymentIntentSchema,
  getPaymentIntentSchema,
} from '@/lib/validations/stripe'

import { db } from '@/server/db'
import { carts } from '@/server/db/schema'

// Modified from: https://github.com/jackblatch/OneStopShop/blob/main/server-actions/stripe/payment.ts
// Creating a payment intent for a store
export async function createPaymentIntent(
  input: z.infer<typeof createPaymentIntentSchema>,
) {
  try {
    const cartId = getCookie('cartId')

    if (!cartId) {
      throw new Error('Cart not found.')
    }

    const checkoutItems: CheckoutItemSchema[] = input.items.map((item) => ({
      productId: item.id,
      price: Number(item.price),
      quantity: item.quantity,
    }))

    const metadata: Stripe.MetadataParam = {
      cartId: cartId,
      // Stripe metadata values must be within 500 characters string
      items: JSON.stringify(checkoutItems),
    }

    const { total } = calculateOrderAmount(input.items)

    // Create a payment intent if it doesn't exist
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      // application_fee_amount: fee,
      currency: 'usd',
      metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    })

    // Update the cart with the payment intent id and client secret
    if (paymentIntent.status === 'requires_payment_method') {
      await db
        .update(carts)
        .set({
          paymentIntentId: paymentIntent.id,
          clientSecret: paymentIntent.client_secret,
        })
        .where(eq(carts.id, cartId))
    }

    return {
      data: {
        clientSecret: paymentIntent.client_secret,
      },
      error: null,
    }
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    }
  }
}

// Modified from: https://github.com/jackblatch/OneStopShop/blob/main/server-actions/stripe/payment.ts
// Getting a payment intent for a store
export async function getPaymentIntent(
  input: z.infer<typeof getPaymentIntentSchema>,
) {
  try {
    const cartId = getCookie('cartId')

    const paymentIntent = await stripe.paymentIntents.retrieve(
      input.paymentIntentId,
    )

    if (paymentIntent.status !== 'succeeded') {
      throw new Error('Payment intent not succeeded.')
    }

    if (
      paymentIntent.metadata.cartId !== cartId &&
      paymentIntent.shipping?.address?.postal_code?.split(' ').join('') !==
        input.deliveryPostalCode
    ) {
      throw new Error('CartId or delivery postal code does not match.')
    }

    return {
      paymentIntent,
      isVerified: true,
    }
  } catch (err) {
    console.error(err)
    return {
      paymentIntent: null,
      isVerified: false,
    }
  }
}

export async function getClientSessionSecret(
  input: z.infer<typeof createPaymentIntentSchema>,
  userEmail: string,
) {
  const cartId = getCookie('cartId')

  if (!cartId) {
    throw new Error('Cart not found.')
  }

  const checkoutItems: CheckoutItemSchema[] = input.items.map((item) => ({
    productId: item.id,
    price: Number(item.price),
    quantity: item.quantity,
  }))

  const metadata: Stripe.MetadataParam = {
    cartId: cartId,
    // Stripe metadata values must be within 500 characters string
    items: JSON.stringify(checkoutItems),
  }

  const session = await stripe.checkout.sessions.create({
    line_items: [
      ...input.items.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            category: item.category || undefined,
          },
          unit_amount: Math.round(Number(item.price) * 100), // Stripe expects the amount in cents
        },
        quantity: item.quantity,
      })),
    ],
    ui_mode: 'embedded',
    mode: 'payment',
    metadata,
    payment_intent_data: {
      receipt_email: userEmail,
    },
    customer_email: userEmail,
    return_url: `${env.VITE_SERVER_URL}/api/webhooks/stripe?stripeSessionId={CHECKOUT_SESSION_ID}`,
  })

  if (session.client_secret == null) throw new Error('Client secret is null')

  return session.client_secret
}
