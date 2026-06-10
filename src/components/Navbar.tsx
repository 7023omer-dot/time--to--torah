'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Pixel-for-pixel port of the live-site navbar (burgundy/gold theme).
// Phase 1: navigation uses real Next.js routing; currency selector is static.
export default function Navbar() {
  const pathname = usePathname()
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <nav className="navbar">
      <Link className="navbar-logo" href="/">
        <span className="menorah">🕎</span>
        <span className="brand">Time to Torah</span>
      </Link>
      <ul className="navbar-links">
        <li><Link href="/" id="nav-home" className={isActive('/') ? 'active' : ''}>בית</Link></li>
        <li><Link href="/learn" id="nav-learn" className={isActive('/learn') ? 'active' : ''}>לימוד</Link></li>
        <li><Link href="/ask" id="nav-ask" className={isActive('/ask') ? 'active' : ''}>🤖 שאל</Link></li>
        <li><Link href="/subscribe" id="nav-subscribe" className={isActive('/subscribe') ? 'active' : ''}>מנוי</Link></li>
        <li><Link href="/profile" id="nav-profile" className={isActive('/profile') ? 'active' : ''}>פרופיל</Link></li>
      </ul>
      <div className="navbar-actions">
        <select className="currency-select" id="globalCurrency" defaultValue="ILS">
          <option value="ILS">₪ ILS</option>
          <option value="USD">$ USD</option>
          <option value="EUR">€ EUR</option>
          <option value="GBP">£ GBP</option>
        </select>
        <Link className="btn-login" href="/subscribe">כניסה</Link>
      </div>
    </nav>
  )
}
