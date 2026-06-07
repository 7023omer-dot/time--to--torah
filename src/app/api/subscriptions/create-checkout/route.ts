import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { PLAN_PRICES } from '@/lib/stripe'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Authentication required', redirect: '/login' }, { status: 401 })
  }

  const body = await request.json()
  const { plan, donationTarget, currency = 'ILS' } = body as {
    plan: 'monthly' | 'biannual' | 'annual'
    donationTarget: 'yeshiva' | 'poor_families' | 'split_50_50'
    currency: string
  }

  if (!plan || !donationTarget) {
    return NextResponse.json({ error: 'plan and donationTarget are required' }, { status: 400 })
  }

  const amountCents = PLAN_PRICES[plan]?.[currency] || PLAN_PRICES[plan]?.ILS || 1890

  // Calculate donation split
  let yeshivaCents = 0
  let poorFamiliesCents = 0
  if (donationTarget === 'yeshiva') {
    yeshivaCents = amountCents
  } else if (donationTarget === 'poor_families') {
    poorFamiliesCents = amountCents
  } else {
    yeshivaCents = Math.floor(amountCents / 2)
    poorFamiliesCents = amountCents - yeshivaCents
  }

  // Mock period dates
  const now = new Date()
  const periodEnd = new Date(now)
  if (plan === 'monthly') periodEnd.setMonth(periodEnd.getMonth() + 1)
  else if (plan === 'biannual') periodEnd.setMonth(periodEnd.getMonth() + 6)
  else periodEnd.setFullYear(periodEnd.getFullYear() + 1)

  // Cancel any existing active subscriptions
  await supabase
    .from('subscriptions')
    .update({ status: 'canceled', canceled_at: now.toISOString() })
    .eq('user_id', user.id)
    .eq('status', 'active')

  // Create subscription record
  const mockSubId = `mock_sub_${Date.now()}_${Math.random().toString(36).slice(2)}`
  const { data: subscription, error: subError } = await supabase
    .from('subscriptions')
    .insert({
      user_id: user.id,
      stripe_subscription_id: mockSubId,
      stripe_price_id: `mock_price_${plan}_${currency}`,
      plan,
      currency,
      amount_cents: amountCents,
      status: 'active',
      donation_target: donationTarget,
      current_period_start: now.toISOString(),
      current_period_end: periodEnd.toISOString(),
    })
    .select()
    .single()

  if (subError || !subscription) {
    return NextResponse.json({ error: 'Failed to create subscription' }, { status: 500 })
  }

  // Record donation allocation
  const mockInvoiceId = `mock_inv_${Date.now()}`
  await supabase
    .from('donation_allocations')
    .insert({
      user_id: user.id,
      subscription_id: subscription.id,
      stripe_invoice_id: mockInvoiceId,
      amount_cents: amountCents,
      currency,
      yeshiva_cents: yeshivaCents,
      poor_families_cents: poorFamiliesCents,
      payment_date: now.toISOString(),
    })

  return NextResponse.json({ success: true, redirectUrl: '/learn' })
}
