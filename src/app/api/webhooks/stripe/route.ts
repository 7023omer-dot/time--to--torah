import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import { createServiceClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

// Disable Next.js body parsing for Stripe webhooks
export const runtime = 'nodejs'

function getAllocations(
  amountCents: number,
  donationTarget: string
): { yeshiva_cents: number; poor_families_cents: number } {
  switch (donationTarget) {
    case 'yeshiva':
      return { yeshiva_cents: amountCents, poor_families_cents: 0 }
    case 'poor_families':
      return { yeshiva_cents: 0, poor_families_cents: amountCents }
    case 'split_50_50':
    default: {
      const half = Math.floor(amountCents / 2)
      return { yeshiva_cents: half, poor_families_cents: amountCents - half }
    }
  }
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = createServiceClient()

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        if (session.mode !== 'subscription') break

        const userId = session.metadata?.userId
        const donationTarget = session.metadata?.donationTarget || 'split_50_50'
        const plan = session.metadata?.plan || 'monthly'
        const currency = session.metadata?.currency || 'ILS'

        if (!userId || !session.subscription) break

        const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
        const priceId = subscription.items.data[0]?.price.id || ''
        const amountCents = subscription.items.data[0]?.price.unit_amount || 0

        // Create subscription record
        const { data: subRecord } = await supabase
          .from('subscriptions')
          .upsert({
            user_id: userId,
            stripe_subscription_id: subscription.id,
            stripe_price_id: priceId,
            plan: plan as 'monthly' | 'biannual' | 'annual',
            currency: currency.toUpperCase(),
            amount_cents: amountCents,
            status: 'active',
            donation_target: donationTarget as 'yeshiva' | 'poor_families' | 'split_50_50',
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          }, { onConflict: 'stripe_subscription_id' })
          .select()
          .single()

        // Record initial donation allocation if invoice exists
        if (session.invoice && subRecord) {
          const invoice = await stripe.invoices.retrieve(session.invoice as string)
          const paidAmount = invoice.amount_paid || amountCents

          const allocs = getAllocations(paidAmount, donationTarget)

          await supabase.from('donation_allocations').insert({
            user_id: userId,
            subscription_id: subRecord.id,
            stripe_invoice_id: session.invoice as string,
            amount_cents: paidAmount,
            currency: currency.toUpperCase(),
            ...allocs,
          })
        }

        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription

        await supabase
          .from('subscriptions')
          .update({
            status: 'canceled',
            canceled_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id)

        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription

        const statusMap: Record<string, string> = {
          active: 'active',
          canceled: 'canceled',
          past_due: 'past_due',
          trialing: 'trialing',
          incomplete: 'incomplete',
          incomplete_expired: 'canceled',
          unpaid: 'past_due',
          paused: 'canceled',
        }

        await supabase
          .from('subscriptions')
          .update({
            status: (statusMap[subscription.status] || 'incomplete') as any,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id)

        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice

        if (invoice.subscription) {
          await supabase
            .from('subscriptions')
            .update({ status: 'past_due' })
            .eq('stripe_subscription_id', invoice.subscription as string)
        }

        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice

        if (!invoice.subscription || invoice.billing_reason === 'subscription_create') {
          // Already handled in checkout.session.completed
          break
        }

        // Get subscription record to find user and donation target
        const { data: subRecord } = await supabase
          .from('subscriptions')
          .select('id, user_id, donation_target, currency')
          .eq('stripe_subscription_id', invoice.subscription as string)
          .single()

        if (!subRecord) break

        const amountPaid = invoice.amount_paid || 0
        const allocs = getAllocations(amountPaid, subRecord.donation_target)

        await supabase.from('donation_allocations').insert({
          user_id: subRecord.user_id,
          subscription_id: subRecord.id,
          stripe_invoice_id: invoice.id,
          amount_cents: amountPaid,
          currency: subRecord.currency,
          ...allocs,
        })

        // Update subscription status to active
        await supabase
          .from('subscriptions')
          .update({ status: 'active' })
          .eq('stripe_subscription_id', invoice.subscription as string)

        break
      }

      default:
        // Unhandled event type
        break
    }
  } catch (err) {
    console.error(`Error handling webhook event ${event.type}:`, err)
    return NextResponse.json({ error: 'Webhook handler error' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
