-- Add featured flag for experiences

alter table if exists public.experiences
  add column if not exists is_featured boolean not null default false;

create index if not exists idx_experiences_is_featured on public.experiences(is_featured) where is_featured = true;

