import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

async function requireAdmin(supabase: ReturnType<typeof createClient>) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  if (user.app_metadata?.role !== 'admin') return null
  return user
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createClient()
  const admin = await requireAdmin(supabase)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })

  const { data, error } = await supabase
    .from('lessons')
    .select('*, categories(*), rabbis(*)')
    .eq('id', params.id)
    .single()

  if (error || !data) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ lesson: data })
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createClient()
  const admin = await requireAdmin(supabase)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })

  const body = await request.json()
  const {
    title_he, title_en, content_he, content_en, summary_he, summary_en,
    youtube_id, audio_url, parasha, category_id, rabbi_id,
    lesson_date, is_free, estimated_minutes,
  } = body

  const { data, error } = await supabase
    .from('lessons')
    .update({
      title_he, title_en, content_he, content_en, summary_he, summary_en,
      youtube_id, audio_url, parasha, category_id, rabbi_id,
      lesson_date, is_free, estimated_minutes,
    })
    .eq('id', params.id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ lesson: data })
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createClient()
  const admin = await requireAdmin(supabase)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })

  const { error } = await supabase.from('lessons').delete().eq('id', params.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
