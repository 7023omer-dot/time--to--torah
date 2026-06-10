'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Phase 3 — Progress & statistics.
 *
 * Persists to localStorage so stats NEVER reset on refresh (the bug the doc
 * calls out). When Supabase env vars are configured, `syncToSupabase` can push
 * this state to the DB; until then everything works fully offline/local.
 */
export interface ProgressState {
  lessonsCompleted: number
  minutesLearned: number
  streak: number
  lastStudyDate: string // YYYY-MM-DD
  perCategory: Record<string, number[]> // category → completed chapter ids
  finishLesson: (category: string, chapterId: number) => void
  categoryCount: (category: string) => number
  reset: () => void
}

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      lessonsCompleted: 0,
      minutesLearned: 0,
      streak: 0,
      lastStudyDate: '',
      perCategory: {},

      finishLesson: (category, chapterId) => {
        const s = get()
        const today = todayStr()

        // Streak: +1 if last study was yesterday, reset to 1 if older, keep if today
        let streak = s.streak
        if (s.lastStudyDate !== today) {
          const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
          streak = s.lastStudyDate === yesterday ? s.streak + 1 : 1
        }

        // Per-category de-duplicated chapter tracking
        const list = s.perCategory[category] || []
        const nextList = list.includes(chapterId) ? list : [...list, chapterId]

        set({
          lessonsCompleted: s.lessonsCompleted + 1,
          minutesLearned: s.minutesLearned + 5,
          streak,
          lastStudyDate: today,
          perCategory: { ...s.perCategory, [category]: nextList },
        })
      },

      categoryCount: (category) => (get().perCategory[category] || []).length,

      reset: () =>
        set({
          lessonsCompleted: 0,
          minutesLearned: 0,
          streak: 0,
          lastStudyDate: '',
          perCategory: {},
        }),
    }),
    { name: 'time-to-torah-progress' }
  )
)
