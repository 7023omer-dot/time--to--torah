import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { completeLessonSchema } from '@/lib/validations'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = completeLessonSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0]?.message || 'Invalid input' },
        { status: 400 }
      )
    }

    const { lesson_id } = result.data

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    // Verify lesson exists
    const { data: lesson } = await supabase
      .from('lessons')
      .select('id, is_free')
      .eq('id', lesson_id)
      .single()

    if (!lesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 })
    }

    // If paid lesson, verify active subscription
    if (!lesson.is_free) {
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

    // Insert completion (ignore duplicate due to unique constraint)
    const { data: completion, error } = await supabase
      .from('lesson_completions')
      .insert({ user_id: user.id, lesson_id })
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        // Already completed
        return NextResponse.json({ message: 'Already completed', alreadyCompleted: true })
      }
      throw error
    }

    return NextResponse.json({ completion, message: 'Lesson marked as complete' })
  } catch (err) {
    console.error('Complete lesson error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
