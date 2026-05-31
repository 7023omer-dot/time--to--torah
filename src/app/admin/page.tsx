import { createClient } from '@/lib/supabase/server'
import { CURRENCY_SYMBOLS } from '@/lib/stripe'

export const dynamic = 'force-dynamic'

async function getAdminStats() {
  const supabase = createClient()

  const [
    { count: totalUsers },
    { count: activeSubscribers },
    { data: subscriptions },
    { data: allocations },
    { data: recentUsers },
    { data: recentSubscriptions },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('subscriptions').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('subscriptions').select('amount_cents, currency, created_at').eq('status', 'active'),
    supabase.from('donation_allocations').select('*'),
    supabase.from('profiles').select('*').order('created_at', { ascending: false }).limit(10),
    supabase.from('subscriptions').select('*, profiles(full_name, email)').order('created_at', { ascending: false }).limit(10),
  ])

  const now = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)

  const totalRevenueILS = (subscriptions || [])
    .filter((s) => s.currency === 'ILS')
    .reduce((sum, s) => sum + s.amount_cents, 0)

  const thisMonthRevenue = (subscriptions || [])
    .filter((s) => s.currency === 'ILS' && new Date(s.created_at) >= monthStart)
    .reduce((sum, s) => sum + s.amount_cents, 0)

  const totalYeshiva = (allocations || []).reduce((sum, a) => sum + a.yeshiva_cents, 0)
  const totalFamilies = (allocations || []).reduce((sum, a) => sum + a.poor_families_cents, 0)
  const totalAllocated = (allocations || []).reduce((sum, a) => sum + a.amount_cents, 0)

  return {
    totalUsers: totalUsers || 0,
    activeSubscribers: activeSubscribers || 0,
    totalRevenueILS,
    thisMonthRevenue,
    totalYeshiva,
    totalFamilies,
    totalAllocated,
    allocations: allocations || [],
    recentUsers: recentUsers || [],
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
    <div className="min-h-screen bg-parchment py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="font-heading text-3xl font-bold text-ink">לוח ניהול / Admin Dashboard</h1>
          <span className="text-stone text-sm">{new Date().toLocaleDateString('he-IL')}</span>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card">
            <p className="text-stone text-sm mb-1">משתמשים / Users</p>
            <p className="font-heading text-3xl font-bold text-ink">{stats.totalUsers}</p>
          </div>
          <div className="card">
            <p className="text-stone text-sm mb-1">מנויים פעילים / Active Subscribers</p>
            <p className="font-heading text-3xl font-bold text-gold">{stats.activeSubscribers}</p>
          </div>
          <div className="card">
            <p className="text-stone text-sm mb-1">הכנסה כוללת (₪) / Total Revenue</p>
            <p className="font-heading text-3xl font-bold text-ink">
              ₪{(stats.totalRevenueILS / 100).toFixed(0)}
            </p>
          </div>
          <div className="card">
            <p className="text-stone text-sm mb-1">החודש (₪) / This Month</p>
            <p className="font-heading text-3xl font-bold text-ink">
              ₪{(stats.thisMonthRevenue / 100).toFixed(0)}
            </p>
          </div>
        </div>

        {/* Donation allocations */}
        <div className="card">
          <h2 className="font-heading text-xl font-bold text-ink mb-4">הקצאות תרומה / Donation Allocations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <p className="text-blue-700 font-heading text-2xl font-bold">₪{(stats.totalYeshiva / 100).toFixed(0)}</p>
              <p className="text-blue-600 text-sm mt-1">לישיבה / To Yeshiva</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <p className="text-green-700 font-heading text-2xl font-bold">₪{(stats.totalFamilies / 100).toFixed(0)}</p>
              <p className="text-green-600 text-sm mt-1">למשפחות / To Families</p>
            </div>
            <div className="bg-gold/10 rounded-xl p-4 text-center">
              <p className="text-gold-dark font-heading text-2xl font-bold">₪{(stats.totalAllocated / 100).toFixed(0)}</p>
              <p className="text-stone text-sm mt-1">סה&quot;כ / Total Allocated</p>
            </div>
          </div>

          {stats.allocations.length > 0 && (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gold/20 text-stone text-xs">
                    <th className="text-right py-2 px-2">תאריך</th>
                    <th className="text-right py-2 px-2">מטבע</th>
                    <th className="text-right py-2 px-2">סכום</th>
                    <th className="text-right py-2 px-2">ישיבה</th>
                    <th className="text-right py-2 px-2">משפחות</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.allocations.slice(0, 10).map((a) => (
                    <tr key={a.id} className="border-b border-stone/10 hover:bg-gold/5">
                      <td className="py-2 px-2 text-stone text-xs">
                        {new Date(a.payment_date).toLocaleDateString('he-IL')}
                      </td>
                      <td className="py-2 px-2">{a.currency}</td>
                      <td className="py-2 px-2 font-medium">
                        {CURRENCY_SYMBOLS[a.currency]}{(a.amount_cents / 100).toFixed(2)}
                      </td>
                      <td className="py-2 px-2 text-blue-600">
                        {CURRENCY_SYMBOLS[a.currency]}{(a.yeshiva_cents / 100).toFixed(2)}
                      </td>
                      <td className="py-2 px-2 text-green-600">
                        {CURRENCY_SYMBOLS[a.currency]}{(a.poor_families_cents / 100).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent users */}
        <div className="card">
          <h2 className="font-heading text-xl font-bold text-ink mb-4">משתמשים אחרונים / Recent Users</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gold/20 text-stone text-xs">
                  <th className="text-right py-2 px-2">שם / Name</th>
                  <th className="text-right py-2 px-2">אימייל / Email</th>
                  <th className="text-right py-2 px-2">שפה / Lang</th>
                  <th className="text-right py-2 px-2">תאריך הצטרפות / Joined</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentUsers.map((user) => (
                  <tr key={user.id} className="border-b border-stone/10 hover:bg-gold/5">
                    <td className="py-2 px-2 font-medium">{user.full_name || '—'}</td>
                    <td className="py-2 px-2 text-stone ltr" dir="ltr">{user.email}</td>
                    <td className="py-2 px-2">{user.preferred_language?.toUpperCase()}</td>
                    <td className="py-2 px-2 text-stone text-xs">
                      {new Date(user.created_at).toLocaleDateString('he-IL')}
                    </td>
                  </tr>
                ))}
                {stats.recentUsers.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-stone">אין משתמשים עדיין</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent subscriptions */}
        <div className="card">
          <h2 className="font-heading text-xl font-bold text-ink mb-4">מנויים אחרונים / Recent Subscriptions</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gold/20 text-stone text-xs">
                  <th className="text-right py-2 px-2">משתמש / User</th>
                  <th className="text-right py-2 px-2">תוכנית / Plan</th>
                  <th className="text-right py-2 px-2">מטבע / Currency</th>
                  <th className="text-right py-2 px-2">סכום / Amount</th>
                  <th className="text-right py-2 px-2">סטטוס / Status</th>
                  <th className="text-right py-2 px-2">תרומה / Donation</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentSubscriptions.map((sub: any) => (
                  <tr key={sub.id} className="border-b border-stone/10 hover:bg-gold/5">
                    <td className="py-2 px-2">
                      <div>
                        <p className="font-medium">{sub.profiles?.full_name || '—'}</p>
                        <p className="text-stone text-xs ltr" dir="ltr">{sub.profiles?.email}</p>
                      </div>
                    </td>
                    <td className="py-2 px-2">{planLabels[sub.plan] || sub.plan}</td>
                    <td className="py-2 px-2">{sub.currency}</td>
                    <td className="py-2 px-2 font-medium">
                      {CURRENCY_SYMBOLS[sub.currency]}{(sub.amount_cents / 100).toFixed(2)}
                    </td>
                    <td className="py-2 px-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[sub.status]}`}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="py-2 px-2 text-xs text-stone">{sub.donation_target}</td>
                  </tr>
                ))}
                {stats.recentSubscriptions.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-4 text-center text-stone">אין מנויים עדיין</td>
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
