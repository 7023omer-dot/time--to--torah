-- Profiles RLS
alter table public.profiles enable row level security;
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Subscriptions RLS
alter table public.subscriptions enable row level security;
create policy "Users can view own subscriptions" on public.subscriptions for select using (auth.uid() = user_id);

-- Lessons RLS (free lessons visible to all, paid require active subscription)
alter table public.lessons enable row level security;
create policy "Free lessons visible to all" on public.lessons for select using (is_free = true);
create policy "Paid lessons for subscribers" on public.lessons for select using (
  exists (
    select 1 from public.subscriptions
    where user_id = auth.uid() and status = 'active'
  )
);

-- Lesson completions RLS
alter table public.lesson_completions enable row level security;
create policy "Users manage own completions" on public.lesson_completions for all using (auth.uid() = user_id);

-- Donation allocations RLS
alter table public.donation_allocations enable row level security;
create policy "Users can view own allocations" on public.donation_allocations for select using (auth.uid() = user_id);

-- Admins can see everything (requires admin role in JWT)
create policy "Admins view all profiles" on public.profiles for all using (auth.jwt() ->> 'role' = 'admin');
create policy "Admins view all subscriptions" on public.subscriptions for all using (auth.jwt() ->> 'role' = 'admin');
create policy "Admins view all allocations" on public.donation_allocations for all using (auth.jwt() ->> 'role' = 'admin');
create policy "Admins manage lessons" on public.lessons for all using (auth.jwt() ->> 'role' = 'admin');
