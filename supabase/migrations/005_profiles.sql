-- Profiles table (role-based access)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'user',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Users can view and update their own profile
create policy if not exists profiles_self_select on public.profiles for select using (auth.uid() = id);
create policy if not exists profiles_self_update on public.profiles for update using (auth.uid() = id);
create policy if not exists profiles_insert_self on public.profiles for insert with check (auth.uid() = id);

