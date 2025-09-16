import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data, error } = await supabase
    .from("articles")
    .select("title, content, cover_image, category, published_at")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) return notFound();

  const paragraphs = (data.content || "").split(/\n{2,}/g);

  return (
    <main className="container mx-auto max-w-3xl px-4 py-10 rtl">
      <article className="prose prose-neutral rtl:prose-h1:text-right rtl:prose-p:text-right">
        {data.cover_image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={data.cover_image}
            alt={data.title}
            className="mb-6 w-full rounded-xl"
          />
        ) : null}
        <h1 className="mb-2 text-3xl font-bold">{data.title}</h1>
        <div className="mb-8 text-sm text-neutral-500">
          {data.category} ·{" "}
          {data.published_at
            ? new Date(data.published_at).toLocaleDateString("he-IL")
            : ""}
        </div>
        {paragraphs.map((p: string, i: number) => (
          <p key={i} className="leading-8 text-neutral-800">
            {p}
          </p>
        ))}
      </article>
    </main>
  );
}
