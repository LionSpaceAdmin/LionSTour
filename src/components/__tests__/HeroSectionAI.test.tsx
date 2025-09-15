import { render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { HeroSectionAI } from '@/components/HeroSectionAI';

// Mock the useI18n hook
vi.mock('@/hooks/useI18n', () => ({
  useI18n: () => ({
    t: (key: string) => key, // Simple mock that returns the key
  }),
}));

// Mock the next/navigation router
vi.mock('next/navigation', () => ({
    useRouter: () => ({ push: vi.fn() }),
}));

test('HeroSectionAI renders correctly', () => {
  render(<HeroSectionAI />);

  // Check for the main title
  const title = screen.getByText('HomePage.title');
  expect(title).toBeInTheDocument();

  // Check for the subtitle
  const subtitle = screen.getByText("HomePage.aiSubtitle");
  expect(subtitle).toBeInTheDocument();

  // Check for the buttons
  const exploreButton = screen.getByText('HomePage.aiExplore');
  const planButton = screen.getByText('HomePage.aiPlan');
  expect(exploreButton).toBeInTheDocument();
  expect(planButton).toBeInTheDocument();

  // Check for the prompt input
  const promptInput = screen.getByLabelText('HomePage.aiPrompt');
  expect(promptInput).toBeInTheDocument();
});
