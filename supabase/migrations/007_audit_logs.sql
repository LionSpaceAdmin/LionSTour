-- Audit logs for admin actions

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  actor_user_id uuid,
  action text not null,
  target_type text not null,
  target_id text,
  metadata jsonb
);

alter table public.audit_logs enable row level security;

-- Only service role can insert/select (app uses service role via admin client)
create policy if not exists audit_logs_insert on public.audit_logs for insert with check (false);
create policy if not exists audit_logs_select on public.audit_logs for select using (false);

