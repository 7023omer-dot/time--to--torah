import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
  typescript: true,
})

export const PLANS = {
  monthly: {
    label_he: 'חודשי',
    label_en: 'Monthly',
    interval: 'month' as const,
    interval_count: 1,
  },
  biannual: {
    label_he: 'חצי שנתי',
    label_en: 'Biannual',
    interval: 'month' as const,
    interval_count: 6,
  },
  annual: {
    label_he: 'שנתי',
    label_en: 'Annual',
    interval: 'year' as const,
    interval_count: 1,
  },
} as const

export const CURRENCIES = ['ILS', 'USD', 'EUR', 'GBP', 'CAD', 'AUD'] as const

export const CURRENCY_SYMBOLS: Record<string, string> = {
  ILS: '₪',
  USD: '$',
  EUR: '€',
  GBP: '£',
  CAD: 'CA$',
  AUD: 'A$',
}

export const PLAN_PRICES: Record<string, Record<string, number>> = {
  monthly: {
    ILS: 1890,
    USD: 499,
    EUR: 499,
    GBP: 449,
    CAD: 699,
    AUD: 799,
  },
  biannual: {
    ILS: 8900,
    USD: 2399,
    EUR: 2299,
    GBP: 2199,
    CAD: 3299,
    AUD: 3799,
  },
  annual: {
    ILS: 14800,
    USD: 3999,
    EUR: 3799,
    GBP: 3599,
    CAD: 5499,
    AUD: 6299,
  },
}

export const PLAN_PRICES_DISPLAY: Record<string, Record<string, string>> = {
  monthly: {
    ILS: '₪18.90',
    USD: '$4.99',
    EUR: '€4.99',
    GBP: '£4.49',
    CAD: 'CA$6.99',
    AUD: 'A$7.99',
  },
  biannual: {
    ILS: '₪89',
    USD: '$23.99',
    EUR: '€22.99',
    GBP: '£21.99',
    CAD: 'CA$32.99',
    AUD: 'A$37.99',
  },
  annual: {
    ILS: '₪148',
    USD: '$39.99',
    EUR: '€37.99',
    GBP: '£35.99',
    CAD: 'CA$54.99',
    AUD: 'A$62.99',
  },
}

export function getPriceId(plan: string, currency: string): string {
  const key = `STRIPE_PRICE_${plan.toUpperCase()}_${currency.toUpperCase()}`
  const priceId = process.env[key]
  if (!priceId) {
    throw new Error(`Missing env var: ${key}`)
  }
  return priceId
}

export type PlanKey = keyof typeof PLANS
export type CurrencyCode = (typeof CURRENCIES)[number]
