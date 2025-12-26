# Armenian Constitution Quiz

An interactive, bilingual quiz application to test knowledge about the Constitution of the Republic of Armenia (Հայաստանի Հանրապետության Սահմանադրություն).

## Features

- 🌐 **Bilingual Support** - Full internationalization with Armenian (Հայերեն) and Russian (Русский) languages
- 🌓 **Dark Mode** - Automatic theme detection with manual override (light/dark/system)
- ⏱️ **Timer** - Track time spent on the quiz
- 📊 **Progress Tracking** - Visual progress indicators and question navigation
- 💾 **Auto-save** - Session persistence to continue quiz later
- 📱 **Responsive Design** - Optimized for mobile, tablet, and desktop
- 🎯 **Results Analysis** - Detailed results with correct/incorrect answers review
- ♿ **Accessible** - WCAG compliant with proper ARIA labels and keyboard navigation
- ✅ **Tested** - Comprehensive unit test coverage with Vitest

## Tech Stack

- **Framework:** [Nuxt 4](https://nuxt.com/) - Vue.js framework for production-ready applications
- **UI:** [UnoCSS](https://unocss.dev/) - Instant atomic CSS engine
- **State Management:** [Pinia](https://pinia.vuejs.org/) - The Vue Store
- **Internationalization:** [@nuxtjs/i18n](https://i18n.nuxtjs.org/) - i18n module for Nuxt
- **Theme:** [@nuxtjs/color-mode](https://color-mode.nuxtjs.org/) - Dark and light mode for Nuxt
- **Icons:** [Heroicons](https://heroicons.com/) via UnoCSS
- **Testing:** [Vitest](https://vitest.dev/) + [@nuxt/test-utils](https://nuxt.com/docs/getting-started/testing)
- **Code Quality:** ESLint, TypeScript, Husky, lint-staged

## Setup

Make sure to install dependencies:

```bash
# pnpm (recommended)
pnpm install

# npm
npm install

# yarn
yarn install

# bun
bun install
```

## Development

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

The app features:
- Hot Module Replacement (HMR)
- TypeScript support
- Auto-imports for components and composables
- DevTools enabled

## Production

Build the application for production:

```bash
pnpm build
```

Locally preview production build:

```bash
pnpm preview
```

## Testing

This project uses [Vitest](https://vitest.dev/) with [@nuxt/test-utils](https://nuxt.com/docs/getting-started/testing) for comprehensive unit testing.

### Running Tests

```bash
# Run tests in watch mode
pnpm test

# Run tests with UI
pnpm test:ui

# Run tests with coverage
pnpm test:coverage
```

### Test Structure

Tests are organized by their runtime requirements and type:

- **`test/nuxt/`** - Tests requiring Nuxt runtime (auto-imports, `~/` aliases, composables)
  - Automatically included in Nuxt app's TypeScript context
  - Organized by type in subdirectories:
    - `components/` - Vue component tests
    - `composables/` - Composable function tests
    - `utils/` - Utility function tests using Nuxt features
- **`test/unit/`** - Pure unit tests running in Node (no Nuxt context needed)
  - Use for testing standalone utilities without Nuxt dependencies
- **`test/e2e/`** - End-to-end tests

All test files follow the naming convention `*.spec.ts` or `*.test.ts`.

### Writing Tests

#### Testing Utility Functions

```typescript
import { describe, it, expect } from 'vitest'
import { yourFunction } from '~/utils/your-file'

describe('your-file', () => {
  it('should do something', () => {
    expect(yourFunction()).toBe(expectedValue)
  })
})
```

#### Testing Components

For components that use Nuxt features, use `mountSuspended` from `@nuxt/test-utils/runtime`:

```typescript
import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import YourComponent from '~/components/YourComponent.vue'

describe('YourComponent', () => {
  it('renders correctly', async () => {
    const wrapper = await mountSuspended(YourComponent)
    expect(wrapper.text()).toContain('expected text')
  })
})
```

#### Using Parametrized Tests

To avoid duplication, use `it.each()` for similar test cases:

```typescript
it.each([
  { input: 1, expected: 2 },
  { input: 2, expected: 4 },
  { input: 3, expected: 6 }
])('doubles $input to $expected', ({ input, expected }) => {
  expect(double(input)).toBe(expected)
})
```

#### Mocking Nuxt Composables

Use `mockNuxtImport` to mock auto-imported Nuxt composables:

```typescript
import { mockNuxtImport } from '@nuxt/test-utils/runtime'

mockNuxtImport('useYourComposable', () => {
  return () => ({
    // your mock implementation
  })
})
```

### Configuration

Tests are configured in `vitest.config.ts` with the Nuxt environment:

```typescript
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    setupFiles: ['./test/setup.ts'],
    environmentOptions: {
      nuxt: {
        mock: {
          intersectionObserver: true,
          indexedDb: true
        }
      }
    }
  }
})
```

## Code Quality

The project uses several tools to maintain code quality:

- **TypeScript** - Type safety and better DX
- **ESLint** - Code linting with stylistic rules
- **Husky** - Git hooks for pre-commit checks
- **lint-staged** - Run linters on staged files

### Pre-commit Hooks

Before each commit, the following checks run automatically:
1. TypeScript type checking
2. ESLint with auto-fix
3. Test suite execution

Configure in `.lintstagedrc.mjs`.

## Project Structure

```
arm-constitution-test/
├── app/
│   ├── components/       # Vue components
│   │   ├── quiz/        # Quiz-specific components
│   │   └── results/     # Results page components
│   ├── composables/     # Vue composables
│   ├── locales/         # i18n translation files
│   ├── pages/           # Application pages (auto-routed)
│   ├── stores/          # Pinia stores
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions
├── test/
│   ├── nuxt/           # Nuxt-aware tests
│   │   ├── components/ # Component tests
│   │   └── utils/      # Utility tests
│   └── setup.ts        # Test setup and mocks
└── public/             # Static assets
```

## Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm generate         # Generate static site
pnpm preview          # Preview production build

# Code Quality
pnpm lint             # Run ESLint
pnpm lint:fix         # Run ESLint with auto-fix
pnpm typecheck        # Run TypeScript type checking

# Testing
pnpm test             # Run tests in watch mode
pnpm test:ui          # Run tests with UI
pnpm test:coverage    # Run tests with coverage report
```

## Deployment

Check out the [Nuxt deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information on deploying to various platforms.

## Resources

- [Nuxt Documentation](https://nuxt.com/docs)
- [Vue.js Documentation](https://vuejs.org/)
- [UnoCSS Documentation](https://unocss.dev/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [@nuxtjs/i18n Documentation](https://i18n.nuxtjs.org/)
- [Vitest Documentation](https://vitest.dev/)
- [@nuxt/test-utils Documentation](https://nuxt.com/docs/getting-started/testing)

## License

Private project.
