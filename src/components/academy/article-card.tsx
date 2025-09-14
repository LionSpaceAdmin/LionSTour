"use client";

export type Article = {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt?: string | null;
  cover_image?: string | null;
};

export function ArticleCard({ article }: { article: Article }) {
  return (
    <div className="group cursor-pointer">
      <div className="rounded-2xl border bg-white p-4 shadow-sm transition-all group-hover:shadow-md">
        {article.cover_image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={article.cover_image} alt={article.title} className="mb-3 h-40 w-full rounded-xl object-cover" />
        ) : null}
        <div className="text-xs text-amber-700">{article.category}</div>
        <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-neutral-900">{article.title}</h3>
        <p className="line-clamp-3 text-sm text-neutral-600">{article.excerpt ?? ''}</p>
      </div>
    </div>
  );
}

