-- Knowledge base with pgvector embedding
create table if not exists public.knowledge (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  content text not null,
  embedding vector(1536) not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- RLS
alter table public.knowledge enable row level security;
create policy if not exists knowledge_read on public.knowledge for select using (true);

-- Vector index (IVFFlat)
create index if not exists knowledge_embedding_ivfflat on public.knowledge using ivfflat (embedding vector_l2_ops) with (lists = 100);

-- Similarity match function
create or replace function public.match_knowledge(query_embedding vector(1536), match_count int default 5)
returns table(slug text, title text, content text, similarity real) language sql stable as $$
  select k.slug, k.title, k.content, 1 - (k.embedding <=> query_embedding) as similarity
  from public.knowledge k
  order by k.embedding <-> query_embedding
  limit greatest(match_count, 1)
$$;

