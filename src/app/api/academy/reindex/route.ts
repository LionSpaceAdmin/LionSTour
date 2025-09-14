import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'
import { createOpenAI } from '@ai-sdk/openai'
import { embedMany } from 'ai'
import { errorJson, okJson } from '@/lib/http'

const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST() {
  const admin = getSupabaseAdmin()
  if (!admin) return errorJson('Service role not configured', 500)
  const { data: articles, error } = await admin.from('articles').select('id, slug, title, excerpt, content').limit(1000)
  if (error) return errorJson(error.message, 500)
  type ArticleRow = { id: string; slug: string | null; title: string; excerpt?: string | null; content?: string | null }
  const docs = (articles as ArticleRow[] ?? []).map((a) => ({
    slug: `article-${a.slug || a.id}`,
    title: a.title as string,
    content: String(a.content || a.excerpt || a.title).slice(0, 5000),
  }))
  if (docs.length === 0) return okJson({ ok: true, count: 0 })
  const model = openai.embedding('openai:text-embedding-3-small')
  const embeddings = await embedMany({ model, values: docs.map(d => d.content) })
  const payload = docs.map((d, i) => ({ slug: d.slug, title: d.title, content: d.content, embedding: embeddings.embeddings[i] ?? [] }))
  const { error: upsertErr } = await admin.from('knowledge').upsert(payload, { onConflict: 'slug' })
  if (upsertErr) return errorJson(upsertErr.message, 500)
  return okJson({ ok: true, count: payload.length })
}
