'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useProgressStore } from '@/store/useProgressStore'

/**
 * Phase 3 — "I finished the lesson" button.
 * Saves progress (persists across refresh via the progress store), then
 * auto-advances to the next lesson in the same category.
 */
export default function FinishLessonButton({
  category,
  chapterId,
  nextHref,
}: {
  category: string
  chapterId: number
  nextHref?: string
}) {
  const router = useRouter()
  const finishLesson = useProgressStore((s) => s.finishLesson)
  const streak = useProgressStore((s) => s.streak)
  const [done, setDone] = useState(false)

  const handle = () => {
    if (done) return
    finishLesson(category, chapterId)
    setDone(true)
    if (nextHref) setTimeout(() => router.push(nextHref), 1500)
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '1.6rem' }}>
      <button
        onClick={handle}
        style={{
          background: done
            ? 'linear-gradient(135deg,#28a745,#20c997)'
            : 'linear-gradient(135deg,var(--gold-dark),var(--gold))',
          color: done ? '#fff' : 'var(--bg-dark)',
          border: 'none',
          borderRadius: 24,
          padding: '10px 28px',
          fontFamily: "'Heebo',sans-serif",
          fontSize: '1rem',
          fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        {done ? (nextHref ? '✅ עובר לפרק הבא…' : '✅ סיימת קטגוריה זו!') : '✅ סיימתי ללמוד'}
      </button>
      {done && (
        <div style={{ color: '#F0D878', fontSize: '0.9rem', marginTop: '0.7rem' }}>
          🔥 רצף: <strong>{streak} ימים</strong> — הסטטיסטיקה נשמרה ולא תתאפס בריענון
        </div>
      )}
    </div>
  )
}
