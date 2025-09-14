"use client";

import { useI18n } from "@/hooks/useI18n";
import { JourneyQuestion, JourneyData, JourneyQuestionId } from "@/lib/types";

interface JourneyQuestionsProps {
  question: JourneyQuestion;
  journeyData: JourneyData;
  onAnswer: (questionId: JourneyQuestionId, answer: string | string[]) => void;
}

export function JourneyQuestions({ question, journeyData, onAnswer }: JourneyQuestionsProps) {
  const { t } = useI18n();

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {question.question}
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          {question.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {question.options.map((option) => {
          const isSelected =
            question.type === "multiple"
              ? (journeyData[question.id] as string[]).includes(option.value)
              : journeyData[question.id] === option.value;

          return (
            <button
              key={option.value}
              onClick={() => {
                if (question.type === "multiple") {
                  const currentValues = journeyData[question.id] as string[];
                  const newValues = isSelected
                    ? currentValues.filter((v) => v !== option.value)
                    : [...currentValues, option.value];
                  onAnswer(question.id, newValues);
                } else {
                  onAnswer(question.id, option.value);
                }
              }}
              className={`p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                isSelected
                  ? "border-amber-500 bg-amber-50 shadow-lg"
                  : "border-gray-200 bg-white hover:border-amber-300 hover:shadow-md"
              }`}
            >
              <div className="text-center">
                <div className="text-4xl mb-4">{option.emoji}</div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {option.label}
                </h3>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}