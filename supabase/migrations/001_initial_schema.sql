-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users profile (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  full_name text,
  avatar_url text,
  preferred_language text default 'he' check (preferred_language in ('he', 'en')),
  preferred_currency text default 'ILS' check (preferred_currency in ('ILS', 'USD', 'EUR', 'GBP', 'CAD', 'AUD')),
  stripe_customer_id text unique,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Subscriptions
create table public.subscriptions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  stripe_subscription_id text unique not null,
  stripe_price_id text not null,
  plan text not null check (plan in ('monthly', 'biannual', 'annual')),
  currency text not null,
  amount_cents integer not null,
  status text not null check (status in ('active', 'canceled', 'past_due', 'trialing', 'incomplete')),
  donation_target text not null check (donation_target in ('yeshiva', 'poor_families', 'split_50_50')),
  current_period_start timestamptz,
  current_period_end timestamptz,
  canceled_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Rabbis
create table public.rabbis (
  id uuid default uuid_generate_v4() primary key,
  name_he text not null,
  name_en text not null,
  bio_he text,
  bio_en text,
  photo_url text,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Categories
create table public.categories (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  name_he text not null,
  name_en text not null,
  description_he text,
  description_en text,
  icon text not null,
  display_order integer default 0,
  is_active boolean default true
);

-- Torah lessons
create table public.lessons (
  id uuid default uuid_generate_v4() primary key,
  title_he text not null,
  title_en text not null,
  content_he text not null,
  content_en text not null,
  summary_he text,
  summary_en text,
  youtube_id text,
  audio_url text,
  parasha text,
  category_id uuid references public.categories(id) on delete set null,
  rabbi_id uuid references public.rabbis(id) on delete set null,
  lesson_date date unique not null,
  is_free boolean default false,
  estimated_minutes integer default 5,
  created_at timestamptz default now()
);

-- Lesson completions
create table public.lesson_completions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  lesson_id uuid references public.lessons(id) on delete cascade not null,
  completed_at timestamptz default now(),
  unique(user_id, lesson_id)
);

-- Donation allocations (recorded per payment)
create table public.donation_allocations (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  subscription_id uuid references public.subscriptions(id) on delete cascade not null,
  stripe_invoice_id text not null,
  amount_cents integer not null,
  currency text not null,
  yeshiva_cents integer not null default 0,
  poor_families_cents integer not null default 0,
  payment_date timestamptz default now()
);

-- Achievement definitions
create table public.achievements (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  name_he text not null,
  name_en text not null,
  description_he text not null,
  description_en text not null,
  icon text not null,
  condition_type text not null check (condition_type in ('streak', 'total_lessons', 'first_lesson', 'share')),
  condition_value integer default 0
);

-- User achievements (earned)
create table public.user_achievements (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  achievement_id uuid references public.achievements(id) on delete cascade not null,
  earned_at timestamptz default now(),
  unique(user_id, achievement_id)
);

-- Updated_at trigger
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at before update on public.profiles
  for each row execute function public.handle_updated_at();

create trigger subscriptions_updated_at before update on public.subscriptions
  for each row execute function public.handle_updated_at();

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
