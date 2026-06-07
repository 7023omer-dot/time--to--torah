import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

async function requireAdmin(supabase: ReturnType<typeof createClient>) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  if (user.app_metadata?.role !== 'admin') return null
  return user
}

export async function GET() {
  const supabase = createClient()
  const admin = await requireAdmin(supabase)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('display_order', { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ categories: data })
}

export async function POST(request: NextRequest) {
  const supabase = createClient()
  const admin = await requireAdmin(supabase)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })

  const body = await request.json()
  const { slug, name_he, name_en, description_he, description_en, icon, display_order, is_active } = body

  if (!slug || !name_he || !name_en || !icon) {
    return NextResponse.json({ error: 'slug, name_he, name_en, icon are required' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('categories')
    .insert({ slug, name_he, name_en, description_he, description_en, icon, display_order: display_order ?? 0, is_active: is_active ?? true })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ category: data }, { status: 201 })
}
