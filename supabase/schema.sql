create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  age int,
  weight_kg numeric,
  height_cm numeric,
  sex text check (sex in ('male', 'female', 'other')),
  fitness_level text check (fitness_level in ('beginner', 'intermediate', 'advanced')),
  goal text check (goal in ('gain_muscle', 'lose_fat', 'maintain', 'strength', 'endurance')),
  available_days int default 3,
  injuries text[] default '{}',
  experience text,
  equipment text[] default '{}',
  dietary_restrictions text[] default '{}',
  is_premium boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile" on public.profiles
for select using (auth.uid() = id);

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile" on public.profiles
for insert with check (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile" on public.profiles
for update using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "Users can delete own profile" on public.profiles;
create policy "Users can delete own profile" on public.profiles
for delete using (auth.uid() = id);
