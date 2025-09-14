"use client";

import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/hooks/useI18n";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { supabase } from "@/lib/supabase";
import { ArticleCard, type Article } from "@/components/academy/article-card";
import { ArticleFilters } from "@/components/academy/article-filters";
import { SearchBar } from "@/components/academy/search-bar";

export default function AcademyPage() {
  const { t } = useI18n();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string>("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("id, slug, title, category, excerpt, cover_image")
        .order("published_at", { ascending: false })
        .limit(24);
      if (!error && data) setArticles(data as unknown as Article[]);
      setLoading(false);
    })();
  }, []);

  const categories = useMemo(
    () => [
      { key: "all", label: t("Academy.categories.all") },
      { key: "resilience", label: t("Academy.categories.resilience") },
      { key: "culture", label: t("Academy.categories.culture") },
      { key: "history", label: t("Academy.categories.history") },
      { key: "community", label: t("Academy.categories.community") },
      { key: "nature", label: t("Academy.categories.nature") },
      { key: "peace", label: t("Academy.categories.peace") },
    ],
    [t]
  );

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const matchCat = category === "all" || a.category === category;
      const matchQuery = !query || a.title.toLowerCase().includes(query.toLowerCase()) || (a.excerpt ?? '').toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [articles, category, query]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Language Switcher */}
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>

      {/* Hero Section */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 via-orange-300/10 to-red-400/10"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            {t("Academy.title")}
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
            {t("Academy.subtitle")}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="py-8 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t("Academy.exploreTopics")}
            </h2>
            <p className="text-lg text-gray-600">
              {t("Academy.exploreTopicsDesc")}
            </p>
          </div>

          <div className="mx-auto max-w-4xl space-y-4">
            <SearchBar value={query} onChange={setQuery} placeholder={t("Academy.searchPlaceholder") as string} />
            <ArticleFilters filters={categories} value={category} onChange={setCategory} />
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center text-neutral-500">{t("Common.loading")}</div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
              {filtered.length === 0 && (
                <div className="col-span-full text-center text-neutral-500">{t("Academy.noResults")}</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Featured Story */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {t("Academy.featuredStory")}
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              {t("Academy.featuredStoryDesc")}
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="text-6xl mb-6">🇮🇱</div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  {t("Academy.story.title")}
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {t("Academy.story.content")}
                </p>
                <div className="flex items-center text-amber-600 font-semibold">
                  <span className="mr-2">👤</span>
                  <span>{t("Academy.story.author")}</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl p-8">
                <h4 className="text-2xl font-bold text-gray-900 mb-4">
                  {t("Academy.story.keyPoints")}
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-3">✓</span>
                    <span className="text-gray-700">
                      {t("Academy.story.point1")}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-3">✓</span>
                    <span className="text-gray-700">
                      {t("Academy.story.point2")}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-3">✓</span>
                    <span className="text-gray-700">
                      {t("Academy.story.point3")}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 bg-gradient-to-r from-amber-500 to-orange-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t("Academy.joinLearning")}
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-3xl mx-auto">
            {t("Academy.joinLearningDesc")}
          </p>
          <button className="bg-white text-amber-600 px-12 py-4 rounded-full font-bold text-xl hover:bg-amber-50 transition-all duration-300 transform hover:scale-105 shadow-2xl">
            {t("Academy.startLearning")}
          </button>
        </div>
      </div>
    </div>
  );
}
