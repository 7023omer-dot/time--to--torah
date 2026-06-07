'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import type { LessonWithDetails } from '@/lib/supabase/types'

export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  const [lesson, setLesson] = useState<LessonWithDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [language, setLanguage] = useState<'he' | 'en'>('he')
  const [showVideo, setShowVideo] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [marking, setMarking] = useState(false)
  const [relatedLessons, setRelatedLessons] = useState<LessonWithDetails[]>([])

  useEffect(() => {
    const fetchLesson = async () => {
      setLoading(true)
      const res = await fetch(`/api/lessons/${params.id}`)
      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'שגיאה בטעינת השיעור')
        setLoading(false)
        return
      }
      const data = await res.json()
      setLesson(data.lesson)

      // Fetch related lessons in same category
      if (data.lesson.category_id) {
        const relRes = await fetch(`/api/lessons?category=${data.lesson.categories?.slug}&limit=4`)
        if (relRes.ok) {
          const relData = await relRes.json()
          setRelatedLessons(
            (relData.lessons || []).filter((l: LessonWithDetails) => l.id !== data.lesson.id).slice(0, 3)
          )
        }
      }

      // Check if already completed
      const statsRes = await fetch('/api/user/stats')
      if (statsRes.ok) {
        const stats = await statsRes.json()
        if (stats.completedLessonIds?.includes(params.id)) {
          setCompleted(true)
        }
      }

      setLoading(false)
    }
    fetchLesson()
  }, [params.id])

  const handleMarkComplete = async () => {
    if (!lesson || completed || marking) return
    setMarking(true)
    const res = await fetch('/api/lessons/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lesson_id: lesson.id }),
    })
    if (res.ok) {
      setCompleted(true)
      // Trigger achievement check
      await fetch('/api/achievements/check', { method: 'POST' })
    }
    setMarking(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-parchment">
        <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-parchment py-16 flex items-center justify-center">
        <div className="card text-center max-w-md">
          <div className="text-5xl mb-4">🔒</div>
          <p className="font-semibold text-ink text-lg mb-2">{error}</p>
          {error.includes('subscription') || error.includes('מנוי') ? (
            <Link href="/subscribe" className="btn-primary mt-4 inline-block">
              הצטרף עכשיו
            </Link>
          ) : (
            <button onClick={() => router.back()} className="btn-secondary mt-4">
              חזור
            </button>
          )}
        </div>
      </div>
    )
  }

  if (!lesson) return null

  const rabbi = lesson.rabbis as any
  const category = lesson.categories as any

  return (
    <div className="min-h-screen bg-parchment py-10" dir="rtl">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link href="/learn" className="inline-flex items-center gap-2 text-stone hover:text-gold mb-6 text-sm transition-colors">
          <span>→</span> חזור ללמידה
        </Link>

        <div className="card animate-fade-in">
          {/* Header */}
          <div className="flex items-start justify-between mb-4 gap-4">
            <div className="flex-1">
              {/* Category badge */}
              {category && (
                <span className="inline-flex items-center gap-1 bg-gold/10 text-gold text-xs font-medium px-3 py-1 rounded-full mb-3">
                  <span>{category.icon}</span>
                  <span>{language === 'he' ? category.name_he : category.name_en}</span>
                </span>
              )}

              {/* Time badge */}
              <span className="inline-flex items-center gap-1 bg-stone/10 text-stone text-xs font-medium px-3 py-1 rounded-full mb-3 mr-2">
                ⏱ {lesson.estimated_minutes} דקות
              </span>

              <h1 className="font-heading text-2xl sm:text-3xl font-bold text-ink mb-2">
                {language === 'he' ? lesson.title_he : lesson.title_en}
              </h1>

              {lesson.parasha && (
                <p className="text-stone text-sm">פרשה: {lesson.parasha}</p>
              )}
            </div>

            {/* Language toggle */}
            <div className="flex border border-stone/30 rounded-lg overflow-hidden shrink-0">
              <button
                onClick={() => setLanguage('he')}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${language === 'he' ? 'bg-gold text-white' : 'text-stone hover:bg-stone/10'}`}
              >
                עב
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${language === 'en' ? 'bg-gold text-white' : 'text-stone hover:bg-stone/10'}`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Rabbi info */}
          {rabbi && (
            <div className="flex items-center gap-3 bg-gold/5 border border-gold/20 rounded-xl p-3 mb-5">
              {rabbi.photo_url ? (
                <img src={rabbi.photo_url} alt={rabbi.name_he} className="w-12 h-12 rounded-full object-cover" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                  <span className="text-gold font-heading font-bold text-lg">
                    {rabbi.name_he?.[0]}
                  </span>
                </div>
              )}
              <div>
                <p className="font-semibold text-ink text-sm">{language === 'he' ? rabbi.name_he : rabbi.name_en}</p>
                <p className="text-stone text-xs line-clamp-1">
                  {language === 'he' ? rabbi.bio_he : rabbi.bio_en}
                </p>
              </div>
            </div>
          )}

          <div className="gold-divider" />

          {/* Summary */}
          {(language === 'he' ? lesson.summary_he : lesson.summary_en) && (
            <div className="bg-gold/5 border-r-4 border-gold rounded-lg p-4 mb-6">
              <p className="text-ink font-medium text-sm italic">
                {language === 'he' ? lesson.summary_he : lesson.summary_en}
              </p>
            </div>
          )}

          {/* Content */}
          <div
            className={`prose max-w-none mb-8 text-ink leading-relaxed ${language === 'he' ? 'text-right font-heading' : 'text-left'}`}
            style={{ direction: language === 'he' ? 'rtl' : 'ltr' }}
          >
            {(language === 'he' ? lesson.content_he : lesson.content_en)
              .split('\n')
              .map((paragraph, i) => (
                <p key={i} className="mb-4 text-base sm:text-lg">
                  {paragraph}
                </p>
              ))}
          </div>

          {/* Audio player */}
          {lesson.audio_url && (
            <div className="mb-6">
              <p className="text-stone text-sm font-medium mb-2">האזן לשיעור / Listen to lesson</p>
              <audio controls className="w-full rounded-lg" preload="metadata">
                <source src={lesson.audio_url} />
                הדפדפן שלך אינו תומך בנגן אודיו.
              </audio>
            </div>
          )}

          {/* YouTube embed */}
          {lesson.youtube_id && (
            <div className="mb-8">
              <button
                onClick={() => setShowVideo(!showVideo)}
                className="btn-ghost border border-stone/30 mb-4"
              >
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

          {/* Mark complete */}
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
            <button
              onClick={handleMarkComplete}
              disabled={completed || marking}
              className={`${completed ? 'bg-green-100 text-green-700 border border-green-300 cursor-default' : 'btn-primary'} px-6 py-3 rounded-lg font-semibold text-sm transition-all`}
            >
              {marking ? 'שומר...' : completed ? '✓ הושלם' : 'סיימתי ללמוד'}
            </button>
          </div>
        </div>

        {/* Related lessons */}
        {relatedLessons.length > 0 && (
          <div className="mt-10">
            <h2 className="font-heading text-xl font-bold text-ink mb-4">שיעורים נוספים בנושא</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedLessons.map((rel) => {
                const relCat = rel.categories as any
                return (
                  <Link
                    key={rel.id}
                    href={`/lesson/${rel.id}`}
                    className="card hover:shadow-md transition-shadow group"
                  >
                    {relCat && (
                      <span className="text-xs text-gold font-medium">
                        {relCat.icon} {relCat.name_he}
                      </span>
                    )}
                    <h3 className="font-heading font-bold text-ink text-sm mt-1 group-hover:text-gold transition-colors line-clamp-2">
                      {rel.title_he}
                    </h3>
                    <p className="text-stone text-xs mt-2">⏱ {rel.estimated_minutes} דקות</p>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
