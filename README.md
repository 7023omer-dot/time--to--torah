# עת לתורה — Time to Torah

The Netflix of 5-minute Torah. Enable every Jew in the world to learn Torah in 5 minutes a day. Simple, modern, accessible. Every subscription goes directly to charity.

## Setup Instructions

### Step 1 — Supabase
1. Go to https://supabase.com → "Start for free"
2. Create a new project named `time-to-torah`
3. Go to **Settings → API** → copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`
4. Go to **SQL Editor** → paste and run `supabase/migrations/001_initial_schema.sql`
5. Then run `supabase/migrations/002_rls_policies.sql`
6. Then run `supabase/seed.sql` (demo data — 5 rabbis, 10 categories, 20 lessons, 6 achievements)

### Step 2 — Resend (emails)
1. Go to https://resend.com → sign up free
2. **API Keys** → Create API Key → paste as `RESEND_API_KEY`
3. Add your domain or use resend's sandbox for testing

### Step 3 — Environment Variables
```bash
cp .env.local.example .env.local
# Fill in all values
```

Required environment variables:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
RESEND_API_KEY=re_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 4 — Run Locally
```bash
npm install
npm run dev
# Open http://localhost:3000
```

### Step 5 — Deploy to Vercel
1. Go to https://vercel.com → sign up with GitHub
2. Click **"New Project"** → import repository `time--to--torah`
3. Add all environment variables from `.env.local`
4. Update `NEXT_PUBLIC_APP_URL` to your Vercel domain
5. Click **Deploy**

---

## Admin Access

To make a user admin, run in **Supabase SQL Editor**:
```sql
UPDATE auth.users 
SET raw_app_meta_data = raw_app_meta_data || '{"role": "admin"}'
WHERE email = 'your@email.com';
```

Then visit `/admin` to access the admin dashboard and `/admin/cms` for content management.

---

## Subscription Plans (Pilot — Mock Payment)

| Plan | ₪ | $ | € | £ | CA$ | A$ |
|------|---|---|---|---|-----|-----|
| Monthly | ₪18.90 | $4.99 | €4.99 | £4.49 | CA$6.99 | A$7.99 |
| Biannual (6 months) | ₪89 | $23.99 | €22.99 | £21.99 | CA$32.99 | A$37.99 |
| Annual | ₪148 | $39.99 | €37.99 | £35.99 | CA$54.99 | A$62.99 |

> **Note:** In the pilot phase, no real payment is processed. The mock checkout API directly creates a subscription record in the database.

---

## Donation Routing

When a user subscribes, they choose where their donation goes:
- **Yeshiva** — supports Torah scholars full-time
- **Poor Families** — helps families in need in the Jewish community
- **50/50 Split** — equal allocation to both (default)

100% of subscription revenue is donated. The platform operates on a charitable model.

---

## Features

- **10 Torah Categories**: Emunah, Parasha, Mussar, Mishna, Gemara, Tehillim, Halacha, Stories of the Righteous, Shalom Bayit, Parnasa
- **5 Rabbis** with full profiles and bios (Hebrew + English)
- **20 Seed Lessons** spanning all categories
- **6 Achievements**: First Lesson, Week Streak, Month Streak, 100-Day Streak, Matmid (50 lessons), Mazke HaRabbim (share)
- **Audio + Video** lesson support (HTML5 audio player, YouTube embed)
- **Hebrew/English** bilingual toggle on every lesson
- **Community Stats** live bar showing total learning minutes, active learners, etc.
- **Full CMS** for admin to manage rabbis, categories, and lessons
- **Mock Payment** for pilot phase (no real Stripe)

---

## Architecture

- **Framework**: Next.js 14 App Router
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Styling**: Tailwind CSS
- **State**: Zustand
- **Emails**: Resend (optional)

### Key Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with community stats |
| `/learn` | Today's lesson + category browser |
| `/lesson/[id]` | Single lesson page |
| `/subscribe` | Subscription plans (mock payment) |
| `/profile` | User profile with achievements |
| `/admin` | Admin dashboard |
| `/admin/cms` | Content management (rabbis, categories, lessons) |

### API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/community/stats` | GET | Live community statistics |
| `/api/lessons` | GET | Paginated lessons list |
| `/api/lessons/[id]` | GET | Single lesson |
| `/api/lessons/today` | GET | Today's lesson |
| `/api/lessons/complete` | POST | Mark lesson as complete |
| `/api/subscriptions/create-checkout` | POST | Mock subscription checkout |
| `/api/achievements/check` | POST | Check and award achievements |
| `/api/admin/rabbis` | GET, POST | Manage rabbis |
| `/api/admin/rabbis/[id]` | GET, PUT, DELETE | Single rabbi |
| `/api/admin/categories` | GET, POST | Manage categories |
| `/api/admin/categories/[id]` | GET, PUT, DELETE | Single category |
| `/api/admin/lessons` | GET, POST | Manage lessons |
| `/api/admin/lessons/[id]` | GET, PUT, DELETE | Single lesson |

---

## Database Schema

All tables are defined in `supabase/migrations/001_initial_schema.sql`:

- `profiles` — user profiles (auto-created on signup)
- `subscriptions` — subscription records
- `rabbis` — rabbi profiles
- `categories` — content categories (10 seeded)
- `lessons` — Torah lessons
- `lesson_completions` — user lesson completion tracking
- `donation_allocations` — donation records per payment
- `achievements` — achievement definitions (6 seeded)
- `user_achievements` — earned achievements per user
