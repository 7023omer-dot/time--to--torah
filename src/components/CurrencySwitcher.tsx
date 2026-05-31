'use client'

import { useUserStore } from '@/store/useUserStore'
import { CURRENCIES, CURRENCY_SYMBOLS } from '@/lib/stripe'
import type { Currency } from '@/lib/supabase/types'

export default function CurrencySwitcher() {
  const { currency, setCurrency } = useUserStore()

  return (
    <div className="relative">
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value as Currency)}
        className="appearance-none bg-transparent border border-gold/40 text-ink text-sm rounded-md px-3 py-1.5 pr-7 cursor-pointer hover:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors"
        aria-label="Select currency"
      >
        {CURRENCIES.map((c) => (
          <option key={c} value={c}>
            {CURRENCY_SYMBOLS[c]} {c}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 left-2 flex items-center">
        <svg className="w-3 h-3 text-stone" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
}
