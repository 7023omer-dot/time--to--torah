#!/usr/bin/env ts-node
/**
 * Setup Stripe Products and Prices for Time to Torah / עת לתורה
 * Run with: npx ts-node scripts/setup-stripe.ts
 *
 * Requires STRIPE_SECRET_KEY to be set in your environment or .env.local
 */

import * as dotenv from 'dotenv'
import * as path from 'path'
import * as fs from 'fs'

// Load .env.local
const envPath = path.resolve(__dirname, '../.env.local')
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath })
} else {
  dotenv.config()
}

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
})

const PRODUCT_NAME = 'עת לתורה - Time to Torah'
const PRODUCT_DESCRIPTION = 'Daily Torah learning with charitable giving. לימוד תורה יומי עם תרומה לצדקה.'

// Prices in smallest currency unit (agorot/cents)
const PLAN_PRICES: Record<string, Record<string, number>> = {
  monthly: {
    ILS: 1890,  // ₪18.90
    USD: 499,   // $4.99
    EUR: 499,   // €4.99
    GBP: 449,   // £4.49
    CAD: 699,   // CA$6.99
    AUD: 799,   // A$7.99
  },
  biannual: {
    ILS: 8900,  // ₪89
    USD: 2399,  // $23.99
    EUR: 2299,  // €22.99
    GBP: 2199,  // £21.99
    CAD: 3299,  // CA$32.99
    AUD: 3799,  // A$37.99
  },
  annual: {
    ILS: 14800, // ₪148
    USD: 3999,  // $39.99
    EUR: 3799,  // €37.99
    GBP: 3599,  // £35.99
    CAD: 5499,  // CA$54.99
    AUD: 6299,  // A$62.99
  },
}

const PLAN_INTERVALS: Record<string, { interval: 'month' | 'year'; interval_count: number }> = {
  monthly: { interval: 'month', interval_count: 1 },
  biannual: { interval: 'month', interval_count: 6 },
  annual: { interval: 'year', interval_count: 1 },
}

const CURRENCY_TO_ISO: Record<string, string> = {
  ILS: 'ils',
  USD: 'usd',
  EUR: 'eur',
  GBP: 'gbp',
  CAD: 'cad',
  AUD: 'aud',
}

async function main() {
  console.log('🚀 Setting up Stripe products and prices for Time to Torah...\n')

  // Create or find the product
  let product: Stripe.Product

  const existingProducts = await stripe.products.list({ limit: 100 })
  const existingProduct = existingProducts.data.find(
    (p) => p.name === PRODUCT_NAME && p.active
  )

  if (existingProduct) {
    console.log(`✅ Found existing product: ${existingProduct.id}`)
    product = existingProduct
  } else {
    product = await stripe.products.create({
      name: PRODUCT_NAME,
      description: PRODUCT_DESCRIPTION,
      metadata: {
        platform: 'time-to-torah',
      },
    })
    console.log(`✅ Created product: ${product.id} - ${product.name}`)
  }

  console.log('\n📋 Creating prices...\n')

  const priceIds: Record<string, string> = {}

  for (const plan of ['monthly', 'biannual', 'annual']) {
    const { interval, interval_count } = PLAN_INTERVALS[plan]

    for (const currency of ['ILS', 'USD', 'EUR', 'GBP', 'CAD', 'AUD']) {
      const amount = PLAN_PRICES[plan][currency]
      const currencyCode = CURRENCY_TO_ISO[currency]

      // Check if price already exists
      const existingPrices = await stripe.prices.list({
        product: product.id,
        currency: currencyCode,
        active: true,
        limit: 100,
      })

      const existingPrice = existingPrices.data.find(
        (p) =>
          p.unit_amount === amount &&
          p.recurring?.interval === interval &&
          p.recurring?.interval_count === interval_count
      )

      let price: Stripe.Price

      if (existingPrice) {
        console.log(`  ♻️  Reusing ${plan}/${currency}: ${existingPrice.id} (${amount} ${currencyCode})`)
        price = existingPrice
      } else {
        price = await stripe.prices.create({
          product: product.id,
          unit_amount: amount,
          currency: currencyCode,
          recurring: {
            interval,
            interval_count,
          },
          nickname: `${plan} - ${currency}`,
          metadata: {
            plan,
            currency,
          },
        })
        console.log(`  ✅ Created ${plan}/${currency}: ${price.id} (${amount} ${currencyCode})`)
      }

      const envKey = `STRIPE_PRICE_${plan.toUpperCase()}_${currency.toUpperCase()}`
      priceIds[envKey] = price.id
    }
  }

  console.log('\n🎉 Done! Add these to your .env.local:\n')
  console.log('# Stripe Price IDs')
  for (const [key, value] of Object.entries(priceIds)) {
    console.log(`${key}=${value}`)
  }

  console.log('\n📋 Summary:')
  console.log(`Product ID: ${product.id}`)
  console.log(`Total prices created/found: ${Object.keys(priceIds).length}`)
  console.log('\nDon\'t forget to also set:')
  console.log('STRIPE_WEBHOOK_SECRET=<from stripe webhook dashboard>')
}

main().catch((err) => {
  console.error('❌ Error:', err.message)
  process.exit(1)
})
