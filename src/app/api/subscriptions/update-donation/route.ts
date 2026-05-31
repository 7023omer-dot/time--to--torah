import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { updateDonationTargetSchema } from '@/lib/validations'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = updateDonationTargetSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0]?.message || 'Invalid input' },
        { status: 400 }
      )
    }

    const { subscription_id, donation_target } = result.data

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const { data: subscription, error } = await supabase
      .from('subscriptions')
      .update({ donation_target })
      .eq('id', subscription_id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error || !subscription) {
      return NextResponse.json({ error: 'Subscription not found or update failed' }, { status: 404 })
    }

    return NextResponse.json({ subscription })
  } catch (err) {
    console.error('Update donation error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
