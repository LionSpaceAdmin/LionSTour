"use client";

// import { useI18n } from "@/hooks/useI18n";
import { JourneyQuestion, JourneyData, JourneyQuestionId } from "@/lib/types";
import { motion } from "framer-motion";

interface JourneyQuestionsProps {
  question: JourneyQuestion;
  journeyData: JourneyData;
  onAnswer: (questionId: JourneyQuestionId, answer: string | string[]) => void;
}

export function JourneyQuestions({
  question,
  journeyData,
  onAnswer,
}: JourneyQuestionsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      key={question.id} // Animate when question changes
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="bg-black/20 border border-white/10 rounded-3xl shadow-2xl p-8 md:p-12 backdrop-blur-lg"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {question.question}
        </h2>
        <p className="text-lg text-white/70 leading-relaxed">
          {question.description}
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
      >
        {question.options.map((option) => {
          const isSelected =
            question.type === "multiple"
              ? (journeyData[question.id] as string[]).includes(option.value)
              : journeyData[question.id] === option.value;

          return (
            <motion.button
              key={option.value}
              variants={itemVariants}
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
              className={`relative p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 overflow-hidden
                ${
                  isSelected
                    ? "border-purple-500 bg-purple-500/20 shadow-lg"
                    : "border-white/20 bg-white/5 hover:border-purple-400/80 hover:shadow-md"
                }`}
            >
              {isSelected && (
                <motion.div
                  layoutId={`selection-bubble-${question.id}`}
                  className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-500 opacity-40"
                />
              )}
              <div className="relative text-center">
                <div className="text-4xl mb-4">{option.emoji}</div>
                <h3 className="text-lg font-semibold text-white">
                  {option.label}
                </h3>
              </div>
            </motion.button>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
