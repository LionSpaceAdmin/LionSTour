// src/lib/types.ts

export interface JourneyData {
  interests: string[];
  duration: string;
  groupSize: string;
  budget: string;
  experience: string;
  emotions: string[];
  prompt?: string;
  [key: string]: string | string[] | undefined;
}

export type JourneyQuestionId = "interests" | "duration" | "groupSize" | "emotions";

export interface JourneyQuestion {
  id: JourneyQuestionId;
  question: string;
  description: string;
  type: "multiple" | "single";
  options: {
    value: string;
    label: string;
    emoji: string;
  }[];
}
