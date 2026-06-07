import { createClient } from '@/lib/supabase/server'
import { CURRENCY_SYMBOLS } from '@/lib/stripe'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

async function getAdminStats() {
  const supabase = createClient()

  const [
    { count: totalUsers },
    { count: activeSubscribers },
    { count: totalLessonsCompleted },
    { data: subscriptions },
    { data: allocations },
    { data: recentSubscriptions },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('subscriptions').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('lesson_completions').select('*', { count: 'exact', head: true }),
    supabase.from('subscriptions').select('amount_cents, currency, created_at').eq('status', 'active'),
    supabase.from('donation_allocations').select('*'),
    supabase.from('subscriptions').select('*, profiles(full_name, email)').order('created_at', { ascending: false }).limit(10),
  ])

  const totalYeshiva = (allocations || []).reduce((s, a) => s + a.yeshiva_cents, 0)
  const totalFamilies = (allocations || []).reduce((s, a) => s + a.poor_families_cents, 0)
  const totalAllocated = totalYeshiva + totalFamilies
  const totalMinutesLearned = (totalLessonsCompleted || 0) * 5

  return {
    totalUsers: totalUsers || 0,
    activeSubscribers: activeSubscribers || 0,
    totalLessonsCompleted: totalLessonsCompleted || 0,
    totalMinutesLearned,
    totalYeshiva,
    totalFamilies,
    totalAllocated,
    recentSubscriptions: recentSubscriptions || [],
  }
}

export default async function AdminPage() {
  const stats = await getAdminStats()

  const planLabels: Record<string, string> = {
    monthly: 'חודשי',
    biannual: 'חצי שנתי',
    annual: 'שנתי',
  }
  const statusColors: Record<string, string> = {
    active: 'text-green-600 bg-green-50',
    canceled: 'text-red-600 bg-red-50',
    past_due: 'text-yellow-600 bg-yellow-50',
    trialing: 'text-blue-600 bg-blue-50',
    incomplete: 'text-gray-600 bg-gray-50',
  }

  return (
    <div className="min-h-screen bg-parchment py-10" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="font-heading text-3xl font-bold text-ink">לוח ניהול</h1>
          <div className="flex gap-3">
            <Link href="/admin/cms" className="btn-secondary text-sm py-2 px-4">
              ניהול תוכן (CMS)
            </Link>
            <span className="text-stone text-sm self-center">{new Date().toLocaleDateString('he-IL')}</span>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card">
            <p className="text-stone text-sm mb-1">משתמשים</p>
            <p className="font-heading text-3xl font-bold text-ink">{stats.totalUsers}</p>
          </div>
          <div className="card">
            <p className="text-stone text-sm mb-1">מנויים פעילים</p>
            <p className="font-heading text-3xl font-bold text-gold">{stats.activeSubscribers}</p>
          </div>
          <div className="card">
            <p className="text-stone text-sm mb-1">שיעורים הושלמו</p>
            <p className="font-heading text-3xl font-bold text-ink">{stats.totalLessonsCompleted.toLocaleString()}</p>
          </div>
          <div className="card">
            <p className="text-stone text-sm mb-1">דקות תורה נלמדו</p>
            <p className="font-heading text-3xl font-bold text-ink">{stats.totalMinutesLearned.toLocaleString()}</p>
          </div>
        </div>

        {/* Donation cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-xl p-5 text-center border border-blue-100">
            <p className="text-blue-700 font-heading text-2xl font-bold">₪{(stats.totalYeshiva / 100).toFixed(0)}</p>
            <p className="text-blue-600 text-sm mt-1">לישיבה</p>
          </div>
          <div className="bg-green-50 rounded-xl p-5 text-center border border-green-100">
            <p className="text-green-700 font-heading text-2xl font-bold">₪{(stats.totalFamilies / 100).toFixed(0)}</p>
            <p className="text-green-600 text-sm mt-1">למשפחות נזקקות</p>
          </div>
          <div className="bg-gold/10 rounded-xl p-5 text-center border border-gold/30">
            <p className="text-gold font-heading text-2xl font-bold">₪{(stats.totalAllocated / 100).toFixed(0)}</p>
            <p className="text-stone text-sm mt-1">סה&quot;כ תרומות</p>
          </div>
        </div>

        {/* Recent subscriptions */}
        <div className="card">
          <h2 className="font-heading text-xl font-bold text-ink mb-4">מנויים אחרונים</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gold/20 text-stone text-xs">
                  <th className="text-right py-2 px-2">משתמש</th>
                  <th className="text-right py-2 px-2">תוכנית</th>
                  <th className="text-right py-2 px-2">מטבע</th>
                  <th className="text-right py-2 px-2">סכום</th>
                  <th className="text-right py-2 px-2">סטטוס</th>
                  <th className="text-right py-2 px-2">תרומה</th>
                  <th className="text-right py-2 px-2">תאריך</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentSubscriptions.map((sub: any) => (
                  <tr key={sub.id} className="border-b border-stone/10 hover:bg-gold/5">
                    <td className="py-2 px-2">
                      <p className="font-medium">{sub.profiles?.full_name || '—'}</p>
                      <p className="text-stone text-xs" dir="ltr">{sub.profiles?.email}</p>
                    </td>
                    <td className="py-2 px-2">{planLabels[sub.plan] || sub.plan}</td>
                    <td className="py-2 px-2">{sub.currency}</td>
                    <td className="py-2 px-2 font-medium">
                      {CURRENCY_SYMBOLS[sub.currency] || sub.currency}{(sub.amount_cents / 100).toFixed(2)}
                    </td>
                    <td className="py-2 px-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[sub.status]}`}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="py-2 px-2 text-xs text-stone">{sub.donation_target}</td>
                    <td className="py-2 px-2 text-xs text-stone">
                      {new Date(sub.created_at).toLocaleDateString('he-IL')}
                    </td>
                  </tr>
                ))}
                {stats.recentSubscriptions.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-4 text-center text-stone">אין מנויים עדיין</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
