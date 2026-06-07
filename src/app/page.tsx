import Link from 'next/link'

export const dynamic = 'force-dynamic'

async function getCommunityStats() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/community/stats`, { next: { revalidate: 60 } })
    if (res.ok) return res.json()
  } catch {}
  return {
    total_minutes_learned: 12450,
    total_lessons_completed: 24900,
    active_learners_today: 847,
  }
}

const CATEGORIES = [
  { slug: 'emunah',      name_he: 'אמונה',         icon: '✨' },
  { slug: 'parasha',     name_he: 'פרשת השבוע',    icon: '📜' },
  { slug: 'mussar',      name_he: 'מוסר',           icon: '💎' },
  { slug: 'mishna',      name_he: 'משנה',           icon: '📚' },
  { slug: 'gemara',      name_he: 'גמרא',           icon: '🕯️' },
  { slug: 'tehillim',    name_he: 'תהילים',         icon: '🌟' },
  { slug: 'halacha',     name_he: 'הלכה',           icon: '⚖️' },
  { slug: 'tzadikim',    name_he: 'סיפורי צדיקים', icon: '🌸' },
  { slug: 'shalom_bayit',name_he: 'שלום בית',       icon: '🏠' },
  { slug: 'parnasa',     name_he: 'פרנסה',          icon: '💰' },
]

export default async function HomePage() {
  const stats = await getCommunityStats()

  return (
    <div className="flex flex-col" dir="rtl">
      {/* Hero */}
      <section className="relative bg-ink text-parchment overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)',
            backgroundSize: '20px 20px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
          <h1 className="font-heading text-5xl sm:text-7xl font-bold text-gold mb-4">עת לתורה</h1>
          <p className="text-xl sm:text-2xl text-parchment/80 font-heading mb-3">Time to Torah</p>
          <p className="text-lg text-parchment/70 max-w-2xl mx-auto mb-2">
            לימוד תורה יומי של 5 דקות עם תרומה ישירה לצדקה.
          </p>
          <p className="text-base text-parchment/50 max-w-xl mx-auto mb-8">
            The Netflix of 5-minute Torah — for every Jew worldwide.
          </p>

          {/* Live community stats */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
            <div className="bg-parchment/10 border border-parchment/20 rounded-xl px-6 py-3 text-center">
              <div className="text-gold font-heading text-2xl font-bold">{stats.total_minutes_learned.toLocaleString()}</div>
              <div className="text-parchment/60 text-xs mt-0.5">דקות תורה נלמדו ביחד</div>
            </div>
            <div className="bg-parchment/10 border border-parchment/20 rounded-xl px-6 py-3 text-center">
              <div className="text-gold font-heading text-2xl font-bold">{stats.active_learners_today.toLocaleString()}</div>
              <div className="text-parchment/60 text-xs mt-0.5">לומדים היום</div>
            </div>
            <div className="bg-parchment/10 border border-parchment/20 rounded-xl px-6 py-3 text-center">
              <div className="text-gold font-heading text-2xl font-bold">{stats.total_lessons_completed.toLocaleString()}</div>
              <div className="text-parchment/60 text-xs mt-0.5">שיעורים הושלמו</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/subscribe" className="btn-primary text-lg px-8 py-4">
              התחל ללמוד עכשיו
            </Link>
            <Link href="/learn" className="btn-secondary text-lg px-8 py-4 border-parchment/30 text-parchment hover:bg-parchment hover:text-ink">
              שיעור חינמי
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-12">איך זה עובד?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', icon: '✍️', he: 'הירשם', desc: 'צור חשבון חינמי תוך שניות' },
              { step: '2', icon: '🎯', he: 'בחר נושא', desc: 'מ-10 קטגוריות — אמונה, פרשה, הלכה ועוד' },
              { step: '3', icon: '⚡', he: 'למד 5 דקות', desc: 'שיעור יומי קצר עם עומק אמיתי' },
            ].map(({ step, icon, he, desc }) => (
              <div key={step} className="text-center">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                  <span className="text-3xl">{icon}</span>
                  <div className="absolute -top-2 -right-2 w-7 h-7 bg-gold text-white rounded-full text-xs font-bold flex items-center justify-center">
                    {step}
                  </div>
                </div>
                <h3 className="font-heading text-xl font-bold text-ink mb-2">{he}</h3>
                <p className="text-stone text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category preview */}
      <section className="py-16 bg-parchment">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-4">10 נושאים לבחור מהם</h2>
          <p className="text-stone text-center text-sm mb-10">בכל נושא — שיעורים קצרים ואיכותיים מרבנים מובילים</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {CATEGORIES.map((cat) => (
              <div key={cat.slug} className="card text-center hover:shadow-md hover:border-gold/50 transition-all py-4 cursor-default">
                <div className="text-3xl mb-2">{cat.icon}</div>
                <p className="font-medium text-ink text-sm">{cat.name_he}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-12">למה עת לתורה?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="font-heading text-xl font-bold text-ink mb-3">5 דקות ביום</h3>
              <p className="text-stone text-sm">שיעורים קצרים ועמוקים שמתאימים לכל לוח זמנים — בבוקר, בצהריים, בלילה.</p>
            </div>
            <div className="card text-center hover:shadow-md transition-shadow border-gold/40">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="font-heading text-xl font-bold text-ink mb-3">תרומה לצדקה</h3>
              <p className="text-stone text-sm">100% מהכנסות המנוי מופנות לצדקה. לימוד תורה שגם מיטיב לאחרים.</p>
            </div>
            <div className="card text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏆</span>
              </div>
              <h3 className="font-heading text-xl font-bold text-ink mb-3">מערכת הישגים</h3>
              <p className="text-stone text-sm">צבור ניקוד, שמור על רצף יומי, ותן לעצמך פרסים על ההתמדה.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-parchment">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-12">מה אומרים המשתמשים</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: 'עת לתורה שינתה את הרגלי הלמידה שלי. כל בוקר אני מתחיל עם שיעור קצר ומרגיש שאני גם תורם לקהילה.',
                name: 'יוסף כהן', location: 'ירושלים', initial: 'י',
              },
              {
                text: 'הפלטפורמה הטובה ביותר ללימוד תורה מקוון. השילוב של לימוד ותרומה הוא פשוט מושלם. ממליץ בחום!',
                name: 'רחל לוי', location: 'תל אביב', initial: 'ר',
              },
              {
                text: 'I love that I can learn Torah in both Hebrew and English. The daily lessons are concise and meaningful.',
                name: 'David Goldstein', location: 'New York', initial: 'D',
              },
            ].map(({ text, name, location, initial }) => (
              <div key={name} className="card-parchment relative">
                <div className="text-gold text-4xl font-heading mb-3">&ldquo;</div>
                <p className="text-ink text-sm leading-relaxed mb-4">{text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
                    <span className="text-gold font-bold text-sm">{initial}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-ink text-sm">{name}</p>
                    <p className="text-stone text-xs">{location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-ink text-parchment">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-4xl font-bold text-gold mb-4">הצטרף עכשיו</h2>
          <p className="text-parchment/70 text-lg mb-8">מנוי חודשי מתחיל מ-₪18.90 בלבד. כל הכנסה הולכת לצדקה.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { label: 'חודשי', price: '₪18.90', sub: 'לחודש' },
              { label: 'חצי שנתי', price: '₪89', sub: 'ל-6 חודשים', highlight: true, badge: 'חסכון 21%' },
              { label: 'שנתי', price: '₪148', sub: 'לשנה', badge: 'חסכון 35%' },
            ].map(({ label, price, sub, highlight, badge }) => (
              <div key={label} className={`${highlight ? 'bg-gold/10 border-gold' : 'bg-parchment/5 border-gold/20'} border rounded-xl p-5 text-center relative`}>
                {badge && (
                  <div className="absolute -top-3 right-1/2 translate-x-1/2">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${highlight ? 'bg-gold text-white' : 'badge-savings'}`}>{badge}</span>
                  </div>
                )}
                <p className="text-gold font-heading text-lg font-bold mb-1">{label}</p>
                <p className="text-parchment text-2xl font-bold mb-1">{price}</p>
                <p className="text-parchment/50 text-xs">{sub}</p>
              </div>
            ))}
          </div>
          <Link href="/subscribe" className="btn-primary text-lg px-10 py-4">
            בחר תוכנית מנוי
          </Link>
        </div>
      </section>
    </div>
  )
}
