# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bilingual (Armenian/Russian) quiz app for testing knowledge of the Armenian Constitution. Built with Nuxt 4, Vue 3 Composition API, Pinia, UnoCSS, and @nuxtjs/i18n.

## Commands

```bash
pnpm dev              # Start dev server
pnpm build            # Production build
pnpm lint:fix         # ESLint auto-fix
pnpm typecheck        # TypeScript type checking
pnpm test             # Run tests (watch mode)
pnpm test:coverage    # Coverage report
vitest run app/path/to/file.spec.ts  # Run a single test file
```

Pre-commit hook runs typecheck → lint:fix → tests on staged files.

## Verification Workflow

After creating or modifying any functionality, always run:

```bash
pnpm typecheck && pnpm lint:fix && pnpm test
```

If any of these fail, fix the errors and re-run until all three pass.

## Architecture

**Nuxt 4 directory layout** — all app code lives under `app/`:

- `app/pages/` — Three routes: landing (`index.vue`), quiz (`quiz.vue`), results (`results.vue`)
- `app/stores/quiz.ts` — Single Pinia store managing quiz state (questions, answers, navigation, timer, pause/resume)
- `app/composables/` — `useQuizStorage` (localStorage persistence with migration system), `useQuizResults` (score calculations), `useQuizTimer` (elapsed time with pause support)
- `app/components/quiz/` — Quiz UI components; `app/components/results/` — Results page components
- `app/types/quiz.ts` — All TypeScript types (Question, Answer, QuizState, QuizResult)
- `app/locales/{ru,hy}.json` — Translation files containing both UI strings and quiz content
- `server/api/questions.get.ts` — API endpoint returning questions from `server/data/questions.ts`

**Key patterns:**
- Quiz questions use i18n keys as data (e.g., `'quiz.questions.q1.text'`) — actual text lives in locale files
- Questions are shuffled per session via Fisher-Yates; order persisted in localStorage
- localStorage stores full quiz session with integer-based schema versioning for migrations
- Dark mode via `@nuxtjs/color-mode` (class-based, supports system preference)

## Testing

- See @testing.md for testing guidelines
- Config: `vitest.config.ts` — environment `'nuxt'`, tests match `app/**/*.spec.ts`
- Tests are co-located with source files (e.g., `quiz-helpers.spec.ts` next to `quiz-helpers.ts`)
- Global setup in `test/setup.ts` mocks `useI18n` via `mockNuxtImport` (returns key as translation)
- Use `mountSuspended` from `@nuxt/test-utils/runtime` for component tests
- Use `mockNuxtImport` for mocking Nuxt auto-imported composables

## Code Style

- See @frontend.md for the code style guide
- ESLint stylistic rules: no semicolons, single quotes, no trailing commas, 2-space indent, max 140 chars
- `<script setup>` with Composition API only — no Options API
- Types over interfaces; const objects over enums
- UnoCSS for all styling (custom theme colors defined in `uno.config.ts`)
- Package manager: pnpm
