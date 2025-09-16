-- Enable RLS
alter table public.guides enable row level security;
alter table public.experiences enable row level security;
alter table public.bookings enable row level security;
alter table public.reviews enable row level security;
alter table public.articles enable row level security;

-- Basic read access: all users (anon) can read public content
create policy if not exists guides_read on public.guides for select using (true);
create policy if not exists experiences_read on public.experiences for select using (is_active);
create policy if not exists articles_read on public.articles for select using (true);

-- Bookings and reviews: only owner can read/write (requires app to set user_id explicitly)
create policy if not exists bookings_owner_select on public.bookings for select using (auth.uid() = user_id);
create policy if not exists bookings_owner_insert on public.bookings for insert with check (auth.uid() = user_id);
create policy if not exists bookings_owner_update on public.bookings for update using (auth.uid() = user_id);

create policy if not exists reviews_owner_select on public.reviews for select using (auth.uid() = user_id);
create policy if not exists reviews_owner_insert on public.reviews for insert with check (auth.uid() = user_id);
create policy if not exists reviews_owner_update on public.reviews for update using (auth.uid() = user_id);

-- Admin bypass via service role (handled by Supabase automatically)

