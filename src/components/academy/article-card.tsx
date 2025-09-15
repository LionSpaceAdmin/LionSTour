"use client";

import Image from "next/image";
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
          <div className="mb-3 h-40 w-full rounded-xl overflow-hidden relative">
            <Image
              src={article.cover_image}
              alt={article.title}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
              className="object-cover"
            />
          </div>
        ) : null}
        <div className="text-xs text-amber-700">{article.category}</div>
        <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-neutral-900">{article.title}</h3>
        <p className="line-clamp-3 text-sm text-neutral-600">{article.excerpt ?? ''}</p>
      </div>
    </div>
  );
}
