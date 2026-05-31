import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createClient()

  const { data: lesson, error } = await supabase
    .from('lessons')
    .select('*, categories(id, slug, name_he, name_en, icon), rabbis(id, name_he, name_en, photo_url, bio_he, bio_en)')
    .eq('id', params.id)
    .single()

  if (error || !lesson) {
    return NextResponse.json({ error: 'Lesson not found' }, { status: 404 })
  }

  // Free lessons are accessible to all
  if (lesson.is_free) {
    return NextResponse.json({ lesson })
  }

  // Paid lessons require auth + active subscription
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
  }

  const { data: sub } = await supabase
    .from('subscriptions')
    .select('id')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .single()

  if (!sub) {
    return NextResponse.json({ error: 'Active subscription required' }, { status: 403 })
  }

  return NextResponse.json({ lesson })
}
