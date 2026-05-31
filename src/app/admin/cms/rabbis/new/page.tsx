'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewRabbiPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name_he: '', name_en: '', bio_he: '', bio_en: '', photo_url: '', is_active: true,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/rabbis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (!res.ok) {
      const data = await res.json()
      setError(data.error || 'שגיאה')
      setLoading(false)
      return
    }

    router.push('/admin/cms')
  }

  return (
    <div className="min-h-screen bg-parchment py-10" dir="rtl">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/cms" className="text-stone hover:text-gold text-sm">← חזור</Link>
          <h1 className="font-heading text-2xl font-bold text-ink">הוספת רב חדש</h1>
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
                placeholder="הרב ישראל ישראלי"
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
                placeholder="Rabbi Yisrael Yisraeli"
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
              placeholder="תיאור קצר..."
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
              placeholder="Short description..."
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
              placeholder="https://..."
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
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 disabled:opacity-60"
            >
              {loading ? 'שומר...' : 'שמור רב'}
            </button>
            <Link href="/admin/cms" className="btn-secondary flex-1 text-center">ביטול</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
