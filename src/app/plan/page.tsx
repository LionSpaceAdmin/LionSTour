"use client";

import { useEffect, useState } from "react";
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

// Define the type for the generated itinerary
interface Itinerary {
  title: string;
  days: {
    day: number;
    title: string;
    description: string;
    experienceId: string;
    guideName: string;
    emoji: string;
  }[];
}

export default function PlanPage() {
  const { t } = useI18n();
  const search = useSearchParams();
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
        { value: "spirituality", label: t("Plan.interests.options.spirituality"), emoji: "🕊️" },
      ],
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
        { value: "15+", label: t("Plan.duration.options.extended"), emoji: "🌍" },
      ],
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
        { value: "group", label: t("Plan.groupSize.options.group"), emoji: "👨‍👩‍👧‍👦👥" },
      ],
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
        { value: "inspiration", label: t("Plan.emotions.options.inspiration"), emoji: "✨" },
      ],
    },
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
        // Optionally, set an error state to show in the UI
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
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentQuestion = journeyQuestions[currentStep - 1];

  // Prefill from ?prompt= using simple keyword mapping (HE/EN)
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

    setJourneyData((prev) => ({
      ...prev,
      interests: interests.length ? Array.from(new Set(interests)) : prev.interests,
      emotions: emotions.length ? Array.from(new Set(emotions)) : prev.emotions,
      duration: duration || prev.duration,
      prompt: search.get("prompt") || prev.prompt,
    }));
  }, [search]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>

      <div className="relative py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6">
            {isJourneyCreated ? t("Itinerary.title") : t("Plan.title")}
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-4xl mx-auto leading-relaxed">
            {isJourneyCreated ? t("Itinerary.createdSubtitle") : t("Plan.subtitle")}
          </p>
        </div>
      </div>

      {!isJourneyCreated ? (
        <>
          {/* Progress Indicator */}
          <div className="py-8 bg-black/40 backdrop-blur border-y border-white/10">
            <div className="container mx-auto px-4 text-white">
              <div className="flex items-center justify-center space-x-4">
                {journeyQuestions.map((_, index) => (
                  <div key={index} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index + 1 <= currentStep
                          ? "bg-amber-500 text-white"
                          : "bg-white/20 text-white/60"
                      }`}
                    >
                      {index + 1}
                    </div>
                    {index < journeyQuestions.length - 1 && (
                      <div
                        className={`w-16 h-1 mx-2 ${
                          index + 1 < currentStep ? "bg-amber-500" : "bg-white/20"
                        }`}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Journey Questionnaire */}
          <div className="py-16">
            <div className="container mx-auto px-4 max-w-4xl">
              <JourneyQuestions
                question={currentQuestion}
                journeyData={journeyData}
                onAnswer={handleAnswer}
              />
              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                    currentStep === 1
                      ? "bg-white/10 text-white/40 cursor-not-allowed"
                      : "bg-white/15 text-white hover:bg-white/20"
                  }`}
                >
                  {t("Plan.previous")}
                </button>

                <button
                  onClick={handleNext}
                  className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 bg-amber-500 text-white hover:bg-amber-600`}
                >
                  {currentStep === journeyQuestions.length
                    ? t("Plan.createJourney")
                    : t("Plan.next")}
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
                <div className="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" aria-hidden="true" />
                {t("AIStatus.crafting")}
              </div>
            ) : itinerary ? (
              <>
                <StoryItinerary itinerary={itinerary} />
                <div className="mt-6 text-center">
                  <button
                    onClick={() => handleCreateJourney(Date.now())}
                    className="btn-outline px-8 py-3"
                  >
                    {t("Plan.regenerate")}
                  </button>
                </div>
                <GuideMatching journeyData={journeyData} />
                <EmotionalPreview journeyData={journeyData} />
                <ShareJourney journeyData={journeyData} />
                <JourneyReflection />
              </>
            ) : (
              <p className="text-center text-lg">{t("Itinerary.error")}</p> // Error state
            )}
          </div>
        </div>
      )}
    </div>
  );
}
