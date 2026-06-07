'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import type { Lesson, Category } from '@/lib/supabase/types'

interface Stats {
  streak: number
  totalCompleted: number
}

interface CommunityStats {
  total_minutes_learned: number
  active_learners_today: number
  total_lessons_completed: number
}

const CATEGORY_LINKS = [
  { slug: 'emunah', icon: '✨' },
  { slug: 'parasha', icon: '📜' },
  { slug: 'mussar', icon: '💎' },
  { slug: 'mishna', icon: '📚' },
  { slug: 'gemara', icon: '🕯️' },
  { slug: 'tehillim', icon: '🌟' },
  { slug: 'halacha', icon: '⚖️' },
  { slug: 'tzadikim', icon: '🌸' },
  { slug: 'shalom_bayit', icon: '🏠' },
  { slug: 'parnasa', icon: '💰' },
]

export default function LearnPage() {
  const supabase = createClient()
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [communityStats, setCommunityStats] = useState<CommunityStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [completed, setCompleted] = useState(false)
  const [marking, setMarking] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const [language, setLanguage] = useState<'he' | 'en'>('he')
  const [stats, setStats] = useState<Stats>({ streak: 0, totalCompleted: 0 })
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [lessonRes, statsRes, categoriesRes, communityRes] = await Promise.all([
          fetch('/api/lessons/today'),
          fetch('/api/user/stats'),
          supabase.from('categories').select('*').eq('is_active', true).order('display_order'),
          fetch('/api/community/stats'),
        ])

        if (lessonRes.ok) {
          const lessonData = await lessonRes.json()
          setLesson(lessonData.lesson)
          setCompleted(lessonData.completed || false)
        } else if (lessonRes.status === 403) {
          setError('נדרש מנוי פעיל לצפייה בשיעור זה.')
        }

        if (statsRes.ok) {
          const statsData = await statsRes.json()
          setStats({ streak: statsData.streak, totalCompleted: statsData.totalCompleted })
        }

        if (categoriesRes.data) {
          setCategories(categoriesRes.data)
        }

        if (communityRes.ok) {
          const communityData = await communityRes.json()
          setCommunityStats(communityData)
        }
      } catch {
        setError('שגיאה בטעינת השיעור.')
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  const handleMarkComplete = async () => {
    if (!lesson || completed || marking) return
    setMarking(true)
    const response = await fetch('/api/lessons/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lesson_id: lesson.id }),
    })
    if (response.ok) {
      setCompleted(true)
      setStats((prev) => ({ streak: prev.streak + 1, totalCompleted: prev.totalCompleted + 1 }))
      await fetch('/api/achievements/check', { method: 'POST' })
    }
    setMarking(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-parchment">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-stone">טוען...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-parchment py-10" dir="rtl">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Community stats bar */}
        {communityStats && (
          <div className="bg-ink text-parchment rounded-xl p-4 mb-8 text-center">
            <p className="text-gold font-heading text-lg font-bold mb-1">
              ביחד למדנו {communityStats.total_minutes_learned.toLocaleString()} דקות תורה
            </p>
            <p className="text-parchment/60 text-xs">
              {communityStats.active_learners_today.toLocaleString()} לומדים היום • {communityStats.total_lessons_completed.toLocaleString()} שיעורים הושלמו סה&quot;כ
            </p>
          </div>
        )}

        {/* User stats bar */}
        <div className="flex items-center justify-between mb-8 bg-white rounded-xl p-4 shadow-sm border border-gold/20">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-gold font-heading text-2xl font-bold">{stats.streak} 🔥</div>
              <div className="text-xs text-stone">ימים רצופים</div>
            </div>
            <div className="w-px h-10 bg-stone/20" />
            <div className="text-center">
              <div className="text-gold font-heading text-2xl font-bold">{stats.totalCompleted}</div>
              <div className="text-xs text-stone">שיעורים</div>
            </div>
          </div>
          <div className="text-xs text-stone text-left">
            {new Date().toLocaleDateString('he-IL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>

        {/* Today's featured lesson */}
        <h2 className="font-heading text-2xl font-bold text-ink mb-4">שיעור היום</h2>

        {error ? (
          <div className="card text-center py-12 mb-8">
            <div className="text-4xl mb-4">🔒</div>
            <p className="text-ink font-semibold text-lg mb-2">{error}</p>
            <Link href="/subscribe" className="btn-primary mt-4 inline-block">
              הצטרף עכשיו
            </Link>
          </div>
        ) : lesson ? (
          <div className="card animate-fade-in mb-10">
            <div className="flex items-start justify-between mb-6 gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 bg-gold/10 text-gold text-xs font-medium px-3 py-1 rounded-full">
                    ⏱ {(lesson as any).estimated_minutes || 5} דקות
                  </span>
                  {lesson.is_free && (
                    <span className="bg-green-50 text-green-700 text-xs font-medium px-2 py-1 rounded-full">חינמי</span>
                  )}
                </div>
                <h1 className="font-heading text-2xl sm:text-3xl font-bold text-ink mb-1">
                  {language === 'he' ? lesson.title_he : lesson.title_en}
                </h1>
                {lesson.parasha && <p className="text-stone text-sm">פרשה: {lesson.parasha}</p>}
              </div>
              <div className="flex border border-stone/30 rounded-lg overflow-hidden shrink-0">
                <button
                  onClick={() => setLanguage('he')}
                  className={`px-3 py-1.5 text-sm font-medium transition-colors ${language === 'he' ? 'bg-gold text-white' : 'text-stone hover:bg-stone/10'}`}
                >עב</button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1.5 text-sm font-medium transition-colors ${language === 'en' ? 'bg-gold text-white' : 'text-stone hover:bg-stone/10'}`}
                >EN</button>
              </div>
            </div>

            <div className="gold-divider" />

            <div
              className={`prose max-w-none mb-8 text-ink leading-relaxed ${language === 'he' ? 'text-right font-heading' : 'text-left ltr'}`}
              style={{ direction: language === 'he' ? 'rtl' : 'ltr' }}
            >
              {(language === 'he' ? lesson.content_he : lesson.content_en)
                .split('\n')
                .map((p, i) => <p key={i} className="mb-4 text-base sm:text-lg">{p}</p>)}
            </div>

            {lesson.youtube_id && (
              <div className="mb-8">
                <button onClick={() => setShowVideo(!showVideo)} className="btn-ghost border border-stone/30 mb-4">
                  {showVideo ? '▲ הסתר וידאו' : '▶ צפה בשיעור וידאו'}
                </button>
                {showVideo && (
                  <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                    <iframe
                      src={`https://www.youtube.com/embed/${lesson.youtube_id}`}
                      title="Torah lesson video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-gold/20">
              <div>
                {completed && (
                  <div className="flex items-center gap-2 text-green-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium text-sm">השיעור הושלם!</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3">
                <Link href={`/lesson/${lesson.id}`} className="btn-ghost border border-stone/30 text-sm py-2 px-4">
                  קרא עוד
                </Link>
                <button
                  onClick={handleMarkComplete}
                  disabled={completed || marking}
                  className={`${completed ? 'bg-green-100 text-green-700 border border-green-300 cursor-default' : 'btn-primary'} px-6 py-3 rounded-lg font-semibold text-sm transition-all`}
                >
                  {marking ? 'שומר...' : completed ? '✓ הושלם' : 'סיימתי ללמוד'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="card text-center py-12 mb-10">
            <div className="text-4xl mb-4">📖</div>
            <p className="text-ink font-semibold text-lg">אין שיעור זמין להיום</p>
            <p className="text-stone text-sm mt-2">No lesson available for today</p>
          </div>
        )}

        {/* Category browser */}
        <div className="mb-10">
          <h2 className="font-heading text-2xl font-bold text-ink mb-2">בחר נושא ולמד 5 דקות</h2>
          <p className="text-stone text-sm mb-6">לחץ על נושא ומצא שיעור מושלם לך</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {(categories.length > 0 ? categories : CATEGORY_LINKS.map(c => ({ id: c.slug, slug: c.slug, name_he: c.slug, name_en: c.slug, icon: c.icon, display_order: 0, is_active: true, description_he: null, description_en: null }))).map((cat) => (
              <Link
                key={cat.slug}
                href={`/api/lessons?category=${cat.slug}`}
                className="card text-center hover:shadow-md hover:border-gold/50 transition-all group cursor-pointer py-4"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{cat.icon}</div>
                <p className="font-medium text-ink text-sm group-hover:text-gold transition-colors">{cat.name_he}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
