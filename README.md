# עת לתורה - Time to Torah

Daily Torah learning platform with charitable giving. Every subscription goes directly to support yeshivot and families in need.

## Tech Stack

- **Next.js 14** App Router + TypeScript
- **Supabase** (PostgreSQL + Auth + RLS)
- **Stripe** (subscriptions, multi-currency)
- **Resend** (transactional email)
- **Tailwind CSS** with custom design tokens
- **Zustand** (client state)
- **Zod** (validation)
- Hebrew-first RTL, also English

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <repo-url>
cd time--to--torah
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the migrations in order:
   ```
   supabase/migrations/001_initial_schema.sql
   supabase/migrations/002_rls_policies.sql
   ```
3. Optionally run seed data:
   ```
   supabase/seed.sql
   ```
4. Get your project URL and API keys from **Settings > API**

### 3. Set Up Stripe

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from **Developers > API keys**
3. Run the setup script to create products and prices:
   ```bash
   STRIPE_SECRET_KEY=sk_test_... npx ts-node scripts/setup-stripe.ts
   ```
4. Copy the printed price IDs into your `.env.local`
5. Set up a webhook endpoint in **Developers > Webhooks**:
   - URL: `https://your-domain.com/api/webhooks/stripe`
   - Events to listen for:
     - `checkout.session.completed`
     - `customer.subscription.deleted`
     - `customer.subscription.updated`
     - `invoice.payment_failed`
     - `invoice.payment_succeeded`
6. Copy the webhook signing secret

### 4. Configure Environment Variables

```bash
cp .env.local.example .env.local
```

Fill in all values in `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Stripe Price IDs (from setup-stripe script)
STRIPE_PRICE_MONTHLY_ILS=price_...
# ... (18 price IDs total)

# Resend
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=noreply@yourdomain.com

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 6. Testing Stripe Webhooks Locally

Use the Stripe CLI to forward webhooks to your local server:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

### 7. Admin Setup

To give a user admin access:

1. In Supabase, go to **Authentication > Users**
2. Find the user and click on them
3. Update their `app_metadata` to include `{ "role": "admin" }`

Or via SQL:
```sql
UPDATE auth.users
SET app_metadata = jsonb_set(app_metadata, '{role}', '"admin"')
WHERE email = 'admin@example.com';
```

Admin users can access `/admin` to view:
- Total users and active subscribers
- Revenue statistics
- Donation allocations (yeshiva vs families)
- Recent user activity

## Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── admin/page.tsx
│   ├── api/
│   │   ├── auth/register/route.ts
│   │   ├── lessons/
│   │   │   ├── complete/route.ts
│   │   │   └── today/route.ts
│   │   ├── subscriptions/
│   │   │   ├── create-checkout/route.ts
│   │   │   ├── portal/route.ts
│   │   │   └── update-donation/route.ts
│   │   ├── user/stats/route.ts
│   │   └── webhooks/stripe/route.ts
│   ├── learn/page.tsx
│   ├── profile/page.tsx
│   ├── subscribe/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── CurrencySwitcher.tsx
│   ├── Footer.tsx
│   └── Navbar.tsx
├── lib/
│   ├── stripe.ts
│   ├── validations.ts
│   └── supabase/
│       ├── client.ts
│       ├── middleware.ts
│       ├── server.ts
│       └── types.ts
├── middleware.ts
└── store/
    └── useUserStore.ts
```

## Subscription Plans

| Plan | ILS | USD | EUR | GBP | CAD | AUD |
|------|-----|-----|-----|-----|-----|-----|
| Monthly | ₪18.90 | $4.99 | €4.99 | £4.49 | CA$6.99 | A$7.99 |
| Biannual (6mo) | ₪89 | $23.99 | €22.99 | £21.99 | CA$32.99 | A$37.99 |
| Annual | ₪148 | $39.99 | €37.99 | £35.99 | CA$54.99 | A$62.99 |

## Donation Routing

Users choose where their subscription goes:
- **ישיבה (Yeshiva)** — 100% to yeshiva Torah students
- **משפחות נזקקות (Poor Families)** — 100% to families in need
- **חלוקה שווה (Split 50/50)** — equally divided

All allocations are recorded in the `donation_allocations` table per payment.

## License

All rights reserved. כל הזכויות שמורות.
