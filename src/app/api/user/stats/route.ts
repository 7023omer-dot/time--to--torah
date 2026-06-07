import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ streak: 0, totalCompleted: 0, subscription: null, donationAllocations: [] })
    }

    const [
      { data: completions },
      { data: subscription },
      { data: donationAllocations },
    ] = await Promise.all([
      supabase
        .from('lesson_completions')
        .select('completed_at, lessons(lesson_date)')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false }),
      supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .single(),
      supabase
        .from('donation_allocations')
        .select('*')
        .eq('user_id', user.id)
        .order('payment_date', { ascending: false }),
    ])

    const totalCompleted = completions?.length || 0

    // Calculate streak
    let streak = 0
    if (completions && completions.length > 0) {
      const completedDates = new Set(
        completions.map((c) => {
          const lesson = c.lessons as any
          return lesson?.lesson_date || new Date(c.completed_at).toISOString().split('T')[0]
        })
      )

      const today = new Date()
      const todayStr = today.toISOString().split('T')[0]
      const yesterdayStr = new Date(today.getTime() - 86400000).toISOString().split('T')[0]

      // Start streak from today or yesterday
      let currentDate = completedDates.has(todayStr) ? today : new Date(today.getTime() - 86400000)
      let currentDateStr = completedDates.has(todayStr) ? todayStr : yesterdayStr

      if (completedDates.has(currentDateStr)) {
        streak = 1
        const checkDate = new Date(currentDate.getTime() - 86400000)

        while (true) {
          const checkDateStr = checkDate.toISOString().split('T')[0]
          if (completedDates.has(checkDateStr)) {
            streak++
            checkDate.setTime(checkDate.getTime() - 86400000)
          } else {
            break
          }
        }
      }
    }

    return NextResponse.json({
      streak,
      totalCompleted,
      subscription: subscription || null,
      donationAllocations: donationAllocations || [],
    })
  } catch (err) {
    console.error('User stats error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
