import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-ink text-parchment/80 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-gold font-heading text-2xl font-bold mb-2">עת לתורה</h3>
            <p className="text-sm text-parchment/60 mb-3">Time to Torah</p>
            <p className="text-sm text-parchment/70">
              כל הכנסות מופנות לצדקה
            </p>
            <p className="text-xs text-parchment/50 mt-1">
              All proceeds go to charity
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-gold font-semibold mb-4">קישורים / Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/learn" className="hover:text-gold transition-colors">
                  לימוד יומי / Daily Learning
                </Link>
              </li>
              <li>
                <Link href="/subscribe" className="hover:text-gold transition-colors">
                  תוכניות מנוי / Subscription Plans
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-gold transition-colors">
                  כניסה / Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-gold transition-colors">
                  הרשמה / Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Charity info */}
          <div>
            <h4 className="text-gold font-semibold mb-4">צדקה / Charity</h4>
            <p className="text-sm text-parchment/70 mb-3">
              כל מנוי תורם ישירות לישיבות ולמשפחות נזקקות. אנו מאמינים שלימוד תורה וצדקה הולכים יד ביד.
            </p>
            <p className="text-xs text-parchment/50">
              Every subscription directly supports yeshivot and families in need. We believe Torah study and charity go hand in hand.
            </p>
          </div>
        </div>

        <div className="border-t border-parchment/10 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-parchment/40">
            © {new Date().getFullYear()} עת לתורה - Time to Torah. כל הזכויות שמורות.
          </p>
          <div className="flex gap-4 text-xs text-parchment/40">
            <Link href="/privacy" className="hover:text-gold transition-colors">
              פרטיות / Privacy
            </Link>
            <Link href="/terms" className="hover:text-gold transition-colors">
              תנאי שימוש / Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
