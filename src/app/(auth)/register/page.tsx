'use client'


import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { registerSchema } from '@/lib/validations'

export const dynamic = 'force-dynamic'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    password: '',
    confirm_password: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [globalError, setGlobalError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setGlobalError('')

    const result = registerSchema.safeParse(form)
    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message
      })
      setErrors(fieldErrors)
      return
    }

    setLoading(true)
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result.data),
    })

    const data = await response.json()

    if (!response.ok) {
      setGlobalError(data.error || 'שגיאה בהרשמה. נסה שוב. / Registration failed. Please try again.')
      setLoading(false)
      return
    }

    router.push('/learn')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-parchment px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="font-heading text-4xl font-bold text-gold">עת לתורה</h1>
          </Link>
          <p className="text-stone mt-2">הרשמה / Create account</p>
        </div>

        <div className="card">
          {globalError && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 mb-4 text-sm">
              {globalError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="full_name" className="label">
                שם מלא / Full Name
              </label>
              <input
                id="full_name"
                name="full_name"
                type="text"
                autoComplete="name"
                value={form.full_name}
                onChange={handleChange}
                className="input-field"
                placeholder="ישראל ישראלי"
              />
              {errors.full_name && (
                <p className="text-red-500 text-xs mt-1">{errors.full_name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="label">
                אימייל / Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                className="input-field ltr"
                placeholder="you@example.com"
                dir="ltr"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="label">
                סיסמה / Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={form.password}
                onChange={handleChange}
                className="input-field ltr"
                placeholder="לפחות 8 תווים / at least 8 characters"
                dir="ltr"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirm_password" className="label">
                אימות סיסמה / Confirm Password
              </label>
              <input
                id="confirm_password"
                name="confirm_password"
                type="password"
                autoComplete="new-password"
                value={form.confirm_password}
                onChange={handleChange}
                className="input-field ltr"
                placeholder="••••••••"
                dir="ltr"
              />
              {errors.confirm_password && (
                <p className="text-red-500 text-xs mt-1">{errors.confirm_password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full mt-2 disabled:opacity-60"
            >
              {loading ? 'נרשם...' : 'הירשם / Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-stone mt-5">
            כבר יש לך חשבון?{' '}
            <Link href="/login" className="text-gold hover:text-gold-dark font-medium">
              כניסה / Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
