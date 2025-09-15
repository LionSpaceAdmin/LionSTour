"use client";

import { useI18n } from "@/hooks/useI18n";
import { Guide } from "@prisma/client";

interface TestimonialGalleryProps {
  guide?: Partial<Guide>;
  testimonials?: Array<{ quote: string; author: string }>;
}

export function TestimonialGallery({
  guide: _guide,
  testimonials: initialTestimonials,
}: TestimonialGalleryProps) {
  const { t } = useI18n();

  // Placeholder data. In the future, this would come from guide.reviews
  const testimonials = initialTestimonials || [
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
      <h2 className="text-3xl font-bold text-white mb-8">
        {t("Guide.testimonials.title")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white/5 border border-white/10 rounded-lg p-6"
          >
            <p className="text-white/70 italic mb-4">{testimonial.quote}</p>
            <p className="text-right text-purple-400 font-semibold">
              - {testimonial.author}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
