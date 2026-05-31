'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useUserStore } from '@/store/useUserStore'
import type { Profile, Subscription, DonationAllocation, Achievement, UserAchievementWithDetails } from '@/lib/supabase/types'
import { CURRENCY_SYMBOLS } from '@/lib/stripe'
import Link from 'next/link'

const donationTargetLabels: Record<string, { he: string; en: string }> = {
  yeshiva: { he: 'ישיבה', en: 'Yeshiva' },
  poor_families: { he: 'משפחות נזקקות', en: 'Poor Families' },
  split_50_50: { he: 'חלוקה שווה', en: 'Split 50/50' },
}

interface UserStats {
  streak: number
  totalCompleted: number
  donationAllocations: DonationAllocation[]
  totalMinutes: number
  favCategories: { name_he: string; count: number }[]
}

export default function ProfilePage() {
  const supabase = createClient()
  const { setProfile, setSubscription } = useUserStore()
  const [profile, setLocalProfile] = useState<Profile | null>(null)
  const [subscription, setLocalSubscription] = useState<Subscription | null>(null)
  const [stats, setStats] = useState<UserStats>({
    streak: 0, totalCompleted: 0, donationAllocations: [], totalMinutes: 0, favCategories: []
  })
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [earnedIds, setEarnedIds] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [updatingDonation, setUpdatingDonation] = useState(false)
  const [newDonationTarget, setNewDonationTarget] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setLoading(false); return }

      const [
        { data: profileData },
        { data: subData },
        statsRes,
        { data: allAchievements },
        { data: userAchievements },
      ] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('subscriptions').select('*').eq('user_id', user.id).eq('status', 'active').single(),
        fetch('/api/user/stats'),
        supabase.from('achievements').select('*'),
        supabase.from('user_achievements').select('achievement_id').eq('user_id', user.id),
      ])

      if (profileData) { setLocalProfile(profileData); setProfile(profileData) }
      if (subData) {
        setLocalSubscription(subData)
        setSubscription(subData)
        setNewDonationTarget(subData.donation_target)
      }
      if (statsRes.ok) {
        const statsData = await statsRes.json()
        setStats({
          streak: statsData.streak || 0,
          totalCompleted: statsData.totalCompleted || 0,
          donationAllocations: statsData.donationAllocations || [],
          totalMinutes: (statsData.totalCompleted || 0) * 5,
          favCategories: statsData.favCategories || [],
        })
      }
      if (allAchievements) setAchievements(allAchievements)
      if (userAchievements) setEarnedIds(new Set(userAchievements.map(a => a.achievement_id)))

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
      body: JSON.stringify({ subscription_id: subscription.id, donation_target: newDonationTarget }),
    })
    if (response.ok) {
      const updated = await response.json()
      setLocalSubscription(updated.subscription)
      setSubscription(updated.subscription)
    }
    setUpdatingDonation(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-parchment">
        <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const planLabels: Record<string, string> = {
    monthly: 'חודשי', biannual: 'חצי שנתי', annual: 'שנתי',
  }
  const statusLabels: Record<string, { label: string; color: string }> = {
    active: { label: 'פעיל', color: 'text-green-600 bg-green-50' },
    canceled: { label: 'מבוטל', color: 'text-red-600 bg-red-50' },
    past_due: { label: 'באיחור', color: 'text-yellow-600 bg-yellow-50' },
    trialing: { label: 'ניסיון', color: 'text-blue-600 bg-blue-50' },
    incomplete: { label: 'לא שלם', color: 'text-gray-600 bg-gray-50' },
  }

  const totalDonated = stats.donationAllocations.reduce((s, a) => s + a.amount_cents, 0)
  const totalYeshiva = stats.donationAllocations.reduce((s, a) => s + a.yeshiva_cents, 0)
  const totalFamilies = stats.donationAllocations.reduce((s, a) => s + a.poor_families_cents, 0)
  const currSymbol = CURRENCY_SYMBOLS[subscription?.currency || 'ILS']

  return (
    <div className="min-h-screen bg-parchment py-10" dir="rtl">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="font-heading text-3xl font-bold text-ink">הפרופיל שלי</h1>

        {/* User info */}
        <div className="card">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center shrink-0">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="avatar" className="w-full h-full rounded-full object-cover" />
              ) : (
                <span className="text-gold font-heading text-2xl font-bold">
                  {profile?.full_name?.[0] || profile?.email?.[0]?.toUpperCase() || '?'}
                </span>
              )}
            </div>
            <div>
              <p className="font-semibold text-ink text-lg">{profile?.full_name || 'משתמש'}</p>
              <p className="text-stone text-sm" dir="ltr">{profile?.email}</p>
              {profile?.created_at && (
                <p className="text-stone text-xs mt-1">
                  חבר מאז {new Date(profile.created_at).toLocaleDateString('he-IL')}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="card text-center">
            <div className="text-3xl mb-1">🔥</div>
            <div className="text-gold font-heading text-3xl font-bold">{stats.streak}</div>
            <div className="text-stone text-xs mt-1">ימים רצופים</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl mb-1">📖</div>
            <div className="text-gold font-heading text-3xl font-bold">{stats.totalCompleted}</div>
            <div className="text-stone text-xs mt-1">שיעורים</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl mb-1">⏱</div>
            <div className="text-gold font-heading text-3xl font-bold">{stats.totalMinutes}</div>
            <div className="text-stone text-xs mt-1">דקות למידה</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl mb-1">💝</div>
            <div className="text-gold font-heading text-2xl font-bold">
              {currSymbol}{(totalDonated / 100).toFixed(0)}
            </div>
            <div className="text-stone text-xs mt-1">תרמת סה&quot;כ</div>
          </div>
        </div>

        {/* Achievements */}
        <div className="card">
          <h2 className="font-heading text-xl font-bold text-ink mb-4">הישגים</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {achievements.map((a) => {
              const earned = earnedIds.has(a.id)
              return (
                <div
                  key={a.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                    earned
                      ? 'border-gold bg-gold/10'
                      : 'border-stone/20 bg-stone/5 opacity-50'
                  }`}
                >
                  <div className={`text-2xl ${!earned ? 'grayscale' : ''}`}>{a.icon}</div>
                  <div>
                    <p className={`text-sm font-semibold ${earned ? 'text-ink' : 'text-stone'}`}>
                      {a.name_he}
                    </p>
                    <p className="text-xs text-stone line-clamp-2">{a.description_he}</p>
                  </div>
                </div>
              )
            })}
            {achievements.length === 0 && (
              <p className="text-stone text-sm col-span-3">אין הישגים עדיין — התחל ללמוד!</p>
            )}
          </div>
        </div>

        {/* Favorite categories */}
        {stats.favCategories.length > 0 && (
          <div className="card">
            <h2 className="font-heading text-xl font-bold text-ink mb-4">הנושאים האהובים עליך</h2>
            <div className="flex gap-3 flex-wrap">
              {stats.favCategories.map((cat) => (
                <div key={cat.name_he} className="bg-gold/10 text-gold px-4 py-2 rounded-full text-sm font-medium">
                  {cat.name_he} ({cat.count})
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Subscription */}
        <div className="card">
          <h2 className="font-heading text-xl font-bold text-ink mb-4">מנוי</h2>
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
                <p className="text-sm text-stone">
                  חידוש הבא:{' '}
                  <span className="font-medium text-ink">
                    {new Date(subscription.current_period_end).toLocaleDateString('he-IL')}
                  </span>
                </p>
              )}

              {/* Donation target */}
              <div className="pt-4 border-t border-gold/20">
                <p className="font-medium text-ink mb-3">יעד התרומה</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                  {(['yeshiva', 'poor_families', 'split_50_50'] as const).map((target) => (
                    <label
                      key={target}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                        newDonationTarget === target ? 'border-gold bg-gold/10' : 'border-stone/20 hover:border-gold/40'
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
                    {updatingDonation ? 'שומר...' : 'עדכן יעד תרומה'}
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-stone mb-4">אין מנוי פעיל</p>
              <Link href="/subscribe" className="btn-primary">הצטרף עכשיו</Link>
            </div>
          )}
        </div>

        {/* Donation history */}
        {stats.donationAllocations.length > 0 && (
          <div className="card">
            <h2 className="font-heading text-xl font-bold text-ink mb-4">היסטוריית תרומות</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4 text-center">
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-blue-700 font-bold">{currSymbol}{(totalYeshiva / 100).toFixed(2)}</p>
                <p className="text-blue-600 text-xs mt-1">לישיבה</p>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <p className="text-green-700 font-bold">{currSymbol}{(totalFamilies / 100).toFixed(2)}</p>
                <p className="text-green-600 text-xs mt-1">למשפחות</p>
              </div>
              <div className="bg-gold/10 rounded-lg p-3 col-span-2 sm:col-span-1">
                <p className="text-gold-dark font-bold">{currSymbol}{(totalDonated / 100).toFixed(2)}</p>
                <p className="text-stone text-xs mt-1">סה&quot;כ</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
