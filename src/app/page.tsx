import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-ink text-parchment overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)',
            backgroundSize: '20px 20px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
          <h1 className="font-heading text-5xl sm:text-7xl font-bold text-gold mb-4">
            עת לתורה
          </h1>
          <p className="text-xl sm:text-2xl text-parchment/80 font-heading mb-3">
            Time to Torah
          </p>
          <p className="text-lg text-parchment/70 max-w-2xl mx-auto mb-4">
            לימוד תורה יומי עם תרומה ישירה לצדקה.
          </p>
          <p className="text-base text-parchment/50 max-w-xl mx-auto mb-10">
            Daily Torah learning — every subscription goes directly to support yeshivot and families in need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/subscribe" className="btn-primary text-lg px-8 py-4">
              התחל ללמוד
            </Link>
            <Link href="/learn" className="btn-secondary text-lg px-8 py-4 border-parchment/30 text-parchment hover:bg-parchment hover:text-ink">
              שיעור חינמי
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-parchment">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-12">
            למה עת לתורה?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📖</span>
              </div>
              <h3 className="font-heading text-xl font-bold text-ink mb-3">לימוד יומי</h3>
              <h4 className="text-stone text-sm mb-3">Daily Learning</h4>
              <p className="text-stone text-sm">
                שיעורי תורה יומיים בפרשת השבוע, הלכה, מחשבה וגמרא. תוכן איכותי בעברית ובאנגלית.
              </p>
              <p className="text-stone/70 text-xs mt-2">
                Daily lessons in Parasha, Halacha, Machshava, and Gemara in Hebrew and English.
              </p>
            </div>

            <div className="card text-center hover:shadow-md transition-shadow border-gold/40">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="font-heading text-xl font-bold text-ink mb-3">תרומה לצדקה</h3>
              <h4 className="text-stone text-sm mb-3">Charitable Giving</h4>
              <p className="text-stone text-sm">
                100% מהכנסות המנוי מופנות לצדקה. בחר להעביר לישיבה, למשפחות נזקקות, או להחצות שווה.
              </p>
              <p className="text-stone/70 text-xs mt-2">
                100% of subscription revenue goes to charity. Choose to support a yeshiva, poor families, or split evenly.
              </p>
            </div>

            <div className="card text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="font-heading text-xl font-bold text-ink mb-3">מעקב התקדמות</h3>
              <h4 className="text-stone text-sm mb-3">Progress Tracking</h4>
              <p className="text-stone text-sm">
                עקוב אחרי הרצף היומי שלך, סמן שיעורים שסיימת, וראה כמה למדת לאורך הזמן.
              </p>
              <p className="text-stone/70 text-xs mt-2">
                Track your daily streak, mark completed lessons, and see your learning progress over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-ink/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-12">מה אומרים המשתמשים</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-parchment relative">
              <div className="text-gold text-4xl font-heading mb-3">&ldquo;</div>
              <p className="text-ink text-sm leading-relaxed mb-4">
                עת לתורה שינתה את הרגלי הלמידה שלי. כל בוקר אני מתחיל עם שיעור קצר ומרגיש שאני גם תורם לקהילה.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
                  <span className="text-gold font-bold text-sm">י</span>
                </div>
                <div>
                  <p className="font-semibold text-ink text-sm">יוסף כהן</p>
                  <p className="text-stone text-xs">ירושלים</p>
                </div>
              </div>
            </div>

            <div className="card-parchment relative">
              <div className="text-gold text-4xl font-heading mb-3">&ldquo;</div>
              <p className="text-ink text-sm leading-relaxed mb-4">
                הפלטפורמה הטובה ביותר ללימוד תורה מקוון. השילוב של לימוד ותרומה הוא פשוט מושלם. ממליץ בחום!
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
                  <span className="text-gold font-bold text-sm">ר</span>
                </div>
                <div>
                  <p className="font-semibold text-ink text-sm">רחל לוי</p>
                  <p className="text-stone text-xs">תל אביב</p>
                </div>
              </div>
            </div>

            <div className="card-parchment relative">
              <div className="text-gold text-4xl font-heading mb-3">&ldquo;</div>
              <p className="text-ink text-sm leading-relaxed mb-4">
                I love that I can learn Torah in both Hebrew and English. The daily lessons are concise and meaningful, and knowing my subscription helps families in need makes it even better.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
                  <span className="text-gold font-bold text-sm">D</span>
                </div>
                <div>
                  <p className="font-semibold text-ink text-sm">David Goldstein</p>
                  <p className="text-stone text-xs">New York</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA with pricing preview */}
      <section className="py-20 bg-ink text-parchment">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-4xl font-bold text-gold mb-4">
            הצטרף עכשיו
          </h2>
          <p className="text-parchment/70 text-lg mb-8">
            מנוי חודשי מתחיל מ-₪18.90 בלבד. כל הכנסה הולכת לצדקה.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-parchment/5 border border-gold/20 rounded-xl p-5 text-center">
              <p className="text-gold font-heading text-lg font-bold mb-1">חודשי</p>
              <p className="text-parchment text-2xl font-bold mb-1">₪18.90</p>
              <p className="text-parchment/50 text-xs">לחודש / per month</p>
            </div>
            <div className="bg-gold/10 border border-gold rounded-xl p-5 text-center relative">
              <div className="absolute -top-3 right-1/2 translate-x-1/2">
                <span className="badge-savings bg-gold text-ink">חסכון 21%</span>
              </div>
              <p className="text-gold font-heading text-lg font-bold mb-1">חצי שנתי</p>
              <p className="text-parchment text-2xl font-bold mb-1">₪89</p>
              <p className="text-parchment/50 text-xs">ל-6 חודשים / 6 months</p>
            </div>
            <div className="bg-parchment/5 border border-gold/20 rounded-xl p-5 text-center relative">
              <div className="absolute -top-3 right-1/2 translate-x-1/2">
                <span className="badge-savings">חסכון 35%</span>
              </div>
              <p className="text-gold font-heading text-lg font-bold mb-1">שנתי</p>
              <p className="text-parchment text-2xl font-bold mb-1">₪148</p>
              <p className="text-parchment/50 text-xs">לשנה / per year</p>
            </div>
          </div>

          <Link href="/subscribe" className="btn-primary text-lg px-10 py-4">
            בחר תוכנית מנוי
          </Link>
        </div>
      </section>
    </div>
  )
}
