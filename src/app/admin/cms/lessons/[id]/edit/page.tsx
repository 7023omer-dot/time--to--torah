'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

interface SelectOption { id: string; name_he: string }

export default function EditLessonPage() {
  const router = useRouter()
  const params = useParams()
  const [form, setForm] = useState({
    title_he: '', title_en: '',
    content_he: '', content_en: '',
    summary_he: '', summary_en: '',
    youtube_id: '', audio_url: '', parasha: '',
    category_id: '', rabbi_id: '',
    lesson_date: '',
    is_free: false,
    estimated_minutes: 5,
  })
  const [categories, setCategories] = useState<SelectOption[]>([])
  const [rabbis, setRabbis] = useState<SelectOption[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const [lessonRes, catRes, rabbiRes] = await Promise.all([
        fetch(`/api/admin/lessons/${params.id}`),
        fetch('/api/admin/categories'),
        fetch('/api/admin/rabbis'),
      ])

      if (lessonRes.ok) {
        const data = await lessonRes.json()
        const l = data.lesson
        setForm({
          title_he: l.title_he || '',
          title_en: l.title_en || '',
          content_he: l.content_he || '',
          content_en: l.content_en || '',
          summary_he: l.summary_he || '',
          summary_en: l.summary_en || '',
          youtube_id: l.youtube_id || '',
          audio_url: l.audio_url || '',
          parasha: l.parasha || '',
          category_id: l.category_id || '',
          rabbi_id: l.rabbi_id || '',
          lesson_date: l.lesson_date || '',
          is_free: l.is_free || false,
          estimated_minutes: l.estimated_minutes || 5,
        })
      }
      if (catRes.ok) { const d = await catRes.json(); setCategories(d.categories || []) }
      if (rabbiRes.ok) { const d = await rabbiRes.json(); setRabbis(d.rabbis || []) }
      setLoading(false)
    }
    fetchData()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    const payload = {
      ...form,
      category_id: form.category_id || null,
      rabbi_id: form.rabbi_id || null,
      youtube_id: form.youtube_id || null,
      audio_url: form.audio_url || null,
      parasha: form.parasha || null,
      summary_he: form.summary_he || null,
      summary_en: form.summary_en || null,
    }

    const res = await fetch(`/api/admin/lessons/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const data = await res.json()
      setError(data.error || 'שגיאה')
      setSaving(false)
      return
    }

    router.push('/admin/cms')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-parchment">
        <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const inputClass = "w-full border border-stone/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold"

  return (
    <div className="min-h-screen bg-parchment py-10" dir="rtl">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/cms" className="text-stone hover:text-gold text-sm">← חזור</Link>
          <h1 className="font-heading text-2xl font-bold text-ink">עריכת שיעור</h1>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-5">
          {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">{error}</div>}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1">כותרת (עברית) *</label>
              <input type="text" required value={form.title_he} onChange={e => setForm({...form, title_he: e.target.value})} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1">כותרת (אנגלית) *</label>
              <input type="text" required value={form.title_en} onChange={e => setForm({...form, title_en: e.target.value})} className={inputClass} dir="ltr" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1">תקציר (עברית)</label>
              <textarea rows={2} value={form.summary_he} onChange={e => setForm({...form, summary_he: e.target.value})} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1">תקציר (אנגלית)</label>
              <textarea rows={2} value={form.summary_en} onChange={e => setForm({...form, summary_en: e.target.value})} className={inputClass} dir="ltr" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1">תוכן (עברית) *</label>
            <textarea rows={6} required value={form.content_he} onChange={e => setForm({...form, content_he: e.target.value})} className={inputClass} />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1">תוכן (אנגלית) *</label>
            <textarea rows={6} required value={form.content_en} onChange={e => setForm({...form, content_en: e.target.value})} className={inputClass} dir="ltr" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1">קטגוריה</label>
              <select value={form.category_id} onChange={e => setForm({...form, category_id: e.target.value})} className={inputClass}>
                <option value="">בחר קטגוריה</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name_he}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1">רב</label>
              <select value={form.rabbi_id} onChange={e => setForm({...form, rabbi_id: e.target.value})} className={inputClass}>
                <option value="">בחר רב</option>
                {rabbis.map(r => <option key={r.id} value={r.id}>{r.name_he}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1">תאריך *</label>
              <input type="date" required value={form.lesson_date} onChange={e => setForm({...form, lesson_date: e.target.value})} className={inputClass} dir="ltr" />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1">דקות</label>
              <input type="number" min={1} max={60} value={form.estimated_minutes} onChange={e => setForm({...form, estimated_minutes: parseInt(e.target.value)})} className={inputClass} dir="ltr" />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1">פרשה</label>
              <input type="text" value={form.parasha} onChange={e => setForm({...form, parasha: e.target.value})} className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1">YouTube ID</label>
              <input type="text" value={form.youtube_id} onChange={e => setForm({...form, youtube_id: e.target.value})} className={inputClass} dir="ltr" />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Audio URL</label>
              <input type="url" value={form.audio_url} onChange={e => setForm({...form, audio_url: e.target.value})} className={inputClass} dir="ltr" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="is_free" checked={form.is_free} onChange={e => setForm({...form, is_free: e.target.checked})} className="accent-gold" />
            <label htmlFor="is_free" className="text-sm text-ink">שיעור חינמי</label>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="btn-primary flex-1 disabled:opacity-60">
              {saving ? 'שומר...' : 'שמור שינויים'}
            </button>
            <Link href="/admin/cms" className="btn-secondary flex-1 text-center">ביטול</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
