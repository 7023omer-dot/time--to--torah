import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

async function requireAdmin(supabase: ReturnType<typeof createClient>) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const role = user.app_metadata?.role
  if (role !== 'admin') return null
  return user
}

export async function GET() {
  const supabase = createClient()
  const admin = await requireAdmin(supabase)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })

  const { data, error } = await supabase
    .from('rabbis')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ rabbis: data })
}

export async function POST(request: NextRequest) {
  const supabase = createClient()
  const admin = await requireAdmin(supabase)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })

  const body = await request.json()
  const { name_he, name_en, bio_he, bio_en, photo_url, is_active } = body

  if (!name_he || !name_en) {
    return NextResponse.json({ error: 'name_he and name_en are required' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('rabbis')
    .insert({ name_he, name_en, bio_he, bio_en, photo_url, is_active: is_active ?? true })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ rabbi: data }, { status: 201 })
}
