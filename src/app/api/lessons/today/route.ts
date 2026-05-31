import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const today = new Date().toISOString().split('T')[0]

    // Try to get today's lesson
    const { data: lesson, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('lesson_date', today)
      .single()

    if (error || !lesson) {
      // Fall back to most recent lesson
      const { data: recentLesson } = await supabase
        .from('lessons')
        .select('*')
        .lte('lesson_date', today)
        .order('lesson_date', { ascending: false })
        .limit(1)
        .single()

      if (!recentLesson) {
        return NextResponse.json({ lesson: null, completed: false })
      }

      // Check if it's a free lesson or user has subscription
      if (!recentLesson.is_free) {
        if (!user) {
          return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
        }

        const { data: subscription } = await supabase
          .from('subscriptions')
          .select('id')
          .eq('user_id', user.id)
          .eq('status', 'active')
          .single()

        if (!subscription) {
          return NextResponse.json({ error: 'Active subscription required' }, { status: 403 })
        }
      }

      let completed = false
      if (user && recentLesson) {
        const { data: completion } = await supabase
          .from('lesson_completions')
          .select('id')
          .eq('user_id', user.id)
          .eq('lesson_id', recentLesson.id)
          .single()
        completed = !!completion
      }

      return NextResponse.json({ lesson: recentLesson, completed })
    }

    // Check access to today's lesson
    if (!lesson.is_free) {
      if (!user) {
        return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
      }

      const { data: subscription } = await supabase
        .from('subscriptions')
        .select('id')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .single()

      if (!subscription) {
        return NextResponse.json({ error: 'Active subscription required' }, { status: 403 })
      }
    }

    let completed = false
    if (user) {
      const { data: completion } = await supabase
        .from('lesson_completions')
        .select('id')
        .eq('user_id', user.id)
        .eq('lesson_id', lesson.id)
        .single()
      completed = !!completion
    }

    return NextResponse.json({ lesson, completed })
  } catch (err) {
    console.error('Today lesson error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
