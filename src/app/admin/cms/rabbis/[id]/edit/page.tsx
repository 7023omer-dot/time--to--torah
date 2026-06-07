'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

export default function EditRabbiPage() {
  const router = useRouter()
  const params = useParams()
  const [form, setForm] = useState({
    name_he: '', name_en: '', bio_he: '', bio_en: '', photo_url: '', is_active: true,
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchRabbi = async () => {
      const res = await fetch(`/api/admin/rabbis/${params.id}`)
      if (res.ok) {
        const data = await res.json()
        const r = data.rabbi
        setForm({
          name_he: r.name_he || '',
          name_en: r.name_en || '',
          bio_he: r.bio_he || '',
          bio_en: r.bio_en || '',
          photo_url: r.photo_url || '',
          is_active: r.is_active ?? true,
        })
      }
      setLoading(false)
    }
    fetchRabbi()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    const res = await fetch(`/api/admin/rabbis/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
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

  return (
    <div className="min-h-screen bg-parchment py-10" dir="rtl">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/cms" className="text-stone hover:text-gold text-sm">← חזור</Link>
          <h1 className="font-heading text-2xl font-bold text-ink">עריכת רב</h1>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">{error}</div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1">שם (עברית) *</label>
              <input
                type="text"
                required
                value={form.name_he}
                onChange={(e) => setForm({ ...form, name_he: e.target.value })}
                className="w-full border border-stone/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1">שם (אנגלית) *</label>
              <input
                type="text"
                required
                value={form.name_en}
                onChange={(e) => setForm({ ...form, name_en: e.target.value })}
                className="w-full border border-stone/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold"
                dir="ltr"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1">ביוגרפיה (עברית)</label>
            <textarea
              rows={3}
              value={form.bio_he}
              onChange={(e) => setForm({ ...form, bio_he: e.target.value })}
              className="w-full border border-stone/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1">ביוגרפיה (אנגלית)</label>
            <textarea
              rows={3}
              value={form.bio_en}
              onChange={(e) => setForm({ ...form, bio_en: e.target.value })}
              className="w-full border border-stone/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold"
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1">קישור לתמונה (URL)</label>
            <input
              type="url"
              value={form.photo_url}
              onChange={(e) => setForm({ ...form, photo_url: e.target.value })}
              className="w-full border border-stone/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold"
              dir="ltr"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_active"
              checked={form.is_active}
              onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
              className="accent-gold"
            />
            <label htmlFor="is_active" className="text-sm text-ink">פעיל</label>
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
