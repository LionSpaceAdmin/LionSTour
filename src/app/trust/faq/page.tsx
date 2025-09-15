"use client";

import { useI18n } from "@/hooks/useI18n";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

export default function TrustFAQPage() {
  const { t } = useI18n();

  const faqs = [
    { q: t("TrustFAQ.q1.q"), a: t("TrustFAQ.q1.a") },
    { q: t("TrustFAQ.q2.q"), a: t("TrustFAQ.q2.a") },
    { q: t("TrustFAQ.q3.q"), a: t("TrustFAQ.q3.a") },
    { q: t("TrustFAQ.q4.q"), a: t("TrustFAQ.q4.a") },
    { q: t("TrustFAQ.q5.q"), a: t("TrustFAQ.q5.a") },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Language Switcher */}
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>

      {/* Hero */}
      <div className="relative py-20 bg-gradient-to-r from-amber-500 to-orange-600">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {t("TrustFAQ.title")}
          </h1>
          <p className="text-xl md:text-2xl text-amber-100 max-w-4xl mx-auto leading-relaxed">
            {t("TrustFAQ.subtitle")}
          </p>
        </div>
      </div>

      {/* FAQ List */}
      <div className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <ul className="space-y-4">
            {faqs.map((item, idx) => (
              <li key={idx} className="rounded-2xl bg-white p-6 text-gray-900">
                <h3 className="font-semibold text-lg mb-2">{item.q}</h3>
                <p className="text-gray-700 leading-relaxed">{item.a}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

