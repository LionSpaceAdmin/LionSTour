-- Partner inquiries for enterprise page

create table if not exists public.partner_inquiries (
  id uuid primary key default gen_random_uuid(),
  organization_name text not null,
  contact_person text,
  email text not null,
  phone text,
  group_size text,
  message text,
  created_at timestamptz not null default now()
);

alter table public.partner_inquiries enable row level security;

-- Allow inserts from anon (form submissions). Consider tightening in production.
create policy if not exists partner_inquiries_insert on public.partner_inquiries
  for insert with check (true);

-- Allow admins (service role) to select; anon cannot read
create policy if not exists partner_inquiries_select on public.partner_inquiries
  for select using (false);

