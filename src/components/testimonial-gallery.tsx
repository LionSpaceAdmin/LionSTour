"use client";

import { useI18n } from "@/hooks/useI18n";
import { Guide } from "@prisma/client";

interface TestimonialGalleryProps {
  guide: Guide;
}

export function TestimonialGallery({ guide }: TestimonialGalleryProps) {
  const { t } = useI18n();

  // Placeholder data. In the future, this would come from guide.reviews
  const testimonials = [
    {
      quote: t("Guide.testimonials.1.quote"),
      author: t("Guide.testimonials.1.author"),
    },
    {
      quote: t("Guide.testimonials.2.quote"),
      author: t("Guide.testimonials.2.author"),
    },
    {
      quote: t("Guide.testimonials.3.quote"),
      author: t("Guide.testimonials.3.author"),
    },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">{t("Guide.testimonials.title")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6">
            <p className="text-gray-600 italic mb-4">{testimonial.quote}</p>
            <p className="text-right text-amber-600 font-semibold">- {testimonial.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}