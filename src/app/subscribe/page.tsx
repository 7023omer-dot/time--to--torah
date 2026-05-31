'use client'

import { useState } from 'react'
import { useUserStore } from '@/store/useUserStore'
import { PLAN_PRICES_DISPLAY, CURRENCY_SYMBOLS } from '@/lib/stripe'
import CurrencySwitcher from '@/components/CurrencySwitcher'

type DonationTarget = 'yeshiva' | 'poor_families' | 'split_50_50'
type Plan = 'monthly' | 'biannual' | 'annual'

const donationOptions: { value: DonationTarget; icon: string; he: string; en: string; desc_he: string; desc_en: string }[] = [
  {
    value: 'yeshiva',
    icon: '🏛️',
    he: 'ישיבה',
    en: 'Yeshiva',
    desc_he: 'תרומתך תועבר במלואה לתמיכה בלומדי תורה בישיבה.',
    desc_en: 'Your donation goes entirely to support Torah students in yeshiva.',
  },
  {
    value: 'poor_families',
    icon: '🏠',
    he: 'משפחות נזקקות',
    en: 'Poor Families',
    desc_he: 'תרומתך תועבר למשפחות נזקקות בקהילה היהודית.',
    desc_en: 'Your donation supports families in need in the Jewish community.',
  },
  {
    value: 'split_50_50',
    icon: '⚖️',
    he: 'חלוקה שווה 50/50',
    en: 'Split 50/50',
    desc_he: 'תרומתך תחולק שווה בשווה בין ישיבה ומשפחות נזקקות.',
    desc_en: 'Your donation is split equally between yeshiva and families in need.',
  },
]

export default function SubscribePage() {
  const { currency } = useUserStore()
  const [selectedDonation, setSelectedDonation] = useState<DonationTarget>('split_50_50')
  const [loading, setLoading] = useState<Plan | null>(null)
  const [error, setError] = useState('')

  const handleSubscribe = async (plan: Plan) => {
    setError('')
    setLoading(plan)

    const response = await fetch('/api/subscriptions/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        plan,
        currency,
        donation_target: selectedDonation,
      }),
    })

    if (!response.ok) {
      const data = await response.json()
      if (data.redirect) {
        window.location.href = data.redirect
        return
      }
      setError(data.error || 'שגיאה ביצירת תשלום. / Error creating checkout.')
      setLoading(null)
      return
    }

    const { url } = await response.json()
    window.location.href = url
  }

  const plans: { key: Plan; savings?: string }[] = [
    { key: 'monthly' },
    { key: 'biannual', savings: 'חסכון 21% / Save 21%' },
    { key: 'annual', savings: 'חסכון 35% / Save 35%' },
  ]

  const planNames: Record<Plan, { he: string; en: string }> = {
    monthly: { he: 'חודשי', en: 'Monthly' },
    biannual: { he: 'חצי שנתי', en: 'Biannual' },
    annual: { he: 'שנתי', en: 'Annual' },
  }

  const planPeriod: Record<Plan, { he: string; en: string }> = {
    monthly: { he: 'לחודש', en: 'per month' },
    biannual: { he: 'ל-6 חודשים', en: 'for 6 months' },
    annual: { he: 'לשנה', en: 'per year' },
  }

  return (
    <div className="min-h-screen bg-parchment py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="font-heading text-4xl font-bold text-ink mb-3">בחר תוכנית מנוי</h1>
          <p className="text-stone">Choose your subscription plan</p>
          <p className="text-stone/70 text-sm mt-2">כל הכנסות מופנות לצדקה / All proceeds go to charity</p>
        </div>

        {/* Currency switcher */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className="text-stone text-sm">מטבע / Currency:</span>
          <CurrencySwitcher />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 mb-6 text-sm text-center">
            {error}
          </div>
        )}

        {/* Plan cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map(({ key, savings }) => (
            <div
              key={key}
              className={`card relative flex flex-col hover:shadow-md transition-shadow ${
                key === 'biannual' ? 'border-gold ring-2 ring-gold/30' : ''
              }`}
            >
              {savings && (
                <div className="absolute -top-3 right-1/2 translate-x-1/2">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${key === 'biannual' ? 'bg-gold text-white' : 'badge-savings'}`}>
                    {savings}
                  </span>
                </div>
              )}
              {key === 'biannual' && (
                <div className="text-center mb-2">
                  <span className="text-xs text-gold font-medium">הכי פופולרי / Most Popular</span>
                </div>
              )}

              <div className="text-center mb-6">
                <h2 className="font-heading text-2xl font-bold text-ink mb-1">{planNames[key].he}</h2>
                <p className="text-stone text-sm mb-4">{planNames[key].en}</p>
                <div className="text-4xl font-bold text-ink mb-1">
                  {PLAN_PRICES_DISPLAY[key]?.[currency] || `${CURRENCY_SYMBOLS[currency]}?`}
                </div>
                <p className="text-stone text-sm">{planPeriod[key].he} / {planPeriod[key].en}</p>
              </div>

              <ul className="space-y-2 mb-6 flex-1">
                <li className="flex items-center gap-2 text-sm text-stone">
                  <span className="text-green-500">✓</span>
                  שיעורי תורה יומיים / Daily Torah lessons
                </li>
                <li className="flex items-center gap-2 text-sm text-stone">
                  <span className="text-green-500">✓</span>
                  תוכן בעברית ואנגלית / Hebrew & English
                </li>
                <li className="flex items-center gap-2 text-sm text-stone">
                  <span className="text-green-500">✓</span>
                  מעקב התקדמות / Progress tracking
                </li>
                <li className="flex items-center gap-2 text-sm text-stone">
                  <span className="text-green-500">✓</span>
                  וידאו שיעורים / Video lessons
                </li>
                <li className="flex items-center gap-2 text-sm text-stone">
                  <span className="text-green-500">✓</span>
                  תרומה לצדקה / Charitable donation
                </li>
              </ul>

              <button
                onClick={() => handleSubscribe(key)}
                disabled={loading !== null}
                className={`w-full py-3 rounded-lg font-semibold text-sm transition-colors disabled:opacity-60 ${
                  key === 'biannual'
                    ? 'btn-primary'
                    : 'btn-secondary'
                }`}
              >
                {loading === key ? 'מעבד...' : 'הצטרף עכשיו / Join Now'}
              </button>
            </div>
          ))}
        </div>

        {/* Donation target selector */}
        <div className="card max-w-2xl mx-auto">
          <h2 className="font-heading text-xl font-bold text-ink mb-2 text-center">
            לאן תרצה לתרום?
          </h2>
          <p className="text-stone text-sm text-center mb-6">Where would you like to donate?</p>

          <div className="space-y-3">
            {donationOptions.map((opt) => (
              <label
                key={opt.value}
                className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedDonation === opt.value
                    ? 'border-gold bg-gold/10'
                    : 'border-stone/20 hover:border-gold/40 hover:bg-gold/5'
                }`}
              >
                <input
                  type="radio"
                  name="donation"
                  value={opt.value}
                  checked={selectedDonation === opt.value}
                  onChange={(e) => setSelectedDonation(e.target.value as DonationTarget)}
                  className="mt-1 accent-gold"
                />
                <div className="text-2xl">{opt.icon}</div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <p className="font-semibold text-ink">{opt.he}</p>
                    <p className="text-stone text-xs">{opt.en}</p>
                  </div>
                  <p className="text-stone text-sm mt-1">{opt.desc_he}</p>
                  <p className="text-stone/70 text-xs mt-0.5">{opt.desc_en}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
