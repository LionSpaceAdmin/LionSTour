"use client";

import { useI18n } from "@/hooks/useI18n";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

export default function EnterprisePage() {
  const { t } = useI18n();

  const solutions = [
    {
      id: 1,
      title: t("Enterprise.solutions.corporate.title"),
      description: t("Enterprise.solutions.corporate.description"),
      features: [
        t("Enterprise.solutions.corporate.feature1"),
        t("Enterprise.solutions.corporate.feature2"),
        t("Enterprise.solutions.corporate.feature3"),
      ],
      emoji: "🏢",
      gradient: "from-blue-50 to-cyan-100",
      iconGradient: "from-blue-400 to-cyan-500",
    },
    {
      id: 2,
      title: t("Enterprise.solutions.educational.title"),
      description: t("Enterprise.solutions.educational.description"),
      features: [
        t("Enterprise.solutions.educational.feature1"),
        t("Enterprise.solutions.educational.feature2"),
        t("Enterprise.solutions.educational.feature3"),
      ],
      emoji: "🎓",
      gradient: "from-purple-50 to-violet-100",
      iconGradient: "from-purple-400 to-violet-500",
    },
    {
      id: 3,
      title: t("Enterprise.solutions.custom.title"),
      description: t("Enterprise.solutions.custom.description"),
      features: [
        t("Enterprise.solutions.custom.feature1"),
        t("Enterprise.solutions.custom.feature2"),
        t("Enterprise.solutions.custom.feature3"),
      ],
      emoji: "✨",
      gradient: "from-amber-50 to-orange-100",
      iconGradient: "from-amber-400 to-orange-500",
    },
  ];

  const benefits = [
    {
      title: t("Enterprise.benefits.authentic.title"),
      description: t("Enterprise.benefits.authentic.description"),
      emoji: "🎯",
    },
    {
      title: t("Enterprise.benefits.safe.title"),
      description: t("Enterprise.benefits.safe.description"),
      emoji: "🛡️",
    },
    {
      title: t("Enterprise.benefits.scalable.title"),
      description: t("Enterprise.benefits.scalable.description"),
      emoji: "📈",
    },
    {
      title: t("Enterprise.benefits.support.title"),
      description: t("Enterprise.benefits.support.description"),
      emoji: "🤝",
    },
  ];

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
            {t("Enterprise.title")}
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
            {t("Enterprise.subtitle")}
          </p>
        </div>
      </div>

      {/* Solutions Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {t("Enterprise.ourSolutions")}
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              {t("Enterprise.ourSolutionsDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution) => (
              <div
                key={solution.id}
                className="group cursor-pointer emotional-hover"
              >
                <div
                  className={`bg-gradient-to-br ${solution.gradient} rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105 h-full`}
                >
                  <div className="text-center mb-6">
                    <div
                      className={`w-20 h-20 bg-gradient-to-br ${solution.iconGradient} rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                      <span className="text-white font-bold text-3xl">
                        {solution.emoji}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {solution.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {solution.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {solution.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <span className="text-amber-500 mr-3 mt-1">✓</span>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {t("Enterprise.whyChooseUs")}
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              {t("Enterprise.whyChooseUsDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
              >
                <div className="text-4xl mb-4">{benefit.emoji}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Partnership Form */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {t("Enterprise.startPartnership")}
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              {t("Enterprise.startPartnershipDesc")}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-3xl p-8 md:p-12 shadow-2xl">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t("Enterprise.form.organizationName")}
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder={t(
                        "Enterprise.form.organizationNamePlaceholder"
                      )}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t("Enterprise.form.contactPerson")}
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder={t(
                        "Enterprise.form.contactPersonPlaceholder"
                      )}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t("Enterprise.form.email")}
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder={t("Enterprise.form.emailPlaceholder")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t("Enterprise.form.phone")}
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder={t("Enterprise.form.phonePlaceholder")}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t("Enterprise.form.groupSize")}
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    aria-label={t("Enterprise.form.groupSize")}
                  >
                    <option>
                      {t("Enterprise.form.groupSizeOptions.small")}
                    </option>
                    <option>
                      {t("Enterprise.form.groupSizeOptions.medium")}
                    </option>
                    <option>
                      {t("Enterprise.form.groupSizeOptions.large")}
                    </option>
                    <option>
                      {t("Enterprise.form.groupSizeOptions.custom")}
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t("Enterprise.form.message")}
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder={t("Enterprise.form.messagePlaceholder")}
                  ></textarea>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-12 py-4 rounded-full font-bold text-xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-2xl"
                  >
                    {t("Enterprise.form.submit")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 bg-gradient-to-r from-amber-500 to-orange-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t("Enterprise.readyToPartner")}
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-3xl mx-auto">
            {t("Enterprise.readyToPartnerDesc")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-amber-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-amber-50 transition-all duration-300 transform hover:scale-105 shadow-2xl">
              {t("Enterprise.contactUs")}
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-white hover:text-amber-600 transition-all duration-300 transform hover:scale-105">
              {t("Enterprise.learnMore")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
