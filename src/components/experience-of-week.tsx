"use client";

import Link from "next/link";
import { useI18n } from "@/hooks/useI18n";
import { ProgressiveImage } from "@/components/ui/progressive-image";

type Experience = {
  id: string;
  title: string;
  description: string;
  images?: string[];
};

export function ExperienceOfWeek({ experiences }: { experiences: Experience[] }) {
  const { t } = useI18n();

  if (!Array.isArray(experiences) || experiences.length === 0) return null;

  const featured = experiences[0];
  const img = featured.images?.[0] || "/window.svg";

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-block rounded-full bg-amber-100 text-amber-700 px-4 py-1 text-sm font-semibold mb-3">
            {t("Experiences.featured.badge")}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            {t("Experiences.featured.title")}
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            {t("Experiences.featured.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-white rounded-3xl shadow-2xl p-6 md:p-10">
          <div className="order-2 lg:order-1">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {featured.title}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              {featured.description}
            </p>
            <div className="flex gap-4">
              <Link href="/experiences" className="btn-primary px-6 py-3">
                {t("HomePage.discoverMore")}
              </Link>
              <Link href="/plan" className="btn-outline px-6 py-3">
                {t("Navigation.planJourney")}
              </Link>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <ProgressiveImage
                src={img}
                placeholder={"/window.svg"}
                alt={featured.title}
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

