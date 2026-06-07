import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST() {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
  }

  // Get all completions for this user ordered by date
  const { data: completions } = await supabase
    .from('lesson_completions')
    .select('completed_at, lesson_id')
    .eq('user_id', user.id)
    .order('completed_at', { ascending: false })

  const totalLessons = completions?.length || 0

  // Calculate streak
  let streak = 0
  if (completions && completions.length > 0) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const completionDays = new Set(
      completions.map((c) => {
        const d = new Date(c.completed_at)
        d.setHours(0, 0, 0, 0)
        return d.getTime()
      })
    )

    let checkDate = new Date(today)
    while (completionDays.has(checkDate.getTime())) {
      streak++
      checkDate.setDate(checkDate.getDate() - 1)
    }
  }

  // Get all achievements definitions
  const { data: allAchievements } = await supabase.from('achievements').select('*')

  // Get already earned achievements
  const { data: earned } = await supabase
    .from('user_achievements')
    .select('achievement_id')
    .eq('user_id', user.id)

  const earnedIds = new Set((earned || []).map((e) => e.achievement_id))

  const newlyEarned: string[] = []

  for (const achievement of allAchievements || []) {
    if (earnedIds.has(achievement.id)) continue

    let shouldAward = false

    switch (achievement.condition_type) {
      case 'first_lesson':
        shouldAward = totalLessons >= 1
        break
      case 'total_lessons':
        shouldAward = totalLessons >= achievement.condition_value
        break
      case 'streak':
        shouldAward = streak >= achievement.condition_value
        break
      case 'share':
        // Share achievements are awarded separately via a different endpoint
        break
    }

    if (shouldAward) {
      const { error } = await supabase
        .from('user_achievements')
        .insert({ user_id: user.id, achievement_id: achievement.id })

      if (!error) {
        newlyEarned.push(achievement.slug)
      }
    }
  }

  return NextResponse.json({
    streak,
    total_lessons: totalLessons,
    newly_earned: newlyEarned,
  })
}
