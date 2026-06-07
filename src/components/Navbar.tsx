'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useUserStore } from '@/store/useUserStore'
import CurrencySwitcher from './CurrencySwitcher'

export default function Navbar() {
  const router = useRouter()
  const { language, setLanguage, setProfile, setSubscription } = useUserStore()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setIsLoggedIn(!!user)

      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (profile) {
          setProfile(profile)
        }

        const { data: subscription } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'active')
          .single()

        if (subscription) {
          setSubscription(subscription)
        }
      }
    }

    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session?.user)
      if (!session) {
        setProfile(null)
        setSubscription(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setIsLoggedIn(false)
    router.push('/')
    router.refresh()
  }

  const toggleLanguage = () => {
    setLanguage(language === 'he' ? 'en' : 'he')
  }

  const t = {
    he: {
      learn: 'לימוד',
      profile: 'פרופיל',
      subscribe: 'הרשמה',
      login: 'כניסה',
      logout: 'יציאה',
    },
    en: {
      learn: 'Learn',
      profile: 'Profile',
      subscribe: 'Subscribe',
      login: 'Login',
      logout: 'Logout',
    },
  }[language]

  return (
    <nav className="bg-ink text-parchment shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="text-gold font-heading text-2xl font-bold">עת לתורה</span>
            {language === 'en' && (
              <span className="text-stone text-sm hidden sm:block">Time to Torah</span>
            )}
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/learn" className="text-parchment/80 hover:text-gold transition-colors text-sm font-medium">
              {t.learn}
            </Link>
            <Link href="/subscribe" className="text-parchment/80 hover:text-gold transition-colors text-sm font-medium">
              {t.subscribe}
            </Link>
            {isLoggedIn && (
              <Link href="/profile" className="text-parchment/80 hover:text-gold transition-colors text-sm font-medium">
                {t.profile}
              </Link>
            )}
          </div>

          {/* Right side controls */}
          <div className="hidden md:flex items-center gap-3">
            <CurrencySwitcher />

            <button
              onClick={toggleLanguage}
              className="text-parchment/80 hover:text-gold border border-parchment/20 hover:border-gold rounded-md px-2.5 py-1 text-sm transition-colors"
            >
              {language === 'he' ? 'EN' : 'עב'}
            </button>

            {isLoggedIn ? (
              <>
                <Link
                  href="/profile"
                  className="md:hidden text-parchment/80 hover:text-gold transition-colors text-sm"
                >
                  {t.profile}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm text-parchment/80 hover:text-red-400 transition-colors"
                >
                  {t.logout}
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="btn-primary text-sm py-2 px-4"
              >
                {t.login}
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-parchment p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-parchment/10 flex flex-col gap-4">
            <Link href="/learn" className="text-parchment/80 hover:text-gold text-sm" onClick={() => setMenuOpen(false)}>
              {t.learn}
            </Link>
            <Link href="/subscribe" className="text-parchment/80 hover:text-gold text-sm" onClick={() => setMenuOpen(false)}>
              {t.subscribe}
            </Link>
            {isLoggedIn && (
              <Link href="/profile" className="text-parchment/80 hover:text-gold text-sm" onClick={() => setMenuOpen(false)}>
                {t.profile}
              </Link>
            )}
            <div className="flex items-center gap-3 pt-2">
              <CurrencySwitcher />
              <button onClick={toggleLanguage} className="text-parchment/80 border border-parchment/20 rounded-md px-2.5 py-1 text-sm">
                {language === 'he' ? 'EN' : 'עב'}
              </button>
            </div>
            {isLoggedIn ? (
              <button onClick={handleLogout} className="text-sm text-red-400 text-right">
                {t.logout}
              </button>
            ) : (
              <Link href="/login" className="btn-primary text-sm py-2 px-4 w-fit" onClick={() => setMenuOpen(false)}>
                {t.login}
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
