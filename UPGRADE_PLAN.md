# LionSTour - Recommended Upgrade Plan

This plan outlines the next steps for developing the LionSTour platform, based on the project specification (`TODO.md`) and the current state of the application. The focus is on completing the foundational work and moving on to core features.

---

## Priority 1: Finalize Foundation (Critical)

The foundation is partially complete. The following steps will solidify it.

### 1.1 Hero Section & Landing Page

- [ ] **Validate New Hero Design:** Confirm that the new AI-powered hero section meets the visual and functional expectations.
- [ ] **Connect AI Prompt:** Wire the new AI prompt bar on the hero section to the journey planner page (`/plan`), passing the user's query.
- [ ] **Finalize i18n:** Translate the new hero section copy (`aiSubtitle`, `aiPrompt`, etc.) into Hebrew in `messages/he.json` to ensure full localization.
- [ ] **Performance Audit:** Run Lighthouse and analyze the Core Web Vitals for the landing page, especially focusing on the LCP impact of the background video.

### 1.2 Global Styles & Components

- [ ] **Review `globals.css`:** Complete the implementation of the brand's warm color palette and typography scales as defined in the spec.
- [ ] **Component Polish:** Review and refine the main components used on the landing page (`PersonalStories`, `CommunityShowcase`, etc.) to ensure they align with the new, more premium design language of the hero section.

---

## Priority 2: Implement Core Features

With the foundation stabilized, the next step is to build out the core pages of the application.

### 2.1 Experiences Page (`/experiences`)

- [ ] **Scaffold Page:** Create the file `src/app/experiences/page.tsx`.
- [ ] **Build Gallery:** Implement the `ExperienceCarousel` or a similar grid to display experiences fetched from the (mocked or real) API.
- [ ] **Implement Filters:** Create the `StoryFilters` component to allow users to filter experiences by category, theme, and region.

### 2.2 Guide Profile Page (`/guides/[id]`)

- [ ] **Scaffold Dynamic Route:** Create the file structure and page for `src/app/guides/[slug]/page.tsx`.
- [ ] **Build Profile Components:** Develop the components listed in the spec, such as `PersonalStory`, `JourneyTimeline`, and `AvailabilityCalendar`.
- [ ] **Fetch Guide Data:** Connect the page to an API endpoint to fetch and display individual guide data.

### 2.3 Journey Planner (`/plan`)

- [ ] **Enhance Planner UI:** Improve the UI of the existing planner to match the new design aesthetic.
- [ ] **Integrate Hero Prompt:** Ensure the query from the hero section's AI prompt is received and used by the planner.

---

## Priority 3: Testing Strategy

The specification calls for >80% test coverage. It's crucial to establish a testing framework early.

- [ ] **Component Testing:** Introduce `Vitest` and `React Testing Library` for unit and integration testing of individual components.
- [ ] **Write Initial Tests:** Start by writing tests for critical components like `HeroSectionAI`, `StoryFilters`, and the main navigation.
- [ ] **Expand E2E Tests:** Add more Playwright tests for key user flows, such as searching for an experience and starting the planning process.

---

This plan provides a clear path forward. I recommend we start with the tasks in **Priority 1** to ensure the landing page experience is complete and robust before moving on to the other pages.
