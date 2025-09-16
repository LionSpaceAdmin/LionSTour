"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useI18n } from "@/hooks/useI18n";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, cubicBezier } from "framer-motion";
import { Search } from "lucide-react";

// More subtle, elegant pulsing cursor
const PulsingCursor = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 1, 0] }}
    transition={{
      duration: 1.2,
      repeat: Infinity,
      ease: cubicBezier(0.4, 0.0, 0.2, 1),
    }}
    className="absolute right-6 top-1/2 -translate-y-1/2 h-6 w-0.5 bg-white/70"
  />
);

const journeyIdeas = [
  "A culinary tour of Tel Aviv's markets",
  "Spiritual journey through ancient Jerusalem",
  "Hike the Jesus Trail in the Galilee",
  "Relax and float in the Dead Sea",
  "Explore the Ramon Crater at sunrise",
];

export function HeroSectionAI() {
  const { t } = useI18n();
  const router = useRouter();
  const [placeholder, setPlaceholder] = useState(journeyIdeas[0]);
  const [ideaIndex, setIdeaIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIdeaIndex((prevIndex) => (prevIndex + 1) % journeyIdeas.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setPlaceholder(journeyIdeas[ideaIndex]);
  }, [ideaIndex]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: cubicBezier(0, 0, 0.2, 1),
      },
    },
  };

  const handlePromptSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.querySelector(
      "input[name='query']"
    ) as HTMLInputElement;
    if (input && input.value) {
      router.push(`/plan?query=${encodeURIComponent(input.value)}`);
    } else {
      // If the input is empty, we can navigate to the planner or show a message
      router.push("/plan");
    }
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white text-center px-4 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 bg-black/40 -z-10" />

      <motion.h1
        variants={itemVariants}
        className="mb-4 text-5xl md:text-7xl font-bold tracking-tight text-shadow-lg"
      >
        {t("HomePage.title")}
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="mb-10 max-w-3xl text-lg md:text-xl text-white/80 text-shadow"
      >
        {t("HomePage.aiSubtitle")}
      </motion.p>

      <motion.div variants={itemVariants} className="w-full max-w-2xl mx-auto">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-400 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition duration-500"></div>
          <form
            action="/plan"
            className="relative flex items-center"
            onSubmit={handlePromptSubmit}
          >
            <Search className="absolute start-6 w-6 h-6 text-white/40" />
            <input
              type="text"
              name="query"
              aria-label={t("HomePage.aiPrompt")}
              className="w-full pl-16 pr-8 py-5 text-lg text-white bg-black/30 border border-white/20 rounded-full backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-purple-400/80 transition-all duration-300 placeholder:text-white/50"
            />
            <AnimatePresence mode="wait">
              <motion.span
                key={placeholder}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5 }}
                className="absolute left-16 pointer-events-none text-white/50"
              >
                {placeholder}
              </motion.span>
            </AnimatePresence>
            <PulsingCursor />
          </form>
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
      >
        <Link
          href="/plan"
          className="group relative inline-block px-8 py-3 text-lg font-semibold text-white bg-white/5 border-2 border-transparent rounded-full backdrop-blur-xl shadow-lg transition-all duration-300 overflow-hidden
                     hover:shadow-purple-500/20 hover:scale-105 transform"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <span className="relative flex items-center justify-center gap-2">
            {t("HomePage.aiExplore")}
          </span>
        </Link>

        <Link
          href="/guides"
          className="px-8 py-3 text-lg font-medium text-white/80 bg-transparent border-2 border-white/30 rounded-full backdrop-blur-sm transition-all duration-300
                     hover:bg-white/10 hover:text-white hover:border-white/50 hover:scale-105 transform"
        >
          {t("HomePage.aiPlan")}
        </Link>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mt-12 flex flex-wrap justify-center items-center gap-x-3 gap-y-2 max-w-3xl"
      >
        <span className="text-sm text-white/50 mr-2">Popular ideas:</span>
        {journeyIdeas.slice(0, 3).map((idea, index) => (
          <span
            key={index}
            className="px-3 py-1 text-sm text-white/70 bg-white/5 border border-white/10 rounded-full cursor-pointer hover:bg-white/10 hover:text-white transition-all"
          >
            {idea}
          </span>
        ))}
      </motion.div>
    </motion.section>
  );
}
