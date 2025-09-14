"use client";

import { useI18n } from "@/hooks/useI18n";
import { useState } from "react";

export function JourneyReflection() {
  const { t } = useI18n();
  const [reflection, setReflection] = useState("");

  const handleSave = () => {
    // In a real app, this would save the reflection to the database
    alert("Reflection saved!");
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mt-12">
      <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
        {t("JourneyReflection.title")}
      </h2>
      <p className="text-lg text-gray-600 mb-8 text-center">
        {t("JourneyReflection.subtitle")}
      </p>
      <textarea
        value={reflection}
        onChange={(e) => setReflection(e.target.value)}
        className="w-full h-40 p-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
        placeholder={t("JourneyReflection.placeholder")}
      />
      <div className="text-center mt-8">
        <button 
          onClick={handleSave}
          className="bg-amber-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-amber-600 transition-colors"
        >
          {t("JourneyReflection.saveButton")}
        </button>
      </div>
    </div>
  );
}
