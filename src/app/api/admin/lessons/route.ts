import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

async function requireAdmin(supabase: ReturnType<typeof createClient>) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  if (user.app_metadata?.role !== 'admin') return null
  return user
}

export async function GET(request: NextRequest) {
  const supabase = createClient()
  const admin = await requireAdmin(supabase)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })

  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = parseInt(searchParams.get('limit') || '20', 10)
  const category = searchParams.get('category')
  const search = searchParams.get('search')
  const offset = (page - 1) * limit

  let query = supabase
    .from('lessons')
    .select('*, categories(id, slug, name_he, name_en), rabbis(id, name_he, name_en)', { count: 'exact' })
    .order('lesson_date', { ascending: false })
    .range(offset, offset + limit - 1)

  if (category) {
    const { data: cat } = await supabase.from('categories').select('id').eq('slug', category).single()
    if (cat) query = query.eq('category_id', cat.id)
  }

  if (search) {
    query = query.or(`title_he.ilike.%${search}%,title_en.ilike.%${search}%`)
  }

  const { data, error, count } = await query

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({
    lessons: data,
    pagination: { page, limit, total: count || 0, total_pages: Math.ceil((count || 0) / limit) },
  })
}

export async function POST(request: NextRequest) {
  const supabase = createClient()
  const admin = await requireAdmin(supabase)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })

  const body = await request.json()
  const {
    title_he, title_en, content_he, content_en, summary_he, summary_en,
    youtube_id, audio_url, parasha, category_id, rabbi_id,
    lesson_date, is_free, estimated_minutes,
  } = body

  if (!title_he || !title_en || !content_he || !content_en || !lesson_date) {
    return NextResponse.json({ error: 'Required fields missing' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('lessons')
    .insert({
      title_he, title_en, content_he, content_en, summary_he, summary_en,
      youtube_id, audio_url, parasha, category_id, rabbi_id,
      lesson_date, is_free: is_free ?? false, estimated_minutes: estimated_minutes ?? 5,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ lesson: data }, { status: 201 })
}
