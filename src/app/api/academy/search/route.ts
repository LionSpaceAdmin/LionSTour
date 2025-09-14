import { NextResponse } from 'next/server'
import { createOpenAI } from '@ai-sdk/openai'
import { embed } from 'ai'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'
import { createClient } from '@supabase/supabase-js'

const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = (searchParams.get('q') || '').trim()
  if (!q) return NextResponse.json({ results: [] })

  const model = openai.embedding('openai:text-embedding-3-small')
  const emb = await embed({ model, value: q })
  const queryEmbedding = emb.embedding

  const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supaAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (supaUrl && supaAnon) {
    const supabase = createClient(supaUrl, supaAnon)
    // Retrieve top 15 and filter to article-* slugs
    const { data, error } = await supabase.rpc('match_knowledge', { query_embedding: queryEmbedding, match_count: 15 })
    if (!error && Array.isArray(data)) {
      const results = data.filter((r: any) => typeof r.slug === 'string' && r.slug.startsWith('article-')).slice(0, 5)
      return NextResponse.json({ results })
    }
  }

  // Fallback: simple substring search on title/excerpt via Supabase
  const admin = getSupabaseAdmin()
  if (admin) {
    const { data, error } = await admin
      .from('articles')
      .select('id, slug, title, excerpt, cover_image, category')
      .ilike('title', `%${q}%`)
      .limit(10)
    if (!error && data) return NextResponse.json({ results: data })
  }
  return NextResponse.json({ results: [] })
}

