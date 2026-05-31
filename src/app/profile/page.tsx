'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useUserStore } from '@/store/useUserStore'
import type { Profile, Subscription, DonationAllocation } from '@/lib/supabase/types'
import { CURRENCY_SYMBOLS } from '@/lib/stripe'

interface UserStats {
  streak: number
  totalCompleted: number
  donationAllocations: DonationAllocation[]
}

const donationTargetLabels: Record<string, { he: string; en: string }> = {
  yeshiva: { he: 'ישיבה', en: 'Yeshiva' },
  poor_families: { he: 'משפחות נזקקות', en: 'Poor Families' },
  split_50_50: { he: 'חלוקה שווה', en: 'Split 50/50' },
}

export default function ProfilePage() {
  const supabase = createClient()
  const { setProfile, setSubscription } = useUserStore()
  const [profile, setLocalProfile] = useState<Profile | null>(null)
  const [subscription, setLocalSubscription] = useState<Subscription | null>(null)
  const [stats, setStats] = useState<UserStats>({ streak: 0, totalCompleted: 0, donationAllocations: [] })
  const [loading, setLoading] = useState(true)
  const [updatingDonation, setUpdatingDonation] = useState(false)
  const [newDonationTarget, setNewDonationTarget] = useState<string>('')
  const [portalLoading, setPortalLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const [{ data: profileData }, { data: subData }, statsRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('subscriptions').select('*').eq('user_id', user.id).eq('status', 'active').single(),
        fetch('/api/user/stats'),
      ])

      if (profileData) {
        setLocalProfile(profileData)
        setProfile(profileData)
      }
      if (subData) {
        setLocalSubscription(subData)
        setLocalSubscription(subData)
        setSubscription(subData)
        setNewDonationTarget(subData.donation_target)
      }
      if (statsRes.ok) {
        const statsData = await statsRes.json()
        setStats(statsData)
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  const handleUpdateDonation = async () => {
    if (!subscription || newDonationTarget === subscription.donation_target) return
    setUpdatingDonation(true)

    const response = await fetch('/api/subscriptions/update-donation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subscription_id: subscription.id,
        donation_target: newDonationTarget,
      }),
    })

    if (response.ok) {
      const updated = await response.json()
      setLocalSubscription(updated.subscription)
      setSubscription(updated.subscription)
    }
    setUpdatingDonation(false)
  }

  const handleManageSubscription = async () => {
    setPortalLoading(true)
    const response = await fetch('/api/subscriptions/portal', {
      method: 'POST',
    })

    if (response.ok) {
      const { url } = await response.json()
      window.location.href = url
    }
    setPortalLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-parchment">
        <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const planLabels: Record<string, string> = {
    monthly: 'חודשי / Monthly',
    biannual: 'חצי שנתי / Biannual',
    annual: 'שנתי / Annual',
  }

  const statusLabels: Record<string, { label: string; color: string }> = {
    active: { label: 'פעיל / Active', color: 'text-green-600 bg-green-50' },
    canceled: { label: 'מבוטל / Canceled', color: 'text-red-600 bg-red-50' },
    past_due: { label: 'באיחור / Past Due', color: 'text-yellow-600 bg-yellow-50' },
    trialing: { label: 'ניסיון / Trial', color: 'text-blue-600 bg-blue-50' },
    incomplete: { label: 'לא שלם / Incomplete', color: 'text-gray-600 bg-gray-50' },
  }

  const totalDonated = stats.donationAllocations.reduce((sum, a) => sum + a.amount_cents, 0)
  const totalYeshiva = stats.donationAllocations.reduce((sum, a) => sum + a.yeshiva_cents, 0)
  const totalFamilies = stats.donationAllocations.reduce((sum, a) => sum + a.poor_families_cents, 0)

  return (
    <div className="min-h-screen bg-parchment py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="font-heading text-3xl font-bold text-ink">הפרופיל שלי / My Profile</h1>

        {/* User Info */}
        <div className="card">
          <h2 className="font-heading text-xl font-bold text-ink mb-4">פרטים אישיים / Personal Details</h2>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="avatar" className="w-full h-full rounded-full object-cover" />
              ) : (
                <span className="text-gold font-heading text-2xl font-bold">
                  {profile?.full_name?.[0] || profile?.email?.[0]?.toUpperCase() || '?'}
                </span>
              )}
            </div>
            <div>
              <p className="font-semibold text-ink text-lg">{profile?.full_name || 'משתמש / User'}</p>
              <p className="text-stone text-sm ltr" dir="ltr">{profile?.email}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="card text-center">
            <div className="text-gold font-heading text-3xl font-bold">{stats.streak}</div>
            <div className="text-stone text-xs mt-1">ימים רצופים</div>
            <div className="text-stone/60 text-xs">day streak</div>
          </div>
          <div className="card text-center">
            <div className="text-gold font-heading text-3xl font-bold">{stats.totalCompleted}</div>
            <div className="text-stone text-xs mt-1">שיעורים הושלמו</div>
            <div className="text-stone/60 text-xs">lessons completed</div>
          </div>
          <div className="card text-center">
            <div className="text-gold font-heading text-3xl font-bold">
              {subscription?.currency ? CURRENCY_SYMBOLS[subscription.currency] : '₪'}
              {((totalDonated) / 100).toFixed(0)}
            </div>
            <div className="text-stone text-xs mt-1">תרמת סה&quot;כ</div>
            <div className="text-stone/60 text-xs">total donated</div>
          </div>
          <div className="card text-center">
            <div className="text-gold font-heading text-3xl font-bold">{stats.donationAllocations.length}</div>
            <div className="text-stone text-xs mt-1">תשלומים</div>
            <div className="text-stone/60 text-xs">payments</div>
          </div>
        </div>

        {/* Subscription */}
        <div className="card">
          <h2 className="font-heading text-xl font-bold text-ink mb-4">מנוי / Subscription</h2>
          {subscription ? (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusLabels[subscription.status]?.color}`}>
                  {statusLabels[subscription.status]?.label}
                </span>
                <span className="text-ink font-medium">{planLabels[subscription.plan]}</span>
                <span className="text-stone text-sm">
                  {CURRENCY_SYMBOLS[subscription.currency]}{(subscription.amount_cents / 100).toFixed(2)}
                </span>
              </div>

              {subscription.current_period_end && (
                <div className="text-sm text-stone">
                  <span>תאריך חידוש הבא / Next renewal: </span>
                  <span className="font-medium text-ink">
                    {new Date(subscription.current_period_end).toLocaleDateString('he-IL')}
                  </span>
                </div>
              )}

              {/* Donation target */}
              <div className="pt-4 border-t border-gold/20">
                <p className="font-medium text-ink mb-3">יעד התרומה / Donation Target</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                  {(['yeshiva', 'poor_families', 'split_50_50'] as const).map((target) => (
                    <label
                      key={target}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                        newDonationTarget === target
                          ? 'border-gold bg-gold/10'
                          : 'border-stone/20 hover:border-gold/40'
                      }`}
                    >
                      <input
                        type="radio"
                        name="donation_target"
                        value={target}
                        checked={newDonationTarget === target}
                        onChange={(e) => setNewDonationTarget(e.target.value)}
                        className="accent-gold"
                      />
                      <div>
                        <p className="text-sm font-medium text-ink">{donationTargetLabels[target].he}</p>
                        <p className="text-xs text-stone">{donationTargetLabels[target].en}</p>
                      </div>
                    </label>
                  ))}
                </div>
                {newDonationTarget !== subscription.donation_target && (
                  <button
                    onClick={handleUpdateDonation}
                    disabled={updatingDonation}
                    className="btn-primary text-sm py-2 px-4 disabled:opacity-60"
                  >
                    {updatingDonation ? 'שומר...' : 'עדכן יעד תרומה / Update Donation Target'}
                  </button>
                )}
              </div>

              <button
                onClick={handleManageSubscription}
                disabled={portalLoading}
                className="btn-secondary text-sm py-2 px-4 disabled:opacity-60"
              >
                {portalLoading ? 'טוען...' : 'נהל מנוי / Manage Subscription'}
              </button>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-stone mb-4">אין מנוי פעיל / No active subscription</p>
              <a href="/subscribe" className="btn-primary">
                הצטרף עכשיו / Subscribe Now
              </a>
            </div>
          )}
        </div>

        {/* Donation history */}
        {stats.donationAllocations.length > 0 && (
          <div className="card">
            <h2 className="font-heading text-xl font-bold text-ink mb-4">היסטוריית תרומות / Donation History</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4 text-center">
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-blue-700 font-bold">{CURRENCY_SYMBOLS[subscription?.currency || 'ILS']}{(totalYeshiva / 100).toFixed(2)}</p>
                <p className="text-blue-600 text-xs mt-1">לישיבה / To Yeshiva</p>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <p className="text-green-700 font-bold">{CURRENCY_SYMBOLS[subscription?.currency || 'ILS']}{(totalFamilies / 100).toFixed(2)}</p>
                <p className="text-green-600 text-xs mt-1">למשפחות / To Families</p>
              </div>
              <div className="bg-gold/10 rounded-lg p-3 col-span-2 sm:col-span-1">
                <p className="text-gold-dark font-bold">{CURRENCY_SYMBOLS[subscription?.currency || 'ILS']}{(totalDonated / 100).toFixed(2)}</p>
                <p className="text-stone text-xs mt-1">סה&quot;כ / Total</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gold/20 text-stone text-xs">
                    <th className="text-right py-2">תאריך / Date</th>
                    <th className="text-right py-2">סכום / Amount</th>
                    <th className="text-right py-2">ישיבה / Yeshiva</th>
                    <th className="text-right py-2">משפחות / Families</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.donationAllocations.slice(0, 10).map((a) => (
                    <tr key={a.id} className="border-b border-stone/10 hover:bg-gold/5">
                      <td className="py-2 text-stone text-xs">
                        {new Date(a.payment_date).toLocaleDateString('he-IL')}
                      </td>
                      <td className="py-2 font-medium">
                        {CURRENCY_SYMBOLS[a.currency]}{(a.amount_cents / 100).toFixed(2)}
                      </td>
                      <td className="py-2 text-blue-600">
                        {CURRENCY_SYMBOLS[a.currency]}{(a.yeshiva_cents / 100).toFixed(2)}
                      </td>
                      <td className="py-2 text-green-600">
                        {CURRENCY_SYMBOLS[a.currency]}{(a.poor_families_cents / 100).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
