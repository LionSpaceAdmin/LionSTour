"use client";

import Link from "next/link";
import { useI18n } from "@/hooks/useI18n";

export function ExperienceWindowsPreview() {
  const { t } = useI18n();

  const experiences = [
    {
      title: t("HomePage.jerusalemExperience"),
      desc: t("HomePage.jerusalemDesc"),
      emoji: "🏛️",
    },
    {
      title: t("HomePage.telAvivExperience"),
      desc: t("HomePage.telAvivDesc"),
      emoji: "🌊",
    },
    {
      title: t("HomePage.galileeExperience"),
      desc: t("HomePage.galileeDesc"),
      emoji: "⛰️",
    },
  ];

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("HomePage.experienceWindows")}
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            {t("HomePage.experienceWindowsDesc")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((experience, i) => (
            <Link href="/experiences" key={i} className="group cursor-pointer">
              <div className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl mb-4">{experience.emoji}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {experience.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {experience.desc}
                </p>
                <div className="mt-6 text-amber-600 font-semibold group-hover:text-amber-700 transition-colors">
                  {t("HomePage.discoverMore")} →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
