"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useI18n } from "@/hooks/useI18n";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { JourneyQuestions } from "@/components/journey-questions";
import { StoryItinerary } from "@/components/story-itinerary";
import { GuideMatching } from "@/components/guide-matching";
import { EmotionalPreview } from "@/components/emotional-preview";
import { ShareJourney } from "@/components/share-journey";
import { JourneyReflection } from "@/components/journey-reflection";
import { JourneyData, JourneyQuestion, JourneyQuestionId } from "@/lib/types";
import { motion } from "framer-motion";

interface Itinerary {
  title: string;
  days: {
    day: number;
    title: string;
    description: string;
    experienceId: string;
    guideName: string;
    emoji: string;
    info?: string;
    tips?: string;
  }[];
}

function SearchParamsHandler({
  onUpdateJourneyData,
}: {
  onUpdateJourneyData: (data: Partial<JourneyData>) => void;
}) {
  const search = useSearchParams();
  useEffect(() => {
    const prompt = (search.get("prompt") || "").toLowerCase();
    if (!prompt) return;
    const interests: string[] = [];
    const emotions: string[] = [];
    const includes = (s: string) => prompt.includes(s);
    if (["nature", "טבע"].some(includes)) interests.push("nature");
    if (["history", "היסטור"].some(includes)) interests.push("history");
    if (["culture", "תרבות"].some(includes)) interests.push("culture");
    if (["food", "אוכל"].some(includes)) interests.push("food");
    if (["adventure", "הרפתק"].some(includes)) interests.push("adventure");
    if (["spiritual", "רוח"].some(includes)) interests.push("spirituality");

    if (["healing", "ריפוי"].some(includes)) emotions.push("healing");
    if (["peace", "שקט", "שלווה"].some(includes)) emotions.push("peace");
    if (["connection", "חיבור"].some(includes)) emotions.push("connection");
    if (["inspiration", "השראה"].some(includes)) emotions.push("inspiration");
    if (["excitement", "התרגשות"].some(includes)) emotions.push("adventure");

    let duration = "";
    if (/(1|2|3)\s*days?|סופ/.test(prompt)) duration = "1-3";
    else if (/week|שבוע/.test(prompt)) duration = "4-7";
    else if (/two\s*weeks|שבועיים/.test(prompt)) duration = "8-14";
    else if (/month|חודש/.test(prompt)) duration = "15+";

    onUpdateJourneyData({
      interests: interests.length ? Array.from(new Set(interests)) : undefined,
      emotions: emotions.length ? Array.from(new Set(emotions)) : undefined,
      duration: duration || undefined,
      prompt: search.get("prompt") || "",
    });
  }, [search, onUpdateJourneyData]);
  return null;
}

function PlanPageContent() {
  const { t } = useI18n();
  const [currentStep, setCurrentStep] = useState(1);
  const [isJourneyCreated, setIsJourneyCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [journeyData, setJourneyData] = useState<JourneyData>({
    interests: [],
    duration: "",
    groupSize: "",
    budget: "",
    experience: "",
    emotions: [],
    prompt: "",
  });

  const handleUpdateJourneyData = (data: Partial<JourneyData>) => {
    setJourneyData((prev) => ({
      ...prev,
      interests: data.interests !== undefined ? data.interests : prev.interests,
      emotions: data.emotions !== undefined ? data.emotions : prev.emotions,
      duration: data.duration !== undefined ? data.duration : prev.duration,
      prompt: data.prompt !== undefined ? data.prompt : prev.prompt,
    }));
  };

  const journeyQuestions: JourneyQuestion[] = [
    {
      id: "interests",
      question: t("Plan.interests.question"),
      description: t("Plan.interests.description"),
      type: "multiple",
      options: [
        { value: "history", label: t("Plan.interests.options.history"), emoji: "🏛️" },
        { value: "nature", label: t("Plan.interests.options.nature"), emoji: "🌿" },
        { value: "culture", label: t("Plan.interests.options.culture"), emoji: "🎭" },
        { value: "food", label: t("Plan.interests.options.food"), emoji: "🍽️" },
        { value: "adventure", label: t("Plan.interests.options.adventure"), emoji: "🏔️" },
        { value: "spirituality", label: t("Plan.interests.options.spirituality"), emoji: "🕊️" }
      ]
    },
    {
      id: "duration",
      question: t("Plan.duration.question"),
      description: t("Plan.duration.description"),
      type: "single",
      options: [
        { value: "1-3", label: t("Plan.duration.options.short"), emoji: "⚡" },
        { value: "4-7", label: t("Plan.duration.options.medium"), emoji: "📅" },
        { value: "8-14", label: t("Plan.duration.options.long"), emoji: "🗓️" },
        { value: "15+", label: t("Plan.duration.options.extended"), emoji: "🌍" }
      ]
    },
    {
      id: "groupSize",
      question: t("Plan.groupSize.question"),
      description: t("Plan.groupSize.description"),
      type: "single",
      options: [
        { value: "solo", label: t("Plan.groupSize.options.solo"), emoji: "🧍" },
        { value: "couple", label: t("Plan.groupSize.options.couple"), emoji: "👫" },
        { value: "family", label: t("Plan.groupSize.options.family"), emoji: "👨‍👩‍👧‍👦" },
        { value: "friends", label: t("Plan.groupSize.options.friends"), emoji: "👥" },
        { value: "group", label: t("Plan.groupSize.options.group"), emoji: "👨‍👩‍👧‍👦👥" }
      ]
    },
    {
      id: "emotions",
      question: t("Plan.emotions.question"),
      description: t("Plan.emotions.description"),
      type: "multiple",
      options: [
        { value: "healing", label: t("Plan.emotions.options.healing"), emoji: "💚" },
        { value: "discovery", label: t("Plan.emotions.options.discovery"), emoji: "🔍" },
        { value: "connection", label: t("Plan.emotions.options.connection"), emoji: "🤝" },
        { value: "adventure", label: t("Plan.emotions.options.adventure"), emoji: "⚡" },
        { value: "peace", label: t("Plan.emotions.options.peace"), emoji: "🕊️" },
        { value: "inspiration", label: t("Plan.emotions.options.inspiration"), emoji: "✨" }
      ]
    }
  ];

  const handleAnswer = (questionId: JourneyQuestionId, answer: string | string[]) => {
    setJourneyData((prev: JourneyData) => ({ ...prev, [questionId]: answer }));
  };

  const handleCreateJourney = async (seed?: number) => {
    setIsLoading(true);
    setIsJourneyCreated(true);
    try {
      const response = await fetch("/api/itineraries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...journeyData, seed: seed ?? Date.now() }),
      });
      const data = await response.json();
      if (response.ok) {
        setItinerary(data);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Failed to fetch itinerary", error);
    }
    setIsLoading(false);
  };

  const handleNext = () => {
    if (currentStep < journeyQuestions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      handleCreateJourney();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const currentQuestion = journeyQuestions[currentStep - 1];

  return (
    <div className="min-h-screen bg-black text-white">
      <Suspense fallback={null}>
        <SearchParamsHandler onUpdateJourneyData={handleUpdateJourneyData} />
      </Suspense>
      <div className="absolute top-4 end-4 z-10">
        <LanguageSwitcher />
      </div>

      <div className="relative pt-32 pb-16 text-center">
        <div className="container mx-auto px-4">
          <motion.h1 initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}} className="text-5xl md:text-6xl font-bold text-white mb-4">
            {isJourneyCreated ? t("Itinerary.title") : t("Plan.title")}
          </motion.h1>
          <motion.p initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5, delay: 0.2}} className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            {isJourneyCreated ? t("Itinerary.createdSubtitle") : t("Plan.subtitle")}
          </motion.p>
        </div>
      </div>

      {!isJourneyCreated ? (
        <>
          <div className="container mx-auto px-4 mb-12">
            <div className="w-full bg-white/10 rounded-full h-2.5">
                <motion.div 
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-2.5 rounded-full"
                    initial={{width: 0}}
                    animate={{width: `${(currentStep / journeyQuestions.length) * 100}%`}}
                    transition={{duration: 0.5, ease: "easeInOut"}}
                />
            </div>
          </div>

          <div className="py-8">
            <div className="container mx-auto px-4 max-w-4xl">
              <JourneyQuestions question={currentQuestion} journeyData={journeyData} onAnswer={handleAnswer} />
              <div className="flex justify-between mt-12">
                <button 
                  onClick={prevStep} 
                  disabled={currentStep === 1}
                  className="px-8 py-3 text-lg font-medium text-white/80 bg-transparent border-2 border-white/30 rounded-full backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:text-white hover:border-white/50 hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t("Plan.previous")}
                </button>
                <button 
                  onClick={handleNext} 
                  className="group relative inline-block px-8 py-3 text-lg font-semibold text-white bg-white/5 border-2 border-transparent rounded-full backdrop-blur-xl shadow-lg transition-all duration-300 overflow-hidden hover:shadow-purple-500/20 hover:scale-105 transform"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="relative">
                        {currentStep === journeyQuestions.length ? t("Plan.createJourney") : t("Plan.next")}
                    </span>
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            {isLoading ? (
              <div className="text-center text-lg text-white/80" role="status" aria-busy="true">
                <div className="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" aria-hidden="true" />
                {t("AIStatus.crafting")}
              </div>
            ) : itinerary ? (
              <>
                <StoryItinerary itinerary={itinerary} />
                <div className="mt-6 text-center">
                  <button onClick={() => handleCreateJourney(Date.now())} className="px-8 py-3 text-lg font-medium text-white/80 bg-transparent border-2 border-white/30 rounded-full backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:text-white hover:border-white/50 hover:scale-105 transform">
                    {t("Plan.regenerate")}
                  </button>
                </div>
                <GuideMatching journeyData={journeyData} />
                <EmotionalPreview journeyData={journeyData} />
                <ShareJourney journeyData={journeyData} />
                <JourneyReflection />
              </>
            ) : (
              <p className="text-center text-lg">{t("Itinerary.error")}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function PlanClient() {
  return <PlanPageContent />;
}

