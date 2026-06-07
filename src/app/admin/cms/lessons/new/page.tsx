'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface SelectOption { id: string; name_he: string }

export default function NewLessonPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    title_he: '', title_en: '',
    content_he: '', content_en: '',
    summary_he: '', summary_en: '',
    youtube_id: '', audio_url: '', parasha: '',
    category_id: '', rabbi_id: '',
    lesson_date: new Date().toISOString().split('T')[0],
    is_free: false,
    estimated_minutes: 5,
  })
  const [categories, setCategories] = useState<SelectOption[]>([])
  const [rabbis, setRabbis] = useState<SelectOption[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchOptions = async () => {
      const [catRes, rabbiRes] = await Promise.all([
        fetch('/api/admin/categories'),
        fetch('/api/admin/rabbis'),
      ])
      if (catRes.ok) { const d = await catRes.json(); setCategories(d.categories || []) }
      if (rabbiRes.ok) { const d = await rabbiRes.json(); setRabbis(d.rabbis || []) }
    }
    fetchOptions()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
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

    const res = await fetch('/api/admin/lessons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const data = await res.json()
      setError(data.error || 'שגיאה')
      setLoading(false)
      return
    }

    router.push('/admin/cms')
  }

  const inputClass = "w-full border border-stone/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold"

  return (
    <div className="min-h-screen bg-parchment py-10" dir="rtl">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/cms" className="text-stone hover:text-gold text-sm">← חזור</Link>
          <h1 className="font-heading text-2xl font-bold text-ink">הוספת שיעור חדש</h1>
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
            <textarea rows={6} required value={form.content_he} onChange={e => setForm({...form, content_he: e.target.value})} className={inputClass} placeholder="כתוב את תוכן השיעור בעברית..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1">תוכן (אנגלית) *</label>
            <textarea rows={6} required value={form.content_en} onChange={e => setForm({...form, content_en: e.target.value})} className={inputClass} dir="ltr" placeholder="Write lesson content in English..." />
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
              <label className="block text-sm font-medium text-ink mb-1">תאריך השיעור *</label>
              <input type="date" required value={form.lesson_date} onChange={e => setForm({...form, lesson_date: e.target.value})} className={inputClass} dir="ltr" />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1">דקות משוערות</label>
              <input type="number" min={1} max={60} value={form.estimated_minutes} onChange={e => setForm({...form, estimated_minutes: parseInt(e.target.value)})} className={inputClass} dir="ltr" />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1">פרשה</label>
              <input type="text" value={form.parasha} onChange={e => setForm({...form, parasha: e.target.value})} className={inputClass} placeholder="בראשית" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1">YouTube ID</label>
              <input type="text" value={form.youtube_id} onChange={e => setForm({...form, youtube_id: e.target.value})} className={inputClass} dir="ltr" placeholder="dQw4w9WgXcQ" />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Audio URL</label>
              <input type="url" value={form.audio_url} onChange={e => setForm({...form, audio_url: e.target.value})} className={inputClass} dir="ltr" placeholder="https://..." />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="is_free" checked={form.is_free} onChange={e => setForm({...form, is_free: e.target.checked})} className="accent-gold" />
            <label htmlFor="is_free" className="text-sm text-ink">שיעור חינמי (גישה לכולם)</label>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={loading} className="btn-primary flex-1 disabled:opacity-60">
              {loading ? 'שומר...' : 'שמור שיעור'}
            </button>
            <Link href="/admin/cms" className="btn-secondary flex-1 text-center">ביטול</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
