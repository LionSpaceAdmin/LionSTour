# Tourism Experience Platform — Complete Specification

## פלטפורמת חוויית התיירות — מפרט מלא

## 🚨 THIS IS THE COMPLETE SPECIFICATION - USE ONLY THIS 🚨

> **Note**: Tourism platform development based on Next.js + Supabase starter
> **Generated from**: Tourism Platform Vision - January 11, 2025
> **Vision**: "גלה את ישראל דרך האנשים שחיים אותה" (Discover Israel through the people who live it)

---

## 📋 Platform Overview

### 🎯 Core Purpose

Build a postwar tourism experience platform for Israel that enables authentic, story-driven, and safe travel guided by local veterans and diverse communities. Inspired by the "Wolt experience" concept of "חוויה בלחיצה" (Experience in One Click), but uniquely designed for emotional, tourism-focused discovery rather than food delivery.

### 🌟 Vision Statement

"גלה את ישראל דרך האנשים שחיים אותה" (Discover Israel through the people who live it)

### 🧭 Core Philosophy

- **Not a Wolt clone** - Use "חוויה בלחיצה" (Experience in One Click) as design lenses, not UI imitation
- **Emotional Discovery** - UI should feel like exploration/journey, not menu browsing
- **Human-First** - Stories and people before price or technical details
- **Authentic Israel** - Show the Israel not seen in news, through real people and communities
- **Postwar Resilience** - Celebrate strength, diversity, and hope through tourism

---

## 🔧 Technical Foundation

### Tech Stack

- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL), Supabase Auth + RLS
- **Integrations**: Stripe, Mapbox, i18n (HE/EN)
- **Performance**: LCP ≤ 2.5s, TTI ≤ 3s, Lighthouse ≥ 90

### Design Principles

- **Emotional Design**: Soft, warm colors, large typography, authentic images over tables/panels
- **UI Principles**: Human-first, story-centric, accessibility (WCAG 2.1 AA), mobile-first, performance-first
- **Content Rules**: Authentic local stories, multilingual, culturally sensitive, no stock photos
- **Psychological Framing**: Stories and people before price/technical details

---

## 🎯 Priority 1: Foundation Transformation (CRITICAL)

### 1.1 Landing Page (`app/page.tsx`) - 🔄 IN PROGRESS

**Objective**: Transform existing landing page into emotional tourism discovery page

**Current State**: Next.js Supabase Starter Kit landing page  
**Target State**: Emotional tourism discovery page with personal stories

**TODO Checklist:**

- [ ] **PRESERVE** existing navigation structure (DeployButton, AuthButton)
- [ ] **REPLACE** "Next.js Supabase Starter" with "גלה את ישראל"
- [ ] **TRANSFORM** Hero component to EmotionalHero
- [ ] **REPLACE** tutorial steps with PersonalStories section
- [ ] **ADD** CommunityShowcase section
- [ ] **ADD** ExperienceWindows section
- [ ] **MAINTAIN** existing responsive layout classes
- [ ] **PRESERVE** AuthButton integration
- [ ] **PRESERVE** ThemeSwitcher functionality
- [ ] **TEST** all existing functionality still works

**Files to Modify:**

- [ ] `app/page.tsx` - Main landing page transformation
- [ ] `components/hero.tsx` → `components/emotional-hero.tsx` - Hero transformation
- [ ] `components/personal-stories.tsx` - New component
- [ ] `components/community-showcase.tsx` - New component
- [ ] `components/experience-windows.tsx` - New component

**Acceptance Criteria:**

- [ ] Page loads under 2.5s on Fast 3G
- [ ] Hero is emotionally compelling and responsive
- [ ] Stories feel authentic and personal, not corporate
- [ ] UI feels like exploration, not menu browsing
- [ ] All CTAs lead to planning flow
- [ ] Existing auth functionality preserved

### 1.2 Root Layout (`app/layout.tsx`) - ⏳ PENDING

**Objective**: Enhance existing layout for tourism platform while preserving current functionality

**Current State**: Basic Next.js layout with ThemeProvider  
**Target State**: Tourism-focused layout with Supabase provider

**TODO Checklist:**

- [ ] **PRESERVE** existing ThemeProvider configuration
- [ ] **PRESERVE** existing font setup (Geist)
- [ ] **PRESERVE** existing HTML structure
- [ ] **PRESERVE** existing hydration settings
- [ ] **UPDATE** metadata for tourism platform
- [ ] **ADD** Supabase provider to existing ThemeProvider
- [ ] **ADD** Hebrew language support (`lang="he"`)
- [ ] **UPDATE** title to "גלה את ישראל - חוויות תיירות אותנטיות"
- [ ] **UPDATE** description with tourism messaging
- [ ] **TEST** existing functionality preserved

**Files to Modify:**

- [ ] `app/layout.tsx` - Root layout enhancement
- [ ] `app/globals.css` - Global styles enhancement

**Acceptance Criteria:**

- [ ] Layout applies globally
- [ ] Supabase provider loaded
- [ ] Hebrew language support working
- [ ] Metadata updated correctly
- [ ] Existing functionality preserved

### 1.3 Hero Component (`components/hero.tsx`) - ⏳ PENDING

**Objective**: Transform existing hero into emotional tourism hero while maintaining component structure

**Current State**: Supabase starter hero with technical messaging  
**Target State**: Emotional tourism hero with Israeli landscape background

**TODO Checklist:**

- [ ] **PRESERVE** existing component export structure
- [ ] **PRESERVE** existing responsive classes
- [ ] **PRESERVE** existing accessibility attributes
- [ ] **REPLACE** technical messaging with "גלה את ישראל דרך האנשים שחיים אותה"
- [ ] **REPLACE** "Deploy to Vercel" CTA with "תכנן חוויה"
- [ ] **ADD** emotional background image/video of Israeli landscape
- [ ] **UPDATE** feature list with tourism benefits
- [ ] **MAINTAIN** component layout structure
- [ ] **ENSURE** accessibility compliance
- [ ] **TEST** responsive design

**Files to Modify:**

- [ ] `components/hero.tsx` - Transform to emotional hero

**Acceptance Criteria:**

- [ ] Hero is emotionally compelling
- [ ] Background image/video loads properly
- [ ] CTA button works and is prominent
- [ ] Responsive design maintained
- [ ] Accessibility standards met

### 1.4 Global Styles (`app/globals.css`) - ⏳ PENDING

**Objective**: Add tourism-focused styling while preserving existing Tailwind setup

**Current State**: Basic Tailwind setup with shadcn/ui variables  
**Target State**: Tourism-focused styling with Israeli landscape colors

**TODO Checklist:**

- [ ] **PRESERVE** existing Tailwind base setup
- [ ] **PRESERVE** existing shadcn/ui variables
- [ ] **PRESERVE** existing component styles
- [ ] **PRESERVE** existing responsive utilities
- [ ] **ADD** tourism color palette (Israeli landscape inspired)
- [ ] **ADD** emotional typography styles
- [ ] **ADD** tourism-specific component styles
- [ ] **ADD** warm, personal styling variants
- [ ] **MAINTAIN** existing accessibility styles
- [ ] **TEST** all existing styles still work

**Files to Modify:**

- [ ] `app/globals.css` - Add tourism styling

**Acceptance Criteria:**

- [ ] Color palette conveys Israeli warmth
- [ ] Typography feels personal and readable
- [ ] No cold or corporate design elements
- [ ] Existing styles preserved
- [ ] New styles integrate seamlessly

---

## 🎯 Priority 2: New Pages Creation (EXECUTE AFTER P1)

### 2.1 Experiences Page (`app/experiences/page.tsx`) - ⏳ PENDING

**Objective**: Create experiences discovery gallery page

**Target State**: Gallery-style experience windows (not Wolt cards) - each experience as a 'gateway' to a world

**TODO Checklist:**

- [ ] **CREATE** new page following existing app structure
- [ ] **IMPLEMENT** gallery-style experience windows (not Wolt cards)
- [ ] **ADD** story-based filters: 'Emotional journeys', 'Cultural discoveries', 'Nature adventures', 'Urban explorations'
- [ ] **IMPLEMENT** map as secondary view within planning process
- [ ] **ADD** guide spotlight section showing person behind each experience
- [ ] **CREATE** 'Experience of the Week' featured section
- [ ] **ADD** emotional journey paths: 'Healing journeys', 'Cultural bridges', 'Nature reconnection'
- [ ] **ENSURE** experiences feel like gateways to different worlds
- [ ] **MAINTAIN** existing responsive design patterns
- [ ] **TEST** page loads under 2s

**Files to Create:**

- [ ] `app/experiences/page.tsx` - Main experiences page
- [ ] `components/experience-windows.tsx` - Gallery-style experience display
- [ ] `components/story-filters.tsx` - Story-based filtering
- [ ] `components/map-view.tsx` - Secondary map view
- [ ] `components/guide-spotlight.tsx` - Guide spotlight section

**Acceptance Criteria:**

- [ ] Experiences feel like gateways to different worlds
- [ ] Story-based filtering works intuitively
- [ ] Map is secondary, not primary interface
- [ ] Each experience tells a compelling story
- [ ] FCP under 2s

### 2.2 Guides Page (`app/guides/[id]/page.tsx`) - ⏳ PENDING

**Objective**: Create personal guide story pages

**Target State**: Each guide is a person with a story, not just a service provider

**TODO Checklist:**

- [ ] **CREATE** new dynamic route following existing patterns
- [ ] **IMPLEMENT** immersive personal story section
- [ ] **BUILD** journey timeline showing path to becoming a guide
- [ ] **ADD** authentic media gallery with personal photos
- [ ] **INTEGRATE** availability calendar with personal touch
- [ ] **CREATE** testimonial gallery with video testimonials
- [ ] **ADD** community connection section
- [ ] **INCLUDE** 'Why I Guide' personal statement
- [ ] **ENSURE** profile feels deeply personal and authentic
- [ ] **TEST** profile loads < 2s

**Files to Create:**

- [ ] `app/guides/[id]/page.tsx` - Dynamic guide profile page
- [ ] `components/personal-story.tsx` - Personal story section
- [ ] `components/journey-timeline.tsx` - Journey timeline
- [ ] `components/availability-calendar.tsx` - Personal calendar
- [ ] `components/testimonial-gallery.tsx` - Video testimonials
- [ ] `components/community-connection.tsx` - Community section

**Acceptance Criteria:**

- [ ] Profile feels deeply personal and authentic
- [ ] Guide's story is compelling and emotional
- [ ] Calendar feels personal, not corporate
- [ ] All media is authentic and optimized
- [ ] Profile loads < 2s

### 2.3 Plan Page (`app/plan/page.tsx`) - ⏳ PENDING

**Objective**: Create personal journey designer page

**Target State**: Design a personal discovery adventure, not just book activities

**TODO Checklist:**

- [ ] **CREATE** new page following existing app structure
- [ ] **IMPLEMENT** emotional journey questionnaire
- [ ] **BUILD** story-based itinerary display
- [ ] **ADD** guide matching with personal touch
- [ ] **CREATE** emotional preview sections
- [ ] **INTEGRATE** backend /api/itineraries/plan with Supabase data
- [ ] **ADD** journey sharing with personal story elements
- [ ] **INCLUDE** 'Journey Reflection' section
- [ ] **ENSURE** planning feels like designing personal adventure
- [ ] **TEST** itinerary tells compelling story

**Files to Create:**

- [ ] `app/plan/page.tsx` - Main planning page
- [ ] `components/journey-questions.tsx` - Emotional questionnaire
- [ ] `components/story-itinerary.tsx` - Story-based itinerary
- [ ] `components/guide-matching.tsx` - Personal guide matching
- [ ] `components/emotional-preview.tsx` - Emotional preview
- [ ] `components/share-journey.tsx` - Journey sharing

**Acceptance Criteria:**

- [ ] Planning feels like designing personal adventure
- [ ] Itinerary tells compelling story
- [ ] Guide matching feels personal and meaningful
- [ ] No availability conflicts
- [ ] Journey export to PDF works with story elements

---

## 🎯 Priority 3: Authentication Pages (EXECUTE AFTER P1)

### 3.1 Login Page (`app/auth/login/page.tsx`) - ⏳ PENDING

**Objective**: Implement passwordless login with email and social providers using Supabase Auth

**Current State**: Existing login page with Supabase integration  
**Target State**: Tourism-focused login with emotional messaging

**TODO Checklist:**

- [ ] **PRESERVE** existing Supabase Auth integration
- [ ] **PRESERVE** existing form structure
- [ ] **PRESERVE** existing validation
- [ ] **PRESERVE** existing error handling
- [ ] **UPDATE** messaging to tourism-focused
- [ ] **ADD** emotional welcome message
- [ ] **ENHANCE** visual design with warm colors
- [ ] **MAINTAIN** accessibility standards
- [ ] **TEST** all auth flows work
- [ ] **VERIFY** redirect functionality

**Files to Modify:**

- [ ] `app/auth/login/page.tsx` - Enhance existing login
- [ ] `components/login-form.tsx` - Update form component

**Acceptance Criteria:**

- [ ] Magic link works
- [ ] OAuth flows work
- [ ] Tourism messaging integrated
- [ ] Visual design enhanced
- [ ] All existing functionality preserved

### 3.2 Sign Up Page (`app/auth/sign-up/page.tsx`) - ⏳ PENDING

**Objective**: Implement user registration with email verification using Supabase Auth

**Current State**: Existing sign-up page with Supabase integration  
**Target State**: Tourism-focused registration with community messaging

**TODO Checklist:**

- [ ] **PRESERVE** existing Supabase Auth integration
- [ ] **PRESERVE** existing form structure
- [ ] **PRESERVE** existing validation
- [ ] **PRESERVE** existing error handling
- [ ] **UPDATE** messaging to community-focused
- [ ] **ADD** welcome to tourism community message
- [ ] **ENHANCE** visual design with warm colors
- [ ] **MAINTAIN** accessibility standards
- [ ] **TEST** all registration flows work
- [ ] **VERIFY** email verification works

**Files to Modify:**

- [ ] `app/auth/sign-up/page.tsx` - Enhance existing sign-up
- [ ] `components/sign-up-form.tsx` - Update form component

**Acceptance Criteria:**

- [ ] Registration works
- [ ] Email verification sent
- [ ] Community messaging integrated
- [ ] Visual design enhanced
- [ ] All existing functionality preserved

---

## 🎯 Priority 4: Protected Pages (EXECUTE AFTER P2)

### 4.1 User Dashboard (`app/protected/dashboard/page.tsx`) - ⏳ PENDING

**Objective**: Create user dashboard for managing bookings, preferences, and profile

**Current State**: Basic protected page  
**Target State**: Tourism-focused user dashboard

**TODO Checklist:**

- [ ] **PRESERVE** existing protected route structure
- [ ] **PRESERVE** existing auth middleware
- [ ] **CREATE** booking management section
- [ ] **CREATE** profile settings section
- [ ] **CREATE** preferences management
- [ ] **ADD** journey history section
- [ ] **ADD** favorite guides section
- [ ] **ADD** upcoming experiences section
- [ ] **ENSURE** data loads from Supabase
- [ ] **TEST** user can update profile

**Files to Create:**

- [ ] `app/protected/dashboard/page.tsx` - Main dashboard page
- [ ] `components/booking-list.tsx` - Booking management
- [ ] `components/profile-settings.tsx` - Profile settings
- [ ] `components/preferences-form.tsx` - Preferences form
- [ ] `components/journey-history.tsx` - Journey history
- [ ] `components/favorite-guides.tsx` - Favorite guides

**Acceptance Criteria:**

- [ ] Data loads from Supabase
- [ ] User can update profile
- [ ] Booking management works
- [ ] Preferences are saved
- [ ] Dashboard feels personal

### 4.2 Admin Dashboard (`app/protected/admin/page.tsx`) - ⏳ PENDING

**Objective**: Provide admins tools to manage guides, experiences, and bookings using Supabase

**Current State**: Basic protected page  
**Target State**: Admin dashboard with CRUD operations

**TODO Checklist:**

- [ ] **PRESERVE** existing protected route structure
- [ ] **PRESERVE** existing auth middleware
- [ ] **IMPLEMENT** CRUD for guides via Supabase
- [ ] **IMPLEMENT** CRUD for experiences via Supabase
- [ ] **ADD** table for bookings management
- [ ] **ADD** moderation tools
- [ ] **ENSURE** RBAC enforced via Supabase RLS
- [ ] **ADD** audit logs generation
- [ ] **MAINTAIN** server actions only
- [ ] **TEST** all CRUD operations work

**Files to Create:**

- [ ] `app/protected/admin/page.tsx` - Main admin page
- [ ] `components/admin/guide-table.tsx` - Guide management
- [ ] `components/admin/experience-table.tsx` - Experience management
- [ ] `components/admin/booking-table.tsx` - Booking management
- [ ] `components/admin/moderation-tools.tsx` - Moderation tools

**Acceptance Criteria:**

- [ ] RBAC enforced via Supabase RLS
- [ ] Audit logs generated
- [ ] All CRUD operations work
- [ ] Moderation tools functional
- [ ] Admin interface intuitive

---

## 🎯 Priority 5: Content Pages (EXECUTE AFTER P2)

### 5.1 Academy Page (`app/academy/page.tsx`) - ⏳ PENDING

**Objective**: Publish educational and explanatory content: cultural, historical, postwar resilience stories

**Target State**: Content hub with articles from Supabase CMS

**TODO Checklist:**

- [ ] **CREATE** new page following existing app structure
- [ ] **IMPLEMENT** article listing from Supabase CMS
- [ ] **ADD** filters by category
- [ ] **ADD** article previews with images
- [ ] **ENSURE** SEO metadata present
- [ ] **ENSURE** WCAG AA compliance
- [ ] **MAINTAIN** MDX for articles
- [ ] **USE** Supabase storage for media
- [ ] **ADD** search functionality
- [ ] **TEST** all articles load properly

**Files to Create:**

- [ ] `app/academy/page.tsx` - Main academy page
- [ ] `components/academy/article-card.tsx` - Article preview cards
- [ ] `components/academy/article-filters.tsx` - Category filters
- [ ] `components/academy/search-bar.tsx` - Search functionality

**Acceptance Criteria:**

- [ ] SEO metadata present
- [ ] WCAG AA compliance
- [ ] Articles load from Supabase
- [ ] Filters work correctly
- [ ] Search functionality works

### 5.2 Trust & Safety Page (`app/trust/safety/page.tsx`) - ⏳ PENDING

**Objective**: Communicate safety, security, and trust policies to users

**Target State**: Comprehensive safety information page

**TODO Checklist:**

- [ ] **CREATE** new page following existing app structure
- [ ] **EXPLAIN** safety standards
- [ ] **ADD** emergency contacts
- [ ] **PROVIDE** SOS instructions
- [ ] **ENSURE** content clear and multilingual
- [ ] **ENSURE** links functional
- [ ] **MAINTAIN** no PII exposed
- [ ] **ADD** trust indicators
- [ ] **ADD** safety guidelines
- [ ] **TEST** all links work

**Files to Create:**

- [ ] `app/trust/safety/page.tsx` - Main safety page
- [ ] `components/trust/safety-content.tsx` - Safety content
- [ ] `components/trust/emergency-contacts.tsx` - Emergency contacts
- [ ] `components/trust/trust-indicators.tsx` - Trust indicators

**Acceptance Criteria:**

- [ ] Content clear and multilingual
- [ ] Links functional
- [ ] Safety information comprehensive
- [ ] Trust indicators present
- [ ] Emergency contacts accessible

### 5.3 Enterprise Page (`app/enterprise/page.tsx`) - ⏳ PENDING

**Objective**: Present offering for hotels, tour operators, and partners

**Target State**: Partnership-focused landing page

**TODO Checklist:**

- [ ] **CREATE** new page following existing app structure
- [ ] **DESCRIBE** partnership benefits
- [ ] **ADD** API documentation link
- [ ] **INSERT** partner inquiry form with Supabase storage
- [ ] **ENSURE** form submissions stored in Supabase
- [ ] **ENSURE** partner info accessible
- [ ] **MAINTAIN** no pricing exposed
- [ ] **ADD** partnership tiers
- [ ] **ADD** success stories
- [ ] **TEST** form submission works

**Files to Create:**

- [ ] `app/enterprise/page.tsx` - Main enterprise page
- [ ] `components/enterprise/partnership-form.tsx` - Partnership form
- [ ] `components/enterprise/benefits-section.tsx` - Benefits section
- [ ] `components/enterprise/success-stories.tsx` - Success stories

**Acceptance Criteria:**

- [ ] Form submissions stored in Supabase
- [ ] Partner info accessible
- [ ] Partnership benefits clear
- [ ] Form submission works
- [ ] Enterprise messaging professional

---

## 🎯 Priority 6: Database Schema (EXECUTE AFTER P3)

### 6.1 Supabase Schema Creation - ⏳ PENDING

**Objective**: Design Supabase database schema for tourism platform

**Target State**: Complete database schema with RLS policies

**TODO Checklist:**

- [ ] **PRESERVE** existing Supabase client setup
- [ ] **PRESERVE** current auth configuration
- [ ] **PRESERVE** existing middleware integration
- [ ] **CREATE** profiles table extending auth.users
- [ ] **CREATE** guides table with personal story fields
- [ ] **CREATE** experiences table with emotional content
- [ ] **CREATE** bookings table with journey tracking
- [ ] **CREATE** reviews table with testimonial support
- [ ] **SET UP** RLS policies for security
- [ ] **ADD** indexes for performance

**Files to Create:**

- [ ] `supabase/migrations/001_tourism_schema.sql` - Main schema
- [ ] `supabase/seed.sql` - Seed data
- [ ] `supabase/functions/` - Database functions
- [ ] `lib/supabase/types.ts` - TypeScript types

**Acceptance Criteria:**

- [ ] RLS policies enforced
- [ ] Foreign keys correct
- [ ] Indexes optimized
- [ ] TypeScript types generated
- [ ] Seed data populated

### 6.2 API Routes Creation - ⏳ PENDING

**Objective**: Create API endpoints for tourism platform

**Target State**: Complete API with proper error handling

**TODO Checklist:**

- [ ] **FOLLOW** existing API route patterns
- [ ] **MAINTAIN** existing error handling
- [ ] **PRESERVE** existing auth middleware
- [ ] **CREATE** /api/experiences routes
- [ ] **CREATE** /api/guides routes
- [ ] **CREATE** /api/bookings routes
- [ ] **CREATE** /api/itineraries routes
- [ ] **IMPLEMENT** proper error handling
- [ ] **ADD** rate limiting
- [ ] **TEST** all API endpoints

**Files to Create:**

- [ ] `app/api/experiences/route.ts` - Experiences API
- [ ] `app/api/experiences/[id]/route.ts` - Single experience API
- [ ] `app/api/guides/route.ts` - Guides API
- [ ] `app/api/guides/[id]/route.ts` - Single guide API
- [ ] `app/api/bookings/route.ts` - Bookings API
- [ ] `app/api/itineraries/route.ts` - Itineraries API

**Acceptance Criteria:**

- [ ] All API endpoints work
- [ ] Error handling is consistent
- [ ] Rate limiting is implemented
- [ ] Authentication is enforced
- [ ] TypeScript types are correct

---

## 🎯 Priority 7: Component Library (EXECUTE AFTER P2)

### 7.1 UI Components Enhancement - ⏳ PENDING

**Objective**: Enhance existing shadcn/ui components for tourism platform

**Current State**: Basic shadcn/ui components  
**Target State**: Tourism-focused UI components with emotional variants

**TODO Checklist:**

- [ ] **PRESERVE** existing shadcn/ui component structure
- [ ] **PRESERVE** existing accessibility attributes
- [ ] **PRESERVE** existing TypeScript interfaces
- [ ] **PRESERVE** existing export patterns
- [ ] **ADD** tourism-specific variants to existing components
- [ ] **ADD** emotional styling variants
- [ ] **MAINTAIN** existing functionality
- [ ] **ENSURE** backward compatibility
- [ ] **TEST** all existing components still work
- [ ] **DOCUMENT** new variants

**Files to Modify:**

- [ ] `components/ui/button.tsx` - Add tourism variants
- [ ] `components/ui/card.tsx` - Add emotional variants
- [ ] `components/ui/input.tsx` - Add conversational styling
- [ ] `components/ui/badge.tsx` - Add tourism styling
- [ ] `components/ui/dropdown-menu.tsx` - Add warm styling

**Acceptance Criteria:**

- [ ] All existing components preserved
- [ ] New variants work seamlessly
- [ ] Accessibility maintained
- [ ] TypeScript interfaces updated
- [ ] Backward compatibility ensured

### 7.2 Tourism Components Creation - ⏳ PENDING

**Objective**: Create tourism-specific components following existing patterns

**Target State**: Complete set of tourism components

**TODO Checklist:**

- [ ] **FOLLOW** existing component structure patterns
- [ ] **FOLLOW** existing TypeScript patterns
- [ ] **FOLLOW** existing Tailwind class patterns
- [ ] **MAINTAIN** accessibility standards
- [ ] **CREATE** PersonalStories component
- [ ] **CREATE** CommunityShowcase component
- [ ] **CREATE** ExperienceWindows component
- [ ] **CREATE** EmotionalHero component
- [ ] **CREATE** JourneyQuestions component
- [ ] **TEST** all components work independently

**Files to Create:**

- [ ] `components/personal-stories.tsx` - Personal stories carousel
- [ ] `components/community-showcase.tsx` - Community diversity showcase
- [ ] `components/experience-windows.tsx` - Gallery-style experiences
- [ ] `components/emotional-hero.tsx` - Emotional hero section
- [ ] `components/journey-questions.tsx` - Journey questionnaire
- [ ] `components/story-carousel.tsx` - Story carousel
- [ ] `components/cta-buttons.tsx` - Tourism CTAs

**Acceptance Criteria:**

- [ ] Components follow existing patterns
- [ ] All components are accessible
- [ ] TypeScript interfaces are complete
- [ ] Components are reusable
- [ ] Styling is consistent

---

## 🎯 Priority 8: Advanced Features (EXECUTE AFTER P6)

### 8.1 Internationalization (i18n) - ⏳ PENDING

**Objective**: Implement Hebrew and English language support

**Target State**: Full bilingual support with RTL for Hebrew

**TODO Checklist:**

- [ ] **IMPLEMENT** next-i18next library
- [ ] **CREATE** Hebrew translation files
- [ ] **CREATE** English translation files
- [ ] **ADD** language switcher component
- [ ] **IMPLEMENT** locale detection
- [ ] **ADD** RTL support for Hebrew
- [ ] **TEST** all translations work
- [ ] **ENSURE** cultural sensitivity
- [ ] **VALIDATE** all text is translated
- [ ] **DOCUMENT** translation process

**Files to Create:**

- [ ] `locales/he/` - Hebrew translations
- [ ] `locales/en/` - English translations
- [ ] `components/language-switcher.tsx` - Language switcher
- [ ] `lib/i18n.ts` - i18n configuration

**Acceptance Criteria:**

- [ ] All translations work
- [ ] RTL support for Hebrew
- [ ] Language switcher functional
- [ ] Cultural sensitivity maintained
- [ ] All text translated

### 8.2 Advanced UI Features - ⏳ PENDING

**Objective**: Implement advanced UI features for enhanced user experience

**Target State**: Rich, interactive user interface

**TODO Checklist:**

- [ ] **IMPLEMENT** progressive image loading
- [ ] **ADD** smooth scroll animations
- [ ] **CREATE** interactive map integration
- [ ] **ADD** video background support
- [ ] **IMPLEMENT** lazy loading for components
- [ ] **ADD** skeleton loading states
- [ ] **CREATE** toast notifications
- [ ] **IMPLEMENT** modal system
- [ ] **ADD** form validation
- [ ] **TEST** all features work

**Files to Create:**

- [ ] `components/ui/progressive-image.tsx` - Progressive image loading
- [ ] `components/ui/skeleton.tsx` - Skeleton loading states
- [ ] `components/ui/toast.tsx` - Toast notifications
- [ ] `components/ui/modal.tsx` - Modal system
- [ ] `components/ui/form-validation.tsx` - Form validation

**Acceptance Criteria:**

- [ ] All features work smoothly
- [ ] Performance maintained
- [ ] Accessibility preserved
- [ ] User experience enhanced
- [ ] All features tested

---

## 📊 Success Metrics

### Performance Targets

- [ ] Lighthouse score > 90 (current: 60)
- [ ] Bundle size < 500KB (current: 2MB)
- [ ] Time to Interactive < 3s
- [ ] First Contentful Paint (FCP) < 1.5s
- [ ] Cumulative Layout Shift < 0.1

### Quality Targets

- [ ] Test coverage > 80% (current: 0%)
- [ ] 0 TypeScript errors (current: 100+)
- [ ] 0 ESLint warnings
- [ ] 0 security vulnerabilities
- [ ] 100% accessibility compliance

### Tourism Platform Targets

- [ ] Emotional impact assessment > 8/10
- [ ] User warmth perception > 8/10
- [ ] Story authenticity rating > 9/10
- [ ] Cultural sensitivity compliance 100%
- [ ] Hebrew language support 100%

---

## 📈 Overall Progress

```text
Priority 1: [░░░░░░░░░░░░░░░░░░░░] 0% (Foundation Transformation)
Priority 2: [░░░░░░░░░░░░░░░░░░░░] 0% (New Pages Creation)
Priority 3: [░░░░░░░░░░░░░░░░░░░░] 0% (Authentication Pages)
Priority 4: [░░░░░░░░░░░░░░░░░░░░] 0% (Protected Pages)
Priority 5: [░░░░░░░░░░░░░░░░░░░░] 0% (Content Pages)
Priority 6: [░░░░░░░░░░░░░░░░░░░░] 0% (Database Schema)
Priority 7: [░░░░░░░░░░░░░░░░░░░░] 0% (Component Library)
Priority 8: [░░░░░░░░░░░░░░░░░░░░] 0% (Advanced Features)

TOTAL: [░░░░░░░░░░░░░░░░░░░░] 0% Complete
```

---

## 🚨 Critical Rules

### Structure Preservation

- **NEVER** change existing file structure
- **NEVER** delete existing files
- **NEVER** move existing files
- **ALWAYS** work within current project tree

### File Modification Rules

- **TRANSFORM** existing files (don't replace)
- **ENHANCE** existing functionality (don't break)
- **PRESERVE** existing patterns and interfaces
- **MAINTAIN** existing TypeScript types

### Component Patterns

- **FOLLOW** existing export patterns
- **MAINTAIN** existing prop interfaces
- **USE** existing Tailwind class patterns
- **PRESERVE** accessibility attributes

---

## 🎯 Execution Order

1. **NEXT**: Priority 1.1 - Transform Landing Page
2. **THEN**: Priority 1.2 - Enhance Root Layout
3. **THEN**: Priority 1.3 - Transform Hero Component
4. **THEN**: Priority 1.4 - Update Global Styles
5. **THEN**: Priority 2 - Create New Pages
6. **THEN**: Priority 3 - Authentication Pages
7. **THEN**: Priority 4 - Protected Pages
8. **THEN**: Priority 5 - Content Pages
9. **THEN**: Priority 6 - Database Schema
10. **THEN**: Priority 7 - Component Library
11. **FINALLY**: Priority 8 - Advanced Features

---

## 🏆 Definition of Done

A task is considered complete when:

- [ ] Code is written and follows existing patterns
- [ ] Existing functionality is preserved
- [ ] Tests are written and passing
- [ ] Documentation is updated
- [ ] Performance impact is measured
- [ ] Accessibility is verified
- [ ] Cultural sensitivity is ensured
- [ ] Hebrew language support is working

---

**Last Updated**: January 11, 2025, 12:00 IST
**Version**: 1.0.0
**Status**: READY TO START - Priority 1 Foundation Transformation
**Vision**: "גלה את ישראל דרך האנשים שחיים אותה" (Discover Israel through the people who live it)
