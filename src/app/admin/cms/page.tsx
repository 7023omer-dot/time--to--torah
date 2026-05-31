'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type Tab = 'rabbis' | 'categories' | 'lessons'

interface Rabbi { id: string; name_he: string; name_en: string; is_active: boolean }
interface Category { id: string; slug: string; name_he: string; name_en: string; icon: string; display_order: number; is_active: boolean }
interface Lesson { id: string; title_he: string; title_en: string; lesson_date: string; is_free: boolean; estimated_minutes: number; categories?: { name_he: string; icon: string } | null; rabbis?: { name_he: string } | null }

export default function CMSPage() {
  const [tab, setTab] = useState<Tab>('rabbis')
  const [rabbis, setRabbis] = useState<Rabbi[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(false)
  const [searchLessons, setSearchLessons] = useState('')
  const [filterCategory, setFilterCategory] = useState('')

  const fetchRabbis = async () => {
    setLoading(true)
    const res = await fetch('/api/admin/rabbis')
    if (res.ok) { const data = await res.json(); setRabbis(data.rabbis || []) }
    setLoading(false)
  }

  const fetchCategories = async () => {
    setLoading(true)
    const res = await fetch('/api/admin/categories')
    if (res.ok) { const data = await res.json(); setCategories(data.categories || []) }
    setLoading(false)
  }

  const fetchLessons = async () => {
    setLoading(true)
    const params = new URLSearchParams({ limit: '50' })
    if (searchLessons) params.set('search', searchLessons)
    if (filterCategory) params.set('category', filterCategory)
    const res = await fetch(`/api/admin/lessons?${params}`)
    if (res.ok) { const data = await res.json(); setLessons(data.lessons || []) }
    setLoading(false)
  }

  useEffect(() => {
    if (tab === 'rabbis') fetchRabbis()
    else if (tab === 'categories') fetchCategories()
    else fetchLessons()
  }, [tab])

  useEffect(() => {
    if (tab === 'lessons') fetchLessons()
  }, [searchLessons, filterCategory])

  const deleteRabbi = async (id: string) => {
    if (!confirm('למחוק את הרב?')) return
    await fetch(`/api/admin/rabbis/${id}`, { method: 'DELETE' })
    fetchRabbis()
  }

  const deleteCategory = async (id: string) => {
    if (!confirm('למחוק את הקטגוריה?')) return
    await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' })
    fetchCategories()
  }

  const deleteLesson = async (id: string) => {
    if (!confirm('למחוק את השיעור?')) return
    await fetch(`/api/admin/lessons/${id}`, { method: 'DELETE' })
    fetchLessons()
  }

  return (
    <div className="min-h-screen bg-parchment py-10" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-heading text-3xl font-bold text-ink">ניהול תוכן (CMS)</h1>
          <Link href="/admin" className="btn-secondary text-sm py-2 px-4">← לוח ניהול</Link>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gold/30 mb-6">
          {(['rabbis', 'categories', 'lessons'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
                tab === t ? 'border-gold text-gold' : 'border-transparent text-stone hover:text-ink'
              }`}
            >
              {t === 'rabbis' ? 'רבנים' : t === 'categories' ? 'קטגוריות' : 'שיעורים'}
            </button>
          ))}
        </div>

        {/* Rabbis tab */}
        {tab === 'rabbis' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-xl font-bold text-ink">רבנים</h2>
              <Link href="/admin/cms/rabbis/new" className="btn-primary text-sm py-2 px-4">+ הוסף רב</Link>
            </div>
            <div className="card overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gold/20 text-stone text-xs">
                    <th className="text-right py-2 px-3">שם (עברית)</th>
                    <th className="text-right py-2 px-3">שם (אנגלית)</th>
                    <th className="text-right py-2 px-3">פעיל</th>
                    <th className="text-right py-2 px-3">פעולות</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr><td colSpan={4} className="py-4 text-center text-stone">טוען...</td></tr>
                  )}
                  {!loading && rabbis.map((r) => (
                    <tr key={r.id} className="border-b border-stone/10 hover:bg-gold/5">
                      <td className="py-2 px-3 font-medium">{r.name_he}</td>
                      <td className="py-2 px-3 text-stone">{r.name_en}</td>
                      <td className="py-2 px-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${r.is_active ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                          {r.is_active ? 'פעיל' : 'לא פעיל'}
                        </span>
                      </td>
                      <td className="py-2 px-3">
                        <div className="flex gap-2">
                          <Link href={`/admin/cms/rabbis/${r.id}/edit`} className="text-xs text-blue-600 hover:underline">ערוך</Link>
                          <button onClick={() => deleteRabbi(r.id)} className="text-xs text-red-600 hover:underline">מחק</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {!loading && rabbis.length === 0 && (
                    <tr><td colSpan={4} className="py-4 text-center text-stone">אין רבנים</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Categories tab */}
        {tab === 'categories' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-xl font-bold text-ink">קטגוריות</h2>
            </div>
            <div className="card overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gold/20 text-stone text-xs">
                    <th className="text-right py-2 px-3">אייקון</th>
                    <th className="text-right py-2 px-3">שם (עברית)</th>
                    <th className="text-right py-2 px-3">Slug</th>
                    <th className="text-right py-2 px-3">סדר</th>
                    <th className="text-right py-2 px-3">פעיל</th>
                    <th className="text-right py-2 px-3">פעולות</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && <tr><td colSpan={6} className="py-4 text-center text-stone">טוען...</td></tr>}
                  {!loading && categories.map((c) => (
                    <tr key={c.id} className="border-b border-stone/10 hover:bg-gold/5">
                      <td className="py-2 px-3 text-xl">{c.icon}</td>
                      <td className="py-2 px-3 font-medium">{c.name_he}</td>
                      <td className="py-2 px-3 text-stone font-mono text-xs">{c.slug}</td>
                      <td className="py-2 px-3">{c.display_order}</td>
                      <td className="py-2 px-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${c.is_active ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                          {c.is_active ? 'פעיל' : 'לא פעיל'}
                        </span>
                      </td>
                      <td className="py-2 px-3">
                        <button onClick={() => deleteCategory(c.id)} className="text-xs text-red-600 hover:underline">מחק</button>
                      </td>
                    </tr>
                  ))}
                  {!loading && categories.length === 0 && (
                    <tr><td colSpan={6} className="py-4 text-center text-stone">אין קטגוריות</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Lessons tab */}
        {tab === 'lessons' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-xl font-bold text-ink">שיעורים</h2>
              <Link href="/admin/cms/lessons/new" className="btn-primary text-sm py-2 px-4">+ הוסף שיעור</Link>
            </div>
            <div className="flex gap-3 mb-4">
              <input
                type="text"
                placeholder="חפש שיעור..."
                value={searchLessons}
                onChange={(e) => setSearchLessons(e.target.value)}
                className="border border-stone/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold flex-1"
              />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="border border-stone/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold"
              >
                <option value="">כל הקטגוריות</option>
                <option value="emunah">אמונה</option>
                <option value="parasha">פרשה</option>
                <option value="mussar">מוסר</option>
                <option value="mishna">משנה</option>
                <option value="gemara">גמרא</option>
                <option value="tehillim">תהילים</option>
                <option value="halacha">הלכה</option>
                <option value="tzadikim">סיפורי צדיקים</option>
                <option value="shalom_bayit">שלום בית</option>
                <option value="parnasa">פרנסה</option>
              </select>
            </div>
            <div className="card overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gold/20 text-stone text-xs">
                    <th className="text-right py-2 px-3">כותרת</th>
                    <th className="text-right py-2 px-3">קטגוריה</th>
                    <th className="text-right py-2 px-3">רב</th>
                    <th className="text-right py-2 px-3">תאריך</th>
                    <th className="text-right py-2 px-3">חינמי</th>
                    <th className="text-right py-2 px-3">דקות</th>
                    <th className="text-right py-2 px-3">פעולות</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && <tr><td colSpan={7} className="py-4 text-center text-stone">טוען...</td></tr>}
                  {!loading && lessons.map((l) => (
                    <tr key={l.id} className="border-b border-stone/10 hover:bg-gold/5">
                      <td className="py-2 px-3">
                        <p className="font-medium line-clamp-1">{l.title_he}</p>
                        <p className="text-stone text-xs line-clamp-1">{l.title_en}</p>
                      </td>
                      <td className="py-2 px-3 text-xs">
                        {(l.categories as any)?.icon} {(l.categories as any)?.name_he || '—'}
                      </td>
                      <td className="py-2 px-3 text-xs text-stone">{(l.rabbis as any)?.name_he || '—'}</td>
                      <td className="py-2 px-3 text-xs text-stone">{l.lesson_date}</td>
                      <td className="py-2 px-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${l.is_free ? 'bg-green-50 text-green-700' : 'bg-stone/10 text-stone'}`}>
                          {l.is_free ? 'חינמי' : 'בתשלום'}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-center">{l.estimated_minutes}</td>
                      <td className="py-2 px-3">
                        <div className="flex gap-2">
                          <Link href={`/admin/cms/lessons/${l.id}/edit`} className="text-xs text-blue-600 hover:underline">ערוך</Link>
                          <button onClick={() => deleteLesson(l.id)} className="text-xs text-red-600 hover:underline">מחק</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {!loading && lessons.length === 0 && (
                    <tr><td colSpan={7} className="py-4 text-center text-stone">אין שיעורים</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
