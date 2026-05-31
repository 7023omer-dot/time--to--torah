'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
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
  const router = useRouter()
  const { currency } = useUserStore()
  const [selectedDonation, setSelectedDonation] = useState<DonationTarget>('split_50_50')
  const [loading, setLoading] = useState<Plan | null>(null)
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [pendingPlan, setPendingPlan] = useState<Plan | null>(null)

  const handleSubscribeClick = (plan: Plan) => {
    setPendingPlan(plan)
    setShowModal(true)
  }

  const handleConfirm = async () => {
    if (!pendingPlan) return
    setShowModal(false)
    setError('')
    setLoading(pendingPlan)

    const response = await fetch('/api/subscriptions/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        plan: pendingPlan,
        currency,
        donationTarget: selectedDonation,
      }),
    })

    if (!response.ok) {
      const data = await response.json()
      if (data.redirect) {
        router.push(data.redirect)
        return
      }
      setError(data.error || 'שגיאה ביצירת המנוי.')
      setLoading(null)
      return
    }

    const { redirectUrl } = await response.json()
    router.push(redirectUrl || '/learn')
  }

  const plans: { key: Plan; savings?: string }[] = [
    { key: 'monthly' },
    { key: 'biannual', savings: 'חסכון 21%' },
    { key: 'annual', savings: 'חסכון 35%' },
  ]

  const planNames: Record<Plan, string> = {
    monthly: 'חודשי',
    biannual: 'חצי שנתי',
    annual: 'שנתי',
  }

  const planPeriod: Record<Plan, string> = {
    monthly: 'לחודש',
    biannual: 'ל-6 חודשים',
    annual: 'לשנה',
  }

  return (
    <div className="min-h-screen bg-parchment py-12" dir="rtl">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="font-heading text-4xl font-bold text-ink mb-3">בחר תוכנית מנוי</h1>
          <p className="text-stone">Choose your subscription plan</p>
          <p className="text-stone/70 text-sm mt-2">כל הכנסות מופנות לצדקה</p>
          <div className="mt-3 inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 text-yellow-800 text-xs px-3 py-1.5 rounded-full">
            <span>🧪</span>
            <span>מצב פיילוט — אין חיוב אמיתי / Pilot mode — no real charge</span>
          </div>
        </div>

        {/* Currency switcher */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className="text-stone text-sm">מטבע:</span>
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
                  <span className="text-xs text-gold font-medium">הכי פופולרי</span>
                </div>
              )}

              <div className="text-center mb-6">
                <h2 className="font-heading text-2xl font-bold text-ink mb-4">{planNames[key]}</h2>
                <div className="text-4xl font-bold text-ink mb-1">
                  {PLAN_PRICES_DISPLAY[key]?.[currency] || `${CURRENCY_SYMBOLS[currency]}?`}
                </div>
                <p className="text-stone text-sm">{planPeriod[key]}</p>
              </div>

              <ul className="space-y-2 mb-6 flex-1">
                {[
                  'שיעורי תורה יומיים',
                  'תוכן בעברית ואנגלית',
                  'מעקב התקדמות',
                  'וידאו שיעורים',
                  'תרומה לצדקה',
                  'מערכת הישגים',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-stone">
                    <span className="text-green-500">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribeClick(key)}
                disabled={loading !== null}
                className={`w-full py-3 rounded-lg font-semibold text-sm transition-colors disabled:opacity-60 ${
                  key === 'biannual' ? 'btn-primary' : 'btn-secondary'
                }`}
              >
                {loading === key ? 'מעבד...' : 'הצטרף'}
              </button>
            </div>
          ))}
        </div>

        {/* Donation target selector */}
        <div className="card max-w-2xl mx-auto">
          <h2 className="font-heading text-xl font-bold text-ink mb-2 text-center">לאן תרצה לתרום?</h2>
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
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Confirmation modal */}
      {showModal && pendingPlan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl" dir="rtl">
            <h3 className="font-heading text-xl font-bold text-ink mb-3">אישור הצטרפות</h3>
            <p className="text-stone text-sm mb-4">
              אתה עומד להצטרף לתוכנית{' '}
              <strong>{planNames[pendingPlan]}</strong>{' '}
              בסכום{' '}
              <strong>{PLAN_PRICES_DISPLAY[pendingPlan]?.[currency]}</strong>{' '}
              עם תרומה ל-
              <strong>{donationOptions.find(d => d.value === selectedDonation)?.he}</strong>.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 text-xs px-3 py-2 rounded-lg mb-5">
              🧪 מצב פיילוט — לא יתבצע חיוב אמיתי כרגע.
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleConfirm}
                className="btn-primary flex-1"
              >
                אישור — הצטרף!
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="btn-secondary flex-1"
              >
                ביטול
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
