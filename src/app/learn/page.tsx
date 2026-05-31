'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Lesson } from '@/lib/supabase/types'

interface Stats {
  streak: number
  totalCompleted: number
}

export default function LearnPage() {
  const supabase = createClient()
  const [lesson, setLesson] = useState<Lesson | null>(null)
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
        const [lessonRes, statsRes] = await Promise.all([
          fetch('/api/lessons/today'),
          fetch('/api/user/stats'),
        ])

        if (lessonRes.ok) {
          const lessonData = await lessonRes.json()
          setLesson(lessonData.lesson)
          setCompleted(lessonData.completed || false)
        } else if (lessonRes.status === 403) {
          setError('נדרש מנוי פעיל לצפייה בשיעור זה. / Active subscription required.')
        }

        if (statsRes.ok) {
          const statsData = await statsRes.json()
          setStats({ streak: statsData.streak, totalCompleted: statsData.totalCompleted })
        }
      } catch {
        setError('שגיאה בטעינת השיעור. / Error loading lesson.')
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
      setStats((prev) => ({
        streak: prev.streak + 1,
        totalCompleted: prev.totalCompleted + 1,
      }))
    }
    setMarking(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-parchment">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-stone">טוען שיעור... / Loading lesson...</p>
        </div>
      </div>
    )
  }

  const categoryLabels: Record<string, string> = {
    parasha: 'פרשת השבוע',
    halacha: 'הלכה',
    machshava: 'מחשבה',
    gemara: 'גמרא',
    mussar: 'מוסר',
  }

  return (
    <div className="min-h-screen bg-parchment py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats bar */}
        <div className="flex items-center justify-between mb-8 bg-ink text-parchment rounded-xl p-4">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-gold font-heading text-2xl font-bold">{stats.streak}</div>
              <div className="text-xs text-parchment/60">ימים רצופים / streak</div>
            </div>
            <div className="w-px h-10 bg-parchment/20" />
            <div className="text-center">
              <div className="text-gold font-heading text-2xl font-bold">{stats.totalCompleted}</div>
              <div className="text-xs text-parchment/60">שיעורים / lessons</div>
            </div>
          </div>
          <div className="text-xs text-parchment/50 text-left">
            {new Date().toLocaleDateString('he-IL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>

        {error ? (
          <div className="card text-center py-12">
            <div className="text-4xl mb-4">🔒</div>
            <p className="text-ink font-semibold text-lg mb-2">{error}</p>
            <a href="/subscribe" className="btn-primary mt-4 inline-block">
              הצטרף עכשיו / Subscribe Now
            </a>
          </div>
        ) : lesson ? (
          <div className="card animate-fade-in">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                {lesson.category && (
                  <span className="inline-block bg-gold/10 text-gold text-xs font-medium px-3 py-1 rounded-full mb-3">
                    {categoryLabels[lesson.category] || lesson.category}
                  </span>
                )}
                <h1 className="font-heading text-2xl sm:text-3xl font-bold text-ink mb-1">
                  {language === 'he' ? lesson.title_he : lesson.title_en}
                </h1>
                {lesson.parasha && (
                  <p className="text-stone text-sm">פרשה: {lesson.parasha}</p>
                )}
              </div>

              {/* Language toggle */}
              <div className="flex border border-stone/30 rounded-lg overflow-hidden mr-4">
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

            <div className="gold-divider" />

            {/* Content */}
            <div className={`prose max-w-none mb-8 text-ink leading-relaxed ${language === 'he' ? 'text-right font-heading' : 'text-left ltr'}`}
              style={{ direction: language === 'he' ? 'rtl' : 'ltr' }}>
              {(language === 'he' ? lesson.content_he : lesson.content_en)
                .split('\n')
                .map((paragraph, i) => (
                  <p key={i} className="mb-4 text-base sm:text-lg">
                    {paragraph}
                  </p>
                ))}
            </div>

            {/* YouTube embed */}
            {lesson.youtube_id && (
              <div className="mb-8">
                <button
                  onClick={() => setShowVideo(!showVideo)}
                  className="btn-ghost border border-stone/30 mb-4"
                >
                  {showVideo ? (
                    <>
                      <span className="ml-2">▲</span>
                      הסתר וידאו / Hide Video
                    </>
                  ) : (
                    <>
                      <span className="ml-2">▶</span>
                      צפה בשיעור וידאו / Watch Video Lesson
                    </>
                  )}
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

            {/* Mark complete button */}
            <div className="flex items-center justify-between pt-4 border-t border-gold/20">
              <div>
                {completed && (
                  <div className="flex items-center gap-2 text-green-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium text-sm">השיעור הושלם! / Lesson completed!</span>
                  </div>
                )}
              </div>
              <button
                onClick={handleMarkComplete}
                disabled={completed || marking}
                className={`${completed ? 'bg-green-100 text-green-700 border border-green-300 cursor-default' : 'btn-primary'} px-6 py-3 rounded-lg font-semibold text-sm transition-all disabled:cursor-not-allowed`}
              >
                {marking ? 'שומר...' : completed ? '✓ הושלם' : 'סיימתי ללמוד'}
              </button>
            </div>
          </div>
        ) : (
          <div className="card text-center py-12">
            <div className="text-4xl mb-4">📖</div>
            <p className="text-ink font-semibold text-lg">אין שיעור זמין להיום</p>
            <p className="text-stone text-sm mt-2">No lesson available for today</p>
          </div>
        )}
      </div>
    </div>
  )
}
