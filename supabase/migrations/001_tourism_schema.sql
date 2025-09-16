-- Tourism Platform schema for Supabase (app-managed tables)
-- Note: Do not include auth.users here; use a profiles table referencing it if needed.

create table if not exists public.guides (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique not null,
  bio text,
  profile_image text,
  is_veteran boolean not null default false,
  languages text[] default '{}',
  specialties text[] default '{}',
  rating double precision,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.experiences (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  duration int not null,
  price double precision not null,
  max_guests int not null,
  category text not null,
  location text not null,
  latitude double precision,
  longitude double precision,
  images text[] default '{}',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  guide_id uuid references public.guides(id) on delete cascade
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  date timestamptz not null,
  guests int not null,
  total_price double precision not null,
  status text not null default 'PENDING',
  stripe_id text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  user_id uuid,
  experience_id uuid references public.experiences(id) on delete cascade,
  guide_id uuid references public.guides(id) on delete cascade
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  rating int not null,
  comment text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  user_id uuid,
  experience_id uuid references public.experiences(id) on delete cascade,
  guide_id uuid references public.guides(id) on delete cascade
);

-- Academy articles
create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text not null,
  excerpt text,
  content text,
  cover_image text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Indexes
create index if not exists idx_experiences_category on public.experiences (category);
create index if not exists idx_experiences_location on public.experiences (location);
create index if not exists idx_bookings_user on public.bookings (user_id);
create index if not exists idx_reviews_experience on public.reviews (experience_id);

