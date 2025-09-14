import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'
import { createOpenAI } from '@ai-sdk/openai'
import { embedMany } from 'ai'

const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST() {
  const admin = getSupabaseAdmin()
  if (!admin) return NextResponse.json({ error: 'Service role not configured' }, { status: 500 })
  const { data: articles, error } = await admin.from('articles').select('id, slug, title, excerpt, content').limit(1000)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  const docs = (articles ?? []).map((a: any) => ({
    slug: `article-${a.slug || a.id}`,
    title: a.title as string,
    content: String(a.content || a.excerpt || a.title).slice(0, 5000),
  }))
  if (docs.length === 0) return NextResponse.json({ ok: true, count: 0 })
  const model = openai.embedding('openai:text-embedding-3-small')
  const embeddings = await embedMany({ model, values: docs.map(d => d.content) })
  const payload = docs.map((d, i) => ({ slug: d.slug, title: d.title, content: d.content, embedding: embeddings.embeddings[i] ?? [] }))
  const { error: upsertErr } = await admin.from('knowledge').upsert(payload, { onConflict: 'slug' })
  if (upsertErr) return NextResponse.json({ error: upsertErr.message }, { status: 500 })
  return NextResponse.json({ ok: true, count: payload.length })
}

