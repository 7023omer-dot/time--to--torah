'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Profile, Subscription, Currency } from '@/lib/supabase/types'

interface UserStore {
  profile: Profile | null
  subscription: Subscription | null
  currency: Currency
  language: 'he' | 'en'
  setProfile: (p: Profile | null) => void
  setSubscription: (s: Subscription | null) => void
  setCurrency: (c: Currency) => void
  setLanguage: (l: 'he' | 'en') => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      profile: null,
      subscription: null,
      currency: 'ILS',
      language: 'he',
      setProfile: (profile) => set({ profile }),
      setSubscription: (subscription) => set({ subscription }),
      setCurrency: (currency) => set({ currency }),
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'time-to-torah-user',
      partialize: (state) => ({
        currency: state.currency,
        language: state.language,
      }),
    }
  )
)
