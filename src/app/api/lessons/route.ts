import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const supabase = createClient()
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = parseInt(searchParams.get('limit') || '10', 10)
  const offset = (page - 1) * limit

  // Check auth
  const { data: { user } } = await supabase.auth.getUser()
  let isSubscriber = false

  if (user) {
    const { data: sub } = await supabase
      .from('subscriptions')
      .select('id')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .single()
    isSubscriber = !!sub
  }

  let query = supabase
    .from('lessons')
    .select('*, categories(id, slug, name_he, name_en, icon), rabbis(id, name_he, name_en, photo_url)', { count: 'exact' })
    .order('lesson_date', { ascending: false })
    .range(offset, offset + limit - 1)

  if (category) {
    // Filter by category slug
    const { data: cat } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', category)
      .single()

    if (cat) {
      query = query.eq('category_id', cat.id)
    }
  }

  // Non-subscribers only see free lessons
  if (!isSubscriber) {
    query = query.eq('is_free', true)
  }

  const { data, error, count } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({
    lessons: data,
    pagination: {
      page,
      limit,
      total: count || 0,
      total_pages: Math.ceil((count || 0) / limit),
    },
  })
}
