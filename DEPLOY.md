# Deploy to Vercel — Phase 5

The app is a Next.js 14 project. Vercel auto-detects the framework
(no `vercel.json` needed).

## Steps
1. Push this branch to GitHub (done by Claude on `claude/exciting-planck-90OoS`).
2. On vercel.com → **New Project** → import the GitHub repo.
3. Framework preset: **Next.js** (auto-detected). Build: `next build`.
4. Add **Environment Variables** (from `.env.local.example`):
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
   - Stripe price IDs (after running `scripts/setup-stripe.ts`)
   - `ANTHROPIC_API_KEY` (for "Ask the Rabbi")
5. Deploy. Vercel auto-deploys on every push to the connected branch.
6. (Optional) Add a custom domain in Vercel → Settings → Domains.

## Content (Phase 2)
Run once where Sefaria is reachable (local machine or CI):
```
node scripts/fetch-sefaria.mjs
```
This writes `data/tehillim.json`, `data/mishna.json`, `data/torah.json`.
The app reads ONLY these local files at runtime — never calls Sefaria live.

## Database (Phase 3)
Apply the SQL in `supabase/migrations/` to your Supabase project, then set
the Supabase env vars above. Progress / streaks / minutes then persist in
Supabase and never reset on refresh.
